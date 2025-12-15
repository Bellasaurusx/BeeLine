import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BeeIcon from "../assets/bee_icon.png";
import BackButton from "./components/BackButton";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function CollectionScreen() {
  const insets = useSafeAreaInsets(); 

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [onlyWithPhotos, setOnlyWithPhotos] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    async function run() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_URL}/api/observations`);
        if (!res.ok) throw new Error("Failed to load collection");

        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.log("Collection fetch error", e);
        setError("Could not load collection.");
      } finally {
        setLoading(false);
      }
    }

    run();
  }, []);

  const filtered = useMemo(() => {
    let result = [...items];

    if (onlyWithPhotos) {
      result = result.filter((i) => !!i.imageUrl);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((i) => {
        const common = (i.commonName || "").toLowerCase();
        const sci = (i.scientificName || "").toLowerCase();
        return common.includes(q) || sci.includes(q);
      });
    }

    result.sort((a, b) => {
      const aName = (a.commonName || a.scientificName || "").toLowerCase();
      const bName = (b.commonName || b.scientificName || "").toLowerCase();
      const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      switch (sortBy) {
        case "oldest":
          return aDate - bDate;
        case "az":
          return aName.localeCompare(bName);
        case "za":
          return bName.localeCompare(aName);
        case "newest":
        default:
          return bDate - aDate;
      }
    });

    return result;
  }, [items, search, sortBy, onlyWithPhotos]);

  if (selectedItem) {
    const item = selectedItem;
    const title = item.commonName || item.scientificName || "Unknown plant";
    const sci = item.scientificName;
    const date = item.createdAt ? new Date(item.createdAt).toLocaleString() : "";
    const confidence =
      typeof item.confidence === "number"
        ? `${Math.round(item.confidence * 100)}%`
        : null;

    return (
      <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => setSelectedItem(null)}>
          <Text style={styles.backLink}>← Back to collection</Text>
        </TouchableOpacity>

        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.detailImage} />
        ) : (
          <View style={[styles.detailImage, styles.cardImagePlaceholder]}>
            <Text style={styles.cardImagePlaceholderText}>No image</Text>
          </View>
        )}

        <Text style={styles.detailTitle}>{title}</Text>
        {!!sci && <Text style={styles.detailSubtitle}>{sci}</Text>}
        {!!confidence && (
          <Text style={styles.meta}>Identification confidence: {confidence}</Text>
        )}
        {!!date && <Text style={styles.meta}>Pinned on {date}</Text>}

        <BackButton />
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const title = item.commonName || item.scientificName || "Unknown plant";
    const subtitle =
      item.commonName && item.scientificName ? item.scientificName : "";
    const date = item.createdAt ? new Date(item.createdAt).toLocaleString() : "";
    const confidence =
      typeof item.confidence === "number"
        ? `${Math.round(item.confidence * 100)}%`
        : null;

    return (
      <TouchableOpacity style={styles.card} onPress={() => setSelectedItem(item)}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
        ) : (
          <View style={[styles.cardImage, styles.cardImagePlaceholder]}>
            <Text style={styles.cardImagePlaceholderText}>No image</Text>
          </View>
        )}

        <View style={styles.cardContent}>
          <View style={styles.titleRow}>
            <Text style={styles.cardTitle}>{title}</Text>

            {item.pollinatorFriendly && (
              <Image source={BeeIcon} style={styles.beeIcon} resizeMode="contain" />
            )}
          </View>

          {!!subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}

          <View style={styles.metaRow}>
            {!!date && <Text style={styles.cardMeta}>{date}</Text>}
            {!!confidence && <Text style={styles.cardMeta}>Confidence: {confidence}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <Text style={styles.heading}>My Collection</Text>
      <Text style={styles.subheading}>
        Plants that have been pinned from the Identify screen.
      </Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or species..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.chipRow}>
        <SortChip label="Newest" active={sortBy === "newest"} onPress={() => setSortBy("newest")} />
        <SortChip label="Oldest" active={sortBy === "oldest"} onPress={() => setSortBy("oldest")} />
        <SortChip label="A–Z" active={sortBy === "az"} onPress={() => setSortBy("az")} />
        <SortChip label="Z–A" active={sortBy === "za"} onPress={() => setSortBy("za")} />
      </View>

      <TouchableOpacity
        style={[
          styles.filterToggle,
          onlyWithPhotos ? styles.filterToggleActive : null,
        ]}
        onPress={() => setOnlyWithPhotos((v) => !v)}
      >
        <Text
          style={[
            styles.filterToggleText,
            onlyWithPhotos ? styles.filterToggleTextActive : null,
          ]}
        >
          Only show items with photos
        </Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={styles.meta}>Loading collection…</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={filtered.length === 0 ? styles.emptyListContainer : undefined}
          ListEmptyComponent={
            <Text style={styles.meta}>
              No items yet. Pin a plant from the Identify screen to see it here.
            </Text>
          }
        />
      )}

      <BackButton />
    </View>
  );
}

function SortChip({ label, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, active ? styles.chipActive : null]}
    >
      <Text style={[styles.chipText, active ? styles.chipTextActive : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  heading: { fontSize: 24, fontWeight: "700", marginBottom: 4, marginTop: 4 },
  subheading: { color: "#555", marginBottom: 12 },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  chipRow: { flexDirection: "row", marginBottom: 8 },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
  },
  chipActive: { backgroundColor: "#111", borderColor: "#111" },
  chipText: { fontSize: 12, color: "#333" },
  chipTextActive: { color: "#fff" },

  filterToggle: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 12,
  },
  filterToggleActive: { backgroundColor: "#111", borderColor: "#111" },
  filterToggleText: { fontSize: 12, color: "#333" },
  filterToggleTextActive: { color: "#fff" },

  center: { alignItems: "center", justifyContent: "center", paddingVertical: 24 },
  meta: { color: "#666", marginTop: 8 },
  error: { color: "red", textAlign: "center", marginTop: 8 },

  emptyListContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  card: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  cardImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: "#ddd",
  },
  cardImagePlaceholder: { alignItems: "center", justifyContent: "center" },
  cardImagePlaceholderText: { fontSize: 10, color: "#555" },

  cardContent: { flex: 1 },
  cardTitle: { fontWeight: "700", marginBottom: 2 },
  cardSubtitle: { color: "#555", marginBottom: 4 },
  metaRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },
  cardMeta: { color: "#888", fontSize: 12 },

  backLink: {
    marginTop: 12,
    alignSelf: "flex-start",
    borderBottomWidth: 1,
    paddingBottom: 2,
  },

  detailImage: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginTop: 12,
    marginBottom: 16,
    backgroundColor: "#eee",
  },
  detailTitle: { fontSize: 24, fontWeight: "700", marginBottom: 4 },
  detailSubtitle: { fontSize: 16, fontStyle: "italic", color: "#555", marginBottom: 8 },

  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  beeIcon: { width: 20, height: 20, marginLeft: 6 },
});
