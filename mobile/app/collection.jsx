import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Share,
  Modal,
  Pressable,
  ScrollView,
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

  // Pollinator badge tooltip modal
  const [badgeOpen, setBadgeOpen] = useState(false);

  const [inatLoading, setInatLoading] = useState(false);
  const [inat, setInat] = useState(null);

  const [polliLoading, setPolliLoading] = useState(false);
  const [polli, setPolli] = useState(null);

  // ----------------------------
  // Helpers (iNaturalist + taxonomy)
  // ----------------------------
  function cleanSciName(name = "") {
    return name
      .trim()
      .replace(/\s+[A-Z][a-z]*\.?$/g, "") 
      .split(/\s+/)
      .slice(0, 2)
      .join(" ");
  }

  async function fetchINatTaxon(scientificName) {
    const cleaned = cleanSciName(scientificName);
    if (!cleaned) return null;

    const url = `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(
      cleaned
    )}&per_page=5`;

    const res = await fetch(url);
    const json = await res.json();

    const results = Array.isArray(json?.results) ? json.results : [];
    if (!results.length) return null;

    const exact =
      results.find((t) => (t.name || "").toLowerCase() === cleaned.toLowerCase()) || results[0];

    if (!exact) return null;

    const commonName =
      exact.preferred_common_name ||
      exact.english_common_name ||
      (exact.common_names?.length ? exact.common_names[0].name : null);

    return {
      id: exact.id,
      name: exact.name,
      commonName,
      rank: exact.rank,
      iconicTaxon: exact.iconic_taxon_name,
      observationsCount: exact.observations_count,
      wikiUrl: exact.wikipedia_url || null,
      photo: exact?.default_photo?.medium_url || exact?.default_photo?.square_url || null,
      ancestors: exact.ancestors || [],
    };
  }

  function extractFamilyFromAncestors(ancestors = []) {
    const fam = ancestors.find((a) => a.rank === "family");
    return fam?.name || null;
  }

  function extractGenusFromName(scientificName = "") {
    return scientificName.trim().split(/\s+/)[0] || null;
  }

  // ----------------------------
  // Load collection
  // ----------------------------
  useEffect(() => {
    async function run() {
      try {
        setLoading(true);
        setError("");

        if (!API_URL) {
          throw new Error("Missing EXPO_PUBLIC_API_URL");
        }

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

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!selectedItem?.scientificName) {
        setInat(null);
        setPolli(null);
        return;
      }

      // iNaturalist taxon lookup
      try {
        setInatLoading(true);
        const taxon = await fetchINatTaxon(selectedItem.scientificName);
        if (!cancelled) setInat(taxon);
      } catch (e) {
        console.error("iNat fetch failed:", e);
        if (!cancelled) setInat(null);
      } finally {
        if (!cancelled) setInatLoading(false);
      }

      // Pollinator status + notes 
      try {
        setPolliLoading(true);
        setPolli(null);

        if (!API_URL) return;

        const res = await fetch(`${API_URL}/api/pollinator-check`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: [
              {
                scientificName: selectedItem.scientificName,
                commonName: selectedItem.commonName || "",
              },
            ],
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const first = Array.isArray(data?.results) ? data.results[0] : null;
          if (!cancelled) setPolli(first || null);
        }
      } catch (e) {
        console.error("Pollinator-check failed:", e);
      } finally {
        if (!cancelled) setPolliLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [selectedItem?.id, selectedItem?.scientificName]);

  // ----------------------------
  // Filter + sort list
  // ----------------------------
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

  const PollinatorIconButton = () => (
    <TouchableOpacity onPress={() => setBadgeOpen(true)} hitSlop={12} style={styles.beeIconWrap}>
      <Image source={BeeIcon} style={styles.beeIcon} />
    </TouchableOpacity>
  );

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
            {item.pollinatorFriendly === true ? <PollinatorIconButton /> : null}
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

  // ----------------------------
  // Details view
  // ----------------------------
  if (selectedItem) {
    const title = selectedItem.commonName || selectedItem.scientificName || "Unknown plant";
    const subtitle =
      selectedItem.commonName && selectedItem.scientificName ? selectedItem.scientificName : "";
    const date = selectedItem.createdAt ? new Date(selectedItem.createdAt).toLocaleString() : "";
    const confidence =
      typeof selectedItem.confidence === "number"
        ? `${Math.round(selectedItem.confidence * 100)}%`
        : null;

    const family = extractFamilyFromAncestors(inat?.ancestors || []);
    const genus = extractGenusFromName(selectedItem.scientificName);
    const polliData = selectedItem?.pollinatorData || null;


    const pollinatorLabel = polliLoading
      ? "Loading…"
      : polli?.pollinatorFriendly === true
      ? "Pollinator-friendly "
      : polli?.pollinatorFriendly === false
      ? "Not flagged as pollinator-friendly"
      : "Unknown";

    return (
      <ScrollView
      style={[styles.container, { paddingTop: insets.top + 12 }]}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
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
            {selectedItem.pollinatorFriendly === true ? <PollinatorIconButton /> : null}
          </View>

          {!!subtitle && <Text style={styles.detailSubtitle}>{subtitle}</Text>}
          {!!date && <Text style={styles.meta}>Pinned: {date}</Text>}
          {!!confidence && <Text style={styles.meta}>Confidence: {confidence}</Text>}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Plant Details</Text>


          {!!polli?.pollinatorNotes && <Text style={styles.bodyText}>{polli.pollinatorNotes}</Text>}

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Scientific name</Text>
            <Text style={styles.value}>{selectedItem.scientificName || "—"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Genus</Text>
            <Text style={styles.value}>{genus || "—"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Family (iNat)</Text>
            <Text style={styles.value}>{inatLoading ? "Loading…" : family || "—"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Rank (iNat)</Text>
            <Text style={styles.value}>{inatLoading ? "Loading…" : inat?.rank || "—"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Common name (iNat)</Text>
            <Text style={styles.value}>{inatLoading ? "Loading…" : inat?.commonName || "—"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Observations (iNat)</Text>
            <Text style={styles.value}>
              {inatLoading
                ? "Loading…"
                : typeof inat?.observationsCount === "number"
                ? inat.observationsCount.toLocaleString()
                : "—"}
            </Text>
          </View>
          {polliData ? (
            <>
              <View style={styles.divider} />

              {!!polliData.nativeRange && (
                <View style={styles.row}>
                  <Text style={styles.label}>Native range</Text>
                  <Text style={styles.value}>{polliData.nativeRange}</Text>
                </View>
              )}

              {!!polliData.habitat && (
                <View style={styles.row}>
                  <Text style={styles.label}>Habitat</Text>
                  <Text style={styles.value}>{polliData.habitat}</Text>
                </View>
              )}

              {!!polliData.bloomTime && (
                <View style={styles.row}>
                  <Text style={styles.label}>Bloom time</Text>
                  <Text style={styles.value}>{polliData.bloomTime}</Text>
                </View>
              )}

              {!!polliData.sun && (
                <View style={styles.row}>
                  <Text style={styles.label}>Sun</Text>
                  <Text style={styles.value}>{polliData.sun}</Text>
                </View>
              )}

              {!!polliData.soil && (
                <View style={styles.row}>
                  <Text style={styles.label}>Soil</Text>
                  <Text style={styles.value}>{polliData.soil}</Text>
                </View>
              )}

              {!!polliData.water && (
                <View style={styles.row}>
                  <Text style={styles.label}>Water</Text>
                  <Text style={styles.value}>{polliData.water}</Text>
                </View>
              )}

              {!!polliData.height && (
                <View style={styles.row}>
                  <Text style={styles.label}>Height</Text>
                  <Text style={styles.value}>{polliData.height}</Text>
                </View>
              )}

              {!!polliData.spread && (
                <View style={styles.row}>
                  <Text style={styles.label}>Spread</Text>
                  <Text style={styles.value}>{polliData.spread}</Text>
                </View>
              )}

              {Array.isArray(polliData.pollinators) && polliData.pollinators.length > 0 && (
                <View style={styles.row}>
                  <Text style={styles.label}>Pollinators</Text>
                  <Text style={styles.value}>{polliData.pollinators.join(", ")}</Text>
                </View>
              )}
            </>
          ) : null}


          {!!inat?.wikiUrl && (
            <TouchableOpacity
              style={styles.linkBtn}
              onPress={() => Linking.openURL(inat.wikiUrl)}
            >
              <Text style={styles.linkBtnText}>Open Wikipedia</Text>
            </TouchableOpacity>
          )}
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
      </ScrollView>
    );
  }

  // ----------------------------
  // List view
  // ----------------------------
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
        <Text style={[styles.filterToggleText, onlyWithPhotos ? styles.filterToggleTextActive : null]}>
          Only show items with photos
        </Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={styles.metaOnGreen}>Loading collection…</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : (
        <>
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
        </>
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
  metaOnGreen: { color: "#fff", marginTop: 10 },

  emptyListContainer: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  emptyText: { textAlign: "center", color: "#fff", opacity: 0.9 },

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

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

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

  // Pollinator badge
  beeIconWrap: {
    marginLeft: 8,
    backgroundColor: "#F9B233",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  beeIcon: {
    width: 14,
    height: 14,
    resizeMode: "contain",
  },


  sectionCard: {
    marginTop: 14,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    color: "#555",
    fontWeight: "700",
    maxWidth: "45%",
  },
  value: {
    fontSize: 13,
    color: "#111",
    fontWeight: "700",
    textAlign: "right",
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.08)",
    marginVertical: 10,
  },
  bodyText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#333",
    marginTop: 4,
  },
  linkBtn: {
    marginTop: 12,
    backgroundColor: "#111",
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
  },
  linkBtnText: {
    color: "#fff",
    fontWeight: "900",
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
