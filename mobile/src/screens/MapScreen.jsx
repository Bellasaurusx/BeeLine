import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Platform, Image, Text, Dimensions, Modal, Pressable } from "react-native";
import WebView from "react-native-webview";
import * as Location from "expo-location";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BackButton from "../../app/components/BackButton";

import MyPinIcon from "../../assets/my-pin.png";
import CommunityPinIcon from "../../assets/community-pin.png";
import MyLocationPinIcon from "../../assets/location-pin.png";
import BeeIcon from "../../assets/bee_icon.png";

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const webRef = useRef(null);

  const [ready, setReady] = useState(false);
  const [pins, setPins] = useState([]);
  const [coords, setCoords] = useState({ lat: 37.7749, lng: -122.4194 });

  // Pollinator badge tooltip modal 
  const [badgeOpen, setBadgeOpen] = useState(false);
  const [badgePlant, setBadgePlant] = useState(null); 

  const myPinUri = Image.resolveAssetSource(MyPinIcon)?.uri;
  const communityPinUri = Image.resolveAssetSource(CommunityPinIcon)?.uri;
  const myLocationPinUri = Image.resolveAssetSource(MyLocationPinIcon)?.uri;
  const beeIconUri = Image.resolveAssetSource(BeeIcon)?.uri;

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

  const handleWebMessage = (event) => {
    try {
      const msg = JSON.parse(event?.nativeEvent?.data || "{}");
      if (msg?.type === "pollinator_badge") {
        setBadgePlant(msg?.payload || null);
        setBadgeOpen(true);
      }
    } catch (e) {
    }
  };

  const topOffset = Math.round((insets.top || 0) + 12);
  const { height: screenH } = Dimensions.get("window");
  const MAP_FRAME_HEIGHT = Math.min(550, Math.round(screenH * 0.7));

  const leafletHTML = (initial, offsetTopPx) => `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
    <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css"/>
    <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css"/>
    <style>
      :root { --safeTop: ${offsetTopPx}px; }
      html,body,#map{height:100%;margin:0}
      .leaflet-top { top: calc(var(--safeTop) + 1px) !important; }
      .leaflet-left { left: 1px !important; }
      .leaflet-right { right: 1px !important; }
      .leaflet-control-layers{
        box-shadow:0 2px 6px rgba(0,0,0,0.15);
        background:#f9b233;
        border-radius:10px;
        padding: 6px 8px;
        font-size: 14px;
      }
      .leaflet-control-layers-toggle{
        width: 34px !important;
        height: 34px !important;
        background-size: 18px 18px !important;
      }
      .recenter-btn{
        position:absolute;
        z-index:1000;
        right:12px;
        top: calc(var(--safeTop) + 10px);
        background:#f9b233;
        border-radius:10px;
        padding:8px 10px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
        font-size:14px;
        font-weight:600;
        box-shadow:0 2px 6px rgba(0,0,0,0.2);
        user-select:none;
      }
      .leaflet-control-zoom a {
        width: 32px;
        height: 32px;
        line-height: 25px;
        background:#f9b233;
        font-size: 18px;
      }

      /* Popup pollinator badge  */
      .popup-title-row{
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
      }
      .pollinator-badge-btn{
        border:0;
        padding:0;
        background:transparent;
        cursor:pointer;
        flex: 0 0 auto;
      }
      .pollinator-badge{
        width:28px;
        height:28px;
        border-radius:14px;
        background:#F9B233;
        display:flex;
        align-items:center;
        justify-content:center;
      }
      .pollinator-badge img{
        width:14px;
        height:14px;
        object-fit:contain;
        display:block;
      }
      .popup-sci{
        display:block;
        margin-top:2px;
        color:#333;
      }
      /* Popup image */
      .popup-img {
        width: 100%;
        height: 110px;
        border-radius: 10px;
        object-fit: cover;
        display: block;
        margin: 8px 0 6px 0;
        background: #eee;
      }
      .popup-wrap {
        max-width: 220px;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <div class="recenter-btn" id="recenter">My Location</div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>

    <script>
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

      const baseLayers = { OSM: osm, Humanitarian: hot };

      const pinLayer = L.markerClusterGroup({
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        maxClusterRadius: 40,
      });

      const communityLayer = L.markerClusterGroup({
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        maxClusterRadius: 40,
      });

      map.addLayer(pinLayer);
      map.addLayer(communityLayer);

      L.control
        .layers(
          baseLayers,
          { "My Pins": pinLayer, "Community": communityLayer },
          { position: "topleft", collapsed: true }
        )
        .addTo(map);

      const MY_PIN_URL = ${JSON.stringify(myPinUri || "")};
      const COMMUNITY_PIN_URL = ${JSON.stringify(communityPinUri || "")};
      const MY_LOCATION_URL = ${JSON.stringify(myLocationPinUri || "")};
      const BEE_URL = ${JSON.stringify(beeIconUri || "")};

      const ICON_W = 42;
      const ICON_H = 42;

      const myPinIcon = L.icon({ iconUrl: MY_PIN_URL, iconSize: [ICON_W, ICON_H], iconAnchor: [ICON_W/2, ICON_H] });
      const communityPinIcon = L.icon({ iconUrl: COMMUNITY_PIN_URL, iconSize: [ICON_W, ICON_H], iconAnchor: [ICON_W/2, ICON_H] });
      const myLocationIcon = L.icon({ iconUrl: MY_LOCATION_URL, iconSize: [ICON_W, ICON_H], iconAnchor: [ICON_W/2, ICON_H] });

      function escapeHtml(str) {
        return String(str || "")
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#039;");
      }

      function postToRN(payload) {
        try {
          if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
            window.ReactNativeWebView.postMessage(JSON.stringify(payload));
          }
        } catch (_) {}
      }

      // Called from inline onclick below
      window._onBadgeClick = function (payloadJson) {
        try {
          const payload = JSON.parse(payloadJson || "{}");
          postToRN({ type: "pollinator_badge", payload });
        } catch (e) {
          postToRN({ type: "pollinator_badge", payload: null });
        }
      };

      function popupHTML(p, fallbackTitle) {
        const name = escapeHtml(p.commonName || p.scientificName || fallbackTitle);
        const sci = escapeHtml(p.scientificName || "");
        const isPollinator = p.pollinatorFriendly === true;

        const badgePayload = {
          commonName: p.commonName || "",
          scientificName: p.scientificName || "",
          id: p.id ?? null
        };

        const badge = (isPollinator && BEE_URL)
          ? (
              '<button class="pollinator-badge-btn" type="button" ' +
              'onclick="event.stopPropagation(); window._onBadgeClick(\\'' + escapeHtml(JSON.stringify(badgePayload)) + '\\');" ' +
              'title="Pollinator-Friendly">' +
                '<span class="pollinator-badge">' +
                  '<img src="' + BEE_URL + '" />' +
                '</span>' +
              '</button>'
            )
          : "";

        return (
          '<div class="popup-wrap">' +
            (p.imageUrl
              ? '<img class="popup-img" src="' + escapeHtml(p.imageUrl) + '" />'
              : "") +
            '<div class="popup-title-row">' +
              '<strong>' + name + '</strong>' +
              badge +
            '</div>' +
            (sci ? '<small class="popup-sci"><em>' + sci + '</em></small>' : "") +
          '</div>'
        );

      }

      window._setPins = function (payload) {
        const myPins = Array.isArray(payload?.myPins) ? payload.myPins : [];
        const communityPins = Array.isArray(payload?.communityPins) ? payload.communityPins : [];

        pinLayer.clearLayers();
        communityLayer.clearLayers();

        const bounds = [];

        myPins.forEach(function (p) {
          if (!Number.isFinite(p.lat) || !Number.isFinite(p.lng)) return;
          const html = popupHTML(p, "Pinned plant");
          L.marker([p.lat, p.lng], { icon: myPinIcon }).addTo(pinLayer).bindPopup(html);
          bounds.push([p.lat, p.lng]);
        });

        communityPins.forEach(function (p) {
          if (!Number.isFinite(p.lat) || !Number.isFinite(p.lng)) return;
          const html = popupHTML(p, "Community plant");
          L.marker([p.lat, p.lng], { icon: communityPinIcon }).addTo(communityLayer).bindPopup(html);
          bounds.push([p.lat, p.lng]);
        });

        if (bounds.length) {
          try { map.fitBounds(bounds, { padding: [30, 30], maxZoom: 16 }); } catch (e) {}
        }
      };

      let userMarker = null;

      function setUserLocation(lat, lng) {
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
        if (userMarker) userMarker.remove();
        userMarker = L.marker([lat, lng], { icon: myLocationIcon }).addTo(map).bindPopup("<strong>My Location</strong>");
      }

      document.getElementById("recenter").onclick = function () {
        if (userMarker) map.setView(userMarker.getLatLng(), 15, { animate: true });
      };

      function onMsg(e) {
        try {
          const msg = JSON.parse(e.data);
          if (msg.type === "user_location") setUserLocation(msg.payload.lat, msg.payload.lng);
        } catch (_) {}
      }

      document.addEventListener("message", onMsg);
      window.addEventListener("message", onMsg);
    </script>
  </body>
</html>`;

  return (
    <View style={styles.container}>
      <View style={[styles.screenInner, { paddingTop: (insets.top || 0) + 8 }]}>
        <View style={[styles.mapFrame, { height: MAP_FRAME_HEIGHT }]}>
          <WebView
            ref={webRef}
            originWhitelist={["*"]}
            javaScriptEnabled
            domStorageEnabled
            onLoadEnd={onWebViewLoad}
            onMessage={handleWebMessage}
            source={{ html: leafletHTML(coords, topOffset) }}
            allowFileAccess
            allowFileAccessFromFileURLs
            allowUniversalAccessFromFileURLs
          />
        </View>

        <View style={{ flex: 1 }} />
      </View>

      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom || 0, 10) },
        ]}
      >
        <View style={styles.backSlot}>
          <BackButton />
        </View>

        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>Legend</Text>

          <View style={styles.legendRowWrap}>
            <View style={styles.legendItemFixed}>
              <Image source={MyPinIcon} style={styles.legendIcon} />
              <Text style={styles.legendText}>My Pins</Text>
            </View>

            <View style={styles.legendItemFixed}>
              <Image source={CommunityPinIcon} style={styles.legendIcon} />
              <Text style={styles.legendText}>Pins From My Community</Text>
            </View>

            <View style={styles.legendItemFixed}>
              <Image source={MyLocationPinIcon} style={styles.legendIcon} />
              <Text style={styles.legendText}>My Location</Text>
            </View>

            <View style={styles.legendItemFixed}>
              <View style={styles.legendBeeWrap}>
                <Image source={BeeIcon} style={styles.legendBeeIcon} />
              </View>
              <Text style={styles.legendText}>Pollinator-Friendly</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Pollinator Badge Info */}
      <Modal
        visible={badgeOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setBadgeOpen(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setBadgeOpen(false)}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Pollinator-Friendly</Text>

            {badgePlant?.scientificName ? (
              <Text style={styles.modalPinnedName}>
                {badgePlant.commonName ? `${badgePlant.commonName} • ` : ""}
                <Text style={{ fontStyle: "italic" }}>{badgePlant.scientificName}</Text>
              </Text>
            ) : null}

            <Text style={styles.modalBody}>
              This plant supports bees, butterflies, and other pollinators. BeeLine identifies
              pollinator-friendly plants using curated ecological data and plant research.
            </Text>

            <Pressable style={styles.modalBtn} onPress={() => setBadgeOpen(false)}>
              <Text style={styles.modalBtnText}>Got it</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: "#4c6233",
  },
  screenInner: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mapFrame: {
    width: "100%",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#c9e4ca",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  bottomBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  backSlot: {
    width: 64,
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  legendCard: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#c9e4ca",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 10,
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  legendRowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 12,
  },
  legendItemFixed: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minWidth: "48%",
  },
  legendIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  legendText: {
    fontSize: 18,
    fontWeight: "600",
  },

  // Legend bee 
  legendBeeWrap: {
    backgroundColor: "#F9B233",
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  legendBeeIcon: {
    width: 12,
    height: 12,
    resizeMode: "contain",
  },

  // Modal tooltip 
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    padding: 22,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#7fa96b",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 6,
    color: "#111",
  },
  modalPinnedName: {
    marginBottom: 8,
    color: "#333",
    fontWeight: "700",
  },
  modalBody: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },
  modalBtn: {
    marginTop: 12,
    backgroundColor: "#F9B233",
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
  },
  modalBtnText: {
    fontWeight: "800",
    color: "#111",
  },
});
