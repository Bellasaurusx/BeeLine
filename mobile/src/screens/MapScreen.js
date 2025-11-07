import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";

const leafletHTML = (initialCoords) => `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<style>
  html, body, #map { height: 100%; margin: 0; padding: 0; }
  .recenter-btn {
    position: absolute; z-index: 1000; right: 12px; top: 12px;
    background: white; border-radius: 6px; padding: 8px 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    cursor: pointer;
  }
  .popup-card { min-width: 180px; }
  .popup-card img { width: 100%; height: 100px; object-fit: cover; border-radius: 6px; }
  .popup-title { font-weight: 600; margin: 6px 0 2px; }
  .popup-sub { color: #555; font-size: 12px; }
</style>
</head>
<body>
<div id="map"></div>
<div class="recenter-btn" id="recenter">My Location</div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
  const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OSM' });
  const hot = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OSM HOT' });
  const toner = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', { maxZoom: 19, attribution: 'Map tiles © Stamen' });

  const map = L.map('map', {
    center: [${initialCoords.lat}, ${initialCoords.lng}],
    zoom: 14,
    layers: [osm],
    zoomControl: true,
  });

  const baseLayers = { "OSM": osm, "Humanitarian": hot, "Toner Lite": toner };
  const pinLayer = L.layerGroup().addTo(map);
  const communityLayer = L.layerGroup();

  L.control.layers(baseLayers, { "My Pins": pinLayer, "Community": communityLayer }).addTo(map);

  let userMarker = null;
  function setUserLocation(lat, lng) {
    if (userMarker) userMarker.remove();
    userMarker = L.circleMarker([lat, lng], { radius: 7, color: "#1e90ff", fillColor: "#1e90ff", fillOpacity: 0.8 }).addTo(map);
  }

  document.getElementById('recenter').onclick = () => {
    if (userMarker) {
      const ll = userMarker.getLatLng();
      map.setView(ll, 15, { animate: true });
    }
    window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({ type: "recenter_tapped" }));
  };

  document.addEventListener("message", onMessage);
  window.addEventListener("message", onMessage);
  function onMessage(e) {
    try {
      const msg = JSON.parse(e.data);
      if (msg.type === "user_location") {
        setUserLocation(msg.payload.lat, msg.payload.lng);
      } else if (msg.type === "set_pins") {
        pinLayer.clearLayers();
        msg.payload.forEach(p => {
          const html = \`
            <div class="popup-card">
              <img src="\${p.imageUrl || "https://placehold.co/300x180?text=Plant"}" />
              <div class="popup-title">\${p.commonName || "Unknown plant"}</div>
              <div class="popup-sub"><i>\${p.scientificName || ""}</i></div>
            </div>\`;
          L.marker([p.lat, p.lng]).addTo(pinLayer).bindPopup(html);
        });
      }
    } catch (err) {}
  }
</script>
</body>
</html>`;

export default function MapScreen() {
  const webRef = useRef(null);
  const [coords, setCoords] = useState({ lat: 37.7749, lng: -122.4194 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const loc = await Location.getCurrentPositionAsync({});
      const lat = loc.coords.latitude;
      const lng = loc.coords.longitude;
      setCoords({ lat, lng });
      if (webRef.current) {
        webRef.current.postMessage(JSON.stringify({ type: "user_location", payload: { lat, lng } }));
      }
    })();
  }, [ready]);

  const pins = useMemo(() => ([
    { id: 1, lat: coords.lat + 0.002, lng: coords.lng + 0.002, commonName: "Purple Coneflower", scientificName: "Echinacea purpurea" },
    { id: 2, lat: coords.lat - 0.002, lng: coords.lng - 0.001, commonName: "Milkweed", scientificName: "Asclepias syriaca" },
  ]), [coords]);

  const onWebViewLoad = () => {
    setReady(true);
    if (webRef.current) {
      webRef.current.postMessage(JSON.stringify({ type: "set_pins", payload: pins }));
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webRef}
        originWhitelist={["*"]}
        onLoadEnd={onWebViewLoad}
        javaScriptEnabled
        domStorageEnabled
        allowFileAccess
        allowUniversalAccessFromFileURLs
        source={{ html: leafletHTML(coords) }}
        onMessage={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", marginTop: Platform.OS === "android" ? 25 : 0 },
});
