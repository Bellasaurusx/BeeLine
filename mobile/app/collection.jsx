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
  Alert,
  Share,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BeeIcon from "../assets/bee_icon.png";
import BackButton from "./components/BackButton";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function PollinatorBadge({ variant = "icon" }) {
  if (variant === "pill") {
    return (
      <View style={styles.pollinatorPill}>
        <View>
          <Image source={BeeIcon} style={styles.pollinatorBee} resizeMode="contain" />
        </View>
        <Text style={styles.pollinatorPillText}>Pollinator-Friendly</Text>
      </View>
    );
  }

  return (
    <View style={styles.pollinatorDot}>
      <Image source={BeeIcon} style={styles.pollinatorBee} resizeMode="contain" />
    </View>
  );
}

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

        const res = await fetch(`${API_URL}/api/observations?limit=300&sort=newest`);
        if (!res.ok) throw new Error("Failed to load collection");

        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setError("Could not load your collection. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    run();
  }, []);

  const filtered = useMemo(() => {
    let result = [...items];

    if (onlyWithPhotos) {
      result = result.filter((x) => !!x?.imageUrl);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter((x) => {
        const c = (x.commonName || "").toLowerCase();
        const s = (x.scientificName || "").toLowerCase();
        return c.includes(q) || s.includes(q);
      });
    }

    const collator = new Intl.Collator(undefined, { sensitivity: "base" });

    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy === "az") {
      result.sort((a, b) =>
        collator.compare(
          a.commonName || a.scientificName || "",
          b.commonName || b.scientificName || ""
        )
      );
    } else if (sortBy === "za") {
      result.sort((a, b) =>
        collator.compare(
          b.commonName || b.scientificName || "",
          a.commonName || a.scientificName || ""
        )
      );
    }

    return result;
  }, [items, search, sortBy, onlyWithPhotos]);

  const SortChip = ({ label, active, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.chip, active ? styles.chipActive : null]}>
        <Text style={[styles.chipText, active ? styles.chipTextActive : null]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const openDetail = (item) => setSelectedItem(item);
  const closeDetail = () => setSelectedItem(null);

  const shareCollection = async () => {
    try {
      if (!items || items.length === 0) {
        Alert.alert("Nothing to share yet", "Save a few plants first, then share your collection.");
        return;
      }

      const lines = items.slice(0, 50).map((p, idx) => {
        const name = p.commonName || p.scientificName || "Unknown plant";
        const sci = p.scientificName ? ` (${p.scientificName})` : "";
        const bee = p.pollinatorFriendly ? " 🐝" : "";
        return `${idx + 1}. ${name}${sci}${bee}`;
      });

      const message =
        "My BeeLine Collection\n\n" +
        lines.join("\n") +
        (items.length > 50 ? `\n\n…plus ${items.length - 50} more.` : "") +
        "\n\nShared from BeeLine";

      await Share.share({ message });
    } catch (e) {
      console.error("Share failed:", e);
      Alert.alert("Share failed", "Something went wrong while trying to share.");
    }
  };

  const renderItem = ({ item }) => {
    const title = item.commonName || item.scientificName || "Unknown plant";
    const subtitle = item.commonName && item.scientificName ? item.scientificName : "";
    const date = item.createdAt ? new Date(item.createdAt).toLocaleString() : "";
    const confidence =
      typeof item.confidence === "number" ? `${Math.round(item.confidence * 100)}%` : null;

    return (
      <TouchableOpacity style={styles.card} onPress={() => openDetail(item)}>
        {!!item.imageUrl && (
          <Image source={{ uri: item.imageUrl }} style={styles.cardImage} resizeMode="cover" />
        )}

        <View style={styles.cardContent}>
          <View style={styles.titleRow}>
            <Text style={styles.cardTitle}>{title}</Text>

            {item.pollinatorFriendly ? <PollinatorBadge variant="icon" /> : null}
          </View>

          {!!subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}

          <View style={styles.metaRow}>
            {!!date && <Text style={styles.cardMeta}>{date}</Text>}
            {!!confidence && <Text style={styles.cardMeta}>{confidence}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (selectedItem) {
    const title = selectedItem.commonName || selectedItem.scientificName || "Unknown plant";
    const subtitle =
      selectedItem.commonName && selectedItem.scientificName ? selectedItem.scientificName : "";
    const date = selectedItem.createdAt ? new Date(selectedItem.createdAt).toLocaleString() : "";
    const confidence =
      typeof selectedItem.confidence === "number"
        ? `${Math.round(selectedItem.confidence * 100)}%`
        : null;

    return (
      <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
        <BackButton />
        <TouchableOpacity onPress={closeDetail} style={styles.backLink}>
          <Text style={styles.backLinkText}>← Back to collection</Text>
        </TouchableOpacity>

        <View style={styles.detailCard}>
          {!!selectedItem.imageUrl && (
            <Image
              source={{ uri: selectedItem.imageUrl }}
              style={styles.detailImage}
              resizeMode="cover"
            />
          )}

          <View style={styles.titleRow}>
            <Text style={styles.detailTitle}>{title}</Text>
            {selectedItem.pollinatorFriendly ? <PollinatorBadge variant="icon" /> : null}
          </View>

          {!!subtitle && <Text style={styles.detailSubtitle}>{subtitle}</Text>}
          {!!date && <Text style={styles.meta}>Pinned: {date}</Text>}
          {!!confidence && <Text style={styles.meta}>Confidence: {confidence}</Text>}

          {selectedItem.pollinatorFriendly ? <PollinatorBadge variant="pill" /> : null}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <View style={styles.topRow}>
        <BackButton />
      </View>

      <View style={styles.headerRow}>
        <Text style={styles.heading}>My Collection</Text>
        <TouchableOpacity style={styles.shareBtn} onPress={shareCollection}>
          <Text style={styles.shareBtnText}>Share</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subheading}>Plants that have been pinned from the Identify screen.</Text>

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
        style={[styles.filterToggle, onlyWithPhotos ? styles.filterToggleActive : null]}
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
            <Text style={styles.emptyText}>
              No items yet. Identify a plant and pin it to your map to build your collection.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#4c6233", paddingHorizontal: 16 },
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },

  heading: { fontSize: 28, color: "#fff", fontWeight: "800", marginTop: 6 },
  subheading: { marginTop: 6, color: "#fff" },

  searchInput: {
    marginTop: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
  },

  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  chipActive: { borderColor: "#f9b233", backgroundColor: "#E8F3EF" },
  chipText: { color: "#333", fontWeight: "600" },
  chipTextActive: { color: "#f9b233" },

  filterToggle: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  filterToggleActive: { borderColor: "#f9b233", backgroundColor: "#E8F3EF" },
  filterToggleText: { color: "#333", fontWeight: "600" },
  filterToggleTextActive: { color: "#f9b233" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "#B00020", fontWeight: "700" },
  meta: { color: "#666", marginTop: 10 },

  emptyListContainer: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  emptyText: { textAlign: "center", color: "#666" },

  card: {
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  cardImage: { width: "100%", height: 140, backgroundColor: "#eee" },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 18, fontWeight: "700" },
  cardSubtitle: { marginTop: 2, fontStyle: "italic", color: "#555" },

  metaRow: { marginTop: 8, flexDirection: "row", justifyContent: "space-between" },
  cardMeta: { color: "#666", fontSize: 12 },

  backLink: { marginTop: 12, marginBottom: 6 },
  backLinkText: { color: "#fff", fontWeight: "700" },

  detailCard: {
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
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

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  shareBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#f4cf65",
  },
  shareBtnText: { color: "#000", fontWeight: "700" },

  pollinatorDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#F4B400",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  pollinatorBee: { width: 16, height: 16 },

  pollinatorPill: {
    marginTop: 12,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#F4B400",
  },
  pollinatorPillText: { color: "#444", fontWeight: "600" },
});
