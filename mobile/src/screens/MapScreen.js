import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Platform, Image } from "react-native";
import WebView from "react-native-webview";
import * as Location from "expo-location";
import BackButton from "../../app/components/BackButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import MyPinIcon from "../../assets/my-pin.png";
import CommunityPinIcon from "../../assets/community-pin.png";
import MyLocationPinIcon from "../../assets/location-pin.png";

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const webRef = useRef(null);

  const [ready, setReady] = useState(false);

  const [pins, setPins] = useState([]);

  const [coords, setCoords] = useState({ lat: 37.7749, lng: -122.4194 });

  const myPinUri = Image.resolveAssetSource(MyPinIcon)?.uri;
  const communityPinUri = Image.resolveAssetSource(CommunityPinIcon)?.uri;
  const myLocationPinUri = Image.resolveAssetSource(MyLocationPinIcon)?.uri;

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

        setPins(Array.isArray(data) ? data : []);
      } catch (e) {
        console.log("Pin fetch error:", e);
      }
    })();
  }, []);

  useEffect(() => {
    if (!ready || !webRef.current) return;

    const myPins = [];
    const communityPins = [];

    for (const p of pins) {
      if (p?.imageUrl) myPins.push(p);
      else communityPins.push(p);
    }

    const payload = { myPins, communityPins };

    const js = `window._setPins(${JSON.stringify(payload)}); true;`;
    webRef.current.injectJavaScript(js);
  }, [ready, pins]);

  const onWebViewLoad = () => setReady(true);

  const topOffset = Math.round((insets.top || 0) + 12);

  // Leaflet HTML 
  const leafletHTML = (initial, offsetTopPx) => `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
    <style>
      :root { --safeTop: ${offsetTopPx}px; }
      html,body,#map{height:100%;margin:0}

      .leaflet-top { top: var(--safeTop) !important; }

      .leaflet-control-layers{
        box-shadow:0 2px 8px rgba(0,0,0,0.15);
        background:#f9b233;
        border-radius:8px;
      }

      .recenter-btn{
        position:absolute;
        z-index:1000;
        right:12px;
        top: calc(var(--safeTop) + 10px);
        background:#f9b233;
        border-radius:10px;
        padding:10px 12px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
        font-size:16px;
        box-shadow:0 2px 6px rgba(0,0,0,0.2);
        user-select:none;
      }

      .leaflet-control-zoom a {
        width: 36px;
        height: 36px;
        line-height: 36px;
        background:#f9b233;
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <div class="recenter-btn" id="recenter">My Location</div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
      // ---------------------------
      // Base map layers
      // ---------------------------
      const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OSM'
      });
      const hot = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OSM HOT'
      });

      const map = L.map('map', {
        center: [${initial.lat}, ${initial.lng}],
        zoom: 14,
        layers: [osm]
      });

      const baseLayers = {
        OSM: osm,
        Humanitarian: hot,
      };

      // ---------------------------
      // Overlay layers 
      // ---------------------------
      const pinLayer = L.layerGroup().addTo(map);        // My Pins
      const communityLayer = L.layerGroup().addTo(map);  // Community Pins

      L.control
        .layers(
          baseLayers,
          {
            "My Pins": pinLayer,
            "Community": communityLayer
          },
          { position: "topleft", collapsed: false }
        )
        .addTo(map);

      // ---------------------------
      // Custom icons (from RN assets)
      // ---------------------------
      const MY_PIN_URL = ${JSON.stringify(myPinUri || "")};
      const COMMUNITY_PIN_URL = ${JSON.stringify(communityPinUri || "")};
      const MY_LOCATION_URL = ${JSON.stringify(myLocationPinUri || "")};

      const ICON_W = 42;
      const ICON_H = 42;

      const myPinIcon = L.icon({
        iconUrl: MY_PIN_URL,
        iconSize: [ICON_W, ICON_H],
        iconAnchor: [ICON_W / 2, ICON_H],
        popupAnchor: [0, -ICON_H],
      });

      const communityPinIcon = L.icon({
        iconUrl: COMMUNITY_PIN_URL,
        iconSize: [ICON_W, ICON_H],
        iconAnchor: [ICON_W / 2, ICON_H],
        popupAnchor: [0, -ICON_H],
      });

      const myLocationIcon = L.icon({
        iconUrl: MY_LOCATION_URL,
        iconSize: [ICON_W, ICON_H],
        iconAnchor: [ICON_W / 2, ICON_H],
        popupAnchor: [0, -ICON_H],
      });

      // ---------------------------
      // Pins rendering
      // payload = { myPins: [], communityPins: [] }
      // ---------------------------
      window._setPins = function (payload) {
        try {
          const myPins = Array.isArray(payload?.myPins) ? payload.myPins : [];
          const communityPins = Array.isArray(payload?.communityPins) ? payload.communityPins : [];

          pinLayer.clearLayers();
          communityLayer.clearLayers();

          const bounds = [];

          // Render My Pins
          myPins.forEach(function (p) {
            if (!Number.isFinite(p.lat) || !Number.isFinite(p.lng)) return;

            const name = p.commonName || p.scientificName || "Pinned plant";
            const sci = p.scientificName || "";
            const html =
              "<strong>" + name + "</strong><br/><small>" + sci + "</small>";

            L.marker([p.lat, p.lng], { icon: myPinIcon })
              .addTo(pinLayer)
              .bindPopup(html);

            bounds.push([p.lat, p.lng]);
          });

          // Render Community Pins
          communityPins.forEach(function (p) {
            if (!Number.isFinite(p.lat) || !Number.isFinite(p.lng)) return;

            const name = p.commonName || p.scientificName || "Community plant";
            const sci = p.scientificName || "";
            const html =
              "<strong>" + name + "</strong><br/><small>" + sci + "</small>";

            L.marker([p.lat, p.lng], { icon: communityPinIcon })
              .addTo(communityLayer)
              .bindPopup(html);

            bounds.push([p.lat, p.lng]);
          });

          // Fit map to all pins if we have any
          if (bounds.length) {
            try {
              map.fitBounds(bounds, { padding: [30, 30], maxZoom: 16 });
            } catch (e) {}
          }

          // Tell RN that pins rendered
          if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                type: "pins_rendered",
                myCount: pinLayer.getLayers().length,
                communityCount: communityLayer.getLayers().length
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

      // ---------------------------
      // User location marker (My Location pin)
      // ---------------------------
      let userMarker = null;

      function setUserLocation(lat, lng) {
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

        if (userMarker) userMarker.remove();

        userMarker = L.marker([lat, lng], { icon: myLocationIcon })
          .addTo(map)
          .bindPopup("<strong>My Location</strong>");
      }

      // Recenter button
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

      // Receive messages from React Native
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

        allowFileAccess
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs

        onMessage={(e) => {
          try {
            const m = JSON.parse(e.nativeEvent.data);

            if (m.type === "pins_rendered") {
              console.log("Leaflet rendered pins:", {
                myPins: m.myCount,
                communityPins: m.communityCount,
              });
            }

            if (m.type === "pins_error") {
              console.log("Leaflet pin error:", m.error);
            }
          } catch {}
        }}
      />

      {/* Back button */}
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
