import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import WebView from "react-native-webview";
import * as Location from "expo-location";
import BackButton from "../../app/components/BackButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MapScreen() {
  const insets = useSafeAreaInsets();

  const webRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [pins, setPins] = useState([]);
  const [coords, setCoords] = useState({ lat: 37.7749, lng: -122.4194 });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      const lat = loc.coords.latitude;
      const lng = loc.coords.longitude;
      setCoords({ lat, lng });

      if (ready && webRef.current) {
        webRef.current.postMessage(
          JSON.stringify({ type: "user_location", payload: { lat, lng } })
        );
      }
    })();
  }, [ready]);

  useEffect(() => {
    (async () => {
      try {
        const url = `${process.env.EXPO_PUBLIC_API_URL}/api/observations`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(
          "Fetched observations:",
          Array.isArray(data) ? data.length : "not array"
        );
        setPins(data);
      } catch (e) {
        console.log("Pin fetch error:", e);
      }
    })();
  }, []);

  useEffect(() => {
    if (!ready || !webRef.current) return;
    const js = `window._setPins(${JSON.stringify(pins)}); true;`;
    webRef.current.injectJavaScript(js);
  }, [ready, pins]);

  const onWebViewLoad = () => setReady(true);

  const topOffset = Math.round((insets.top || 0) + 12);

  const leafletHTML = (initial, offsetTopPx) => `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
    <style>
      :root { --safeTop: ${offsetTopPx}px; }

      html,body,#map{height:100%;margin:0}

      .leaflet-top {
        top: var(--safeTop) !important;
      }

      .leaflet-control-layers{
        box-shadow:0 2px 8px rgba(0,0,0,.15);
        border-radius:8px;
      }

      .recenter-btn{
        position:absolute;
        z-index:1000;
        right:12px;
        top: calc(var(--safeTop) + 10px);
        background:#fff;
        border-radius:10px;
        padding:10px 12px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
        font-size:14px;
        box-shadow:0 2px 6px rgba(0,0,0,.2);
        user-select:none;
      }

      .leaflet-control-zoom a {
        width: 36px;
        height: 36px;
        line-height: 36px;
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <div class="recenter-btn" id="recenter">My Location</div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
      const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OSM'
      });
      const hot = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OSM HOT'
      });
      const toner = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© Stamen'
      });

      const map = L.map('map', {
        center: [${initial.lat}, ${initial.lng}],
        zoom: 14,
        layers: [osm]
      });

      const baseLayers = {
        OSM: osm,
        Humanitarian: hot,
        "Toner Lite": toner
      };

      const pinLayer = L.layerGroup().addTo(map);
      const communityLayer = L.layerGroup().addTo(map);

      L.control
        .layers(
          baseLayers,
          {
            "My Pins": pinLayer,
            Community: communityLayer
          },
          { position: "topleft", collapsed: false }
        )
        .addTo(map);

      window._setPins = function (pins) {
        try {
          const data = Array.isArray(pins) ? pins : [];
          communityLayer.clearLayers();

          const bounds = [];
          data.forEach(function (p) {
            if (!Number.isFinite(p.lat) || !Number.isFinite(p.lng)) return;

            var name = p.commonName || p.scientificName || "Observation";
            var sci = p.scientificName || "";
            var html =
              "<strong>" +
              name +
              "</strong><br/><small>" +
              sci +
              "</small>";

            L.circleMarker([p.lat, p.lng], {
              radius: 8,
              weight: 2,
              color: "#1e90ff",
              fillColor: "#1e90ff",
              fillOpacity: 0.85
            })
              .addTo(communityLayer)
              .bindPopup(html);

            bounds.push([p.lat, p.lng]);
          });

          if (bounds.length) {
            try {
              map.fitBounds(bounds, { padding: [30, 30], maxZoom: 16 });
            } catch (e) {}
          }

          if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                type: "pins_rendered",
                count: communityLayer.getLayers().length
              })
            );
          }
        } catch (e) {
          if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ type: "pins_error", error: String(e) })
            );
          }
        }
      };

      let userMarker = null;
      function setUserLocation(lat, lng) {
        if (userMarker) userMarker.remove();
        userMarker = L.circleMarker([lat, lng], {
          radius: 7,
          color: "#1e90ff",
          fillColor: "#1e90ff",
          fillOpacity: 0.8
        }).addTo(map);
      }

      document.getElementById("recenter").onclick = function () {
        if (userMarker) {
          map.setView(userMarker.getLatLng(), 15, { animate: true });
        }
        if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: "recenter_tapped" })
          );
        }
      };

      function onMsg(e) {
        try {
          const msg = JSON.parse(e.data);
          if (msg.type === "user_location") {
            setUserLocation(msg.payload.lat, msg.payload.lng);
          }
        } catch (_) {}
      }

      document.addEventListener("message", onMsg);
      window.addEventListener("message", onMsg);
    </script>
  </body>
</html>`;

  return (
    <View style={styles.container}>
      <WebView
        ref={webRef}
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        onLoadEnd={onWebViewLoad}
        source={{ html: leafletHTML(coords, topOffset) }}
        onMessage={(e) => {
          try {
            const m = JSON.parse(e.nativeEvent.data);
            if (m.type === "pins_rendered") {
              console.log("Leaflet rendered pins:", m.count);
            }
            if (m.type === "pins_error") {
              console.log("Leaflet pin error:", m.error);
            }
          } catch {}
        }}
      />

      <View
        style={{
          position: "absolute",
          bottom: 70,  
          left: 28,     
        }}
      >
        <BackButton />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: Platform.OS === "android" ? 25 : 0 },
});
