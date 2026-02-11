export type PollinatorPlantInfo = {
  friendly: boolean;
  notes?: string;

  commonName?: string;
  nativeRange?: string;
  habitat?: string;
  bloomTime?: string;
  sun?: string;
  soil?: string;
  water?: string;
  height?: string;
  spread?: string;
  uses?: string[];
  pollinators?: string[];
  hostFor?: string[];
  cautions?: string[];
  careNotes?: string;
};

export const POLLINATOR_SPECIES: Record<string, PollinatorPlantInfo> = {
  // ----------------------
// Milkweeds (Asclepias) – core native pollinator plants
// ----------------------
"Asclepias tuberosa": {
  friendly: true,
  commonName: "Butterfly milkweed",
  nativeRange: "Eastern & central North America (widely native across much of the U.S.)",
  habitat: "Prairies, open fields, roadsides; thrives in lean, sunny sites",
  bloomTime: "Late spring through summer (often Jun–Aug; can extend into early fall)",
  sun: "Full sun (best flowering); tolerates light part sun",
  soil: "Well-drained sandy/loamy soils; tolerates poor soils; avoid soggy clay",
  water: "Low to medium once established (drought tolerant)",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Monarch waystations / butterfly gardens",
    "Prairie-style plantings",
    "Dry borders and sunny beds",
  ],
  pollinators: ["Monarchs", "Other butterflies", "Native bees", "Honey bees", "Wasps"],
  hostFor: ["Monarch caterpillars"],
  cautions: [
    "Milky sap is irritating/toxic if ingested",
    "Deep taproot—doesn’t love being transplanted once established",
  ],
  careNotes:
    "Plant small and let it settle in. Don’t overwater. Leave seed pods if you want reseeding; remove pods if you want it tidier.",
}, 

"Asclepias syriaca": {
  friendly: true,
  commonName: "Common milkweed",
  nativeRange:
    "Southern Canada and much of the U.S. (especially east of the Rockies; absent from much of the far West/Southwest)",
  habitat: "Old fields, pastures, roadsides, disturbed sunny areas",
  bloomTime: "Summer (often Jun–Aug)",
  sun: "Full sun to part sun",
  soil: "Adaptable; dry to medium moisture; tolerates clay but prefers well-drained",
  water: "Low to medium",
  height: "3–6+ ft (can be taller in rich soils)",
  spread: "2–4+ ft (spreads by rhizomes)",
  uses: [
    "Naturalized areas (best where it can spread)",
    "Monarch habitat restoration",
    "Pollinator meadow anchor plant",
  ],
  pollinators: [
    "Monarchs",
    "Swallowtails",
    "Native bees",
    "Honey bees",
    "Wasps",
    "Beetles",
  ],
  hostFor: ["Monarch caterpillars"],
  cautions: [
    "Spreads aggressively via underground rhizomes (not ideal for small formal beds)",
    "Milky sap is irritating/toxic if ingested",
  ],
  careNotes:
    "Best used where it can naturalize. If you want it contained, cut pods before they split and pull unwanted shoots early.",
}, 

"Asclepias incarnata": {
  friendly: true,
  commonName: "Swamp milkweed",
  nativeRange: "Eastern & central North America",
  habitat: "Wet meadows, marsh edges, ditches, shorelines; loves consistent moisture",
  bloomTime: "Summer into early fall (commonly Jun–Sep)",
  sun: "Full sun (best), tolerates part sun",
  soil: "Moist to wet soils; tolerates heavier soils if moisture is consistent",
  water: "Medium to high (keep evenly moist; doesn’t like drying out)",
  height: "3–5 ft",
  spread: "1–3 ft",
  uses: [
    "Rain gardens / bioswales",
    "Pond edges and wet areas",
    "Pollinator borders where irrigation/moisture is reliable",
  ],
  pollinators: ["Monarchs", "Other butterflies", "Native bees", "Honey bees"],
  hostFor: ["Monarch caterpillars"],
  cautions: ["Milky sap is irritating/toxic if ingested"],
  careNotes:
    "A top pick if you have a damp area. Cut back stems late fall or early spring; leave some stems over winter for habitat.",
}, 

"Asclepias verticillata": {
  friendly: true,
  commonName: "Whorled milkweed",
  nativeRange: "Broadly native across much of North America (U.S. wide range)",
  habitat: "Prairies, open woodlands, glades, dry fields; often in lean soils",
  bloomTime: "Summer into early fall (often Jun–Sep; can bloom later than other milkweeds)",
  sun: "Full sun to part sun",
  soil: "Well-drained sandy/loamy; tolerates rocky/lean sites",
  water: "Low to medium",
  height: "1–3 ft",
  spread: "1–2+ ft (can form drifts over time)",
  uses: [
    "Naturalized prairie plantings",
    "Dry meadows and sunny slopes",
    "Subtle, fine-textured milkweed option",
  ],
  pollinators: [
    "Native bees (short- and long-tongued)",
    "Wasps",
    "Flies",
    "Butterflies",
    "Beetles",
  ],
  hostFor: ["Monarch caterpillars"],
  cautions: [
    "Milky sap is irritating/toxic if ingested",
    "Can slowly spread—great in meadows, less ideal in tight beds",
  ],
  careNotes:
    "Good choice when you want a smaller milkweed look. Minimal care—avoid rich soil/fertilizer if you want it compact.",
}, 

"Asclepias asperula": {
  friendly: true,
  commonName: "Antelope horns milkweed / Spider milkweed",
  nativeRange: "South-central U.S. into Mexico",
  habitat: "Open prairies/grasslands and dry open woodlands",
  bloomTime: "Spring into summer (often Apr–Jun; can bloom longer depending on location)",
  sun: "Full sun",
  soil: "Well-drained soils; tolerates lean/dry sites",
  water: "Low (drought tolerant once established)",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Drought-tolerant pollinator gardens",
    "Southwest/grassland-style plantings",
    "Monarch host plant in appropriate regions",
  ],
  pollinators: ["Native bees", "Butterflies", "Moths"],
  hostFor: ["Monarch caterpillars"],
  cautions: ["Milky sap is irritating/toxic if ingested"],
  careNotes:
    "Avoid overwatering. Best in full sun with sharp drainage. Great for hot, open areas where other milkweeds struggle.",
}, 

"Asclepias fascicularis": {
  friendly: true,
  commonName: "Narrowleaf milkweed",
  nativeRange: "Western North America (especially the western U.S.)",
  habitat: "Open slopes, meadows, roadsides; often in dry summer climates",
  bloomTime: "Summer (commonly Jun–Sep)",
  sun: "Full sun (best); tolerates light part sun",
  soil: "Well-drained; tolerates a variety of soils if drainage is good",
  water: "Low to medium (very drought tolerant once established)",
  height: "2–3 ft",
  spread: "1–3 ft (spreads gently via rhizomes)",
  uses: [
    "Western monarch gardens",
    "Naturalized patches",
    "Low-water pollinator beds",
  ],
  pollinators: ["Monarchs", "Native bees", "Butterflies"],
  hostFor: ["Monarch caterpillars"],
  cautions: ["Milky sap is irritating/toxic if ingested"],
  careNotes:
    "Likes sun and lean soils. In dry-summer climates, deep watering occasionally is better than frequent light watering.",
}, 

"Asclepias speciosa": {
  friendly: true,
  commonName: "Showy milkweed",
  nativeRange: "Western & central North America",
  habitat: "Open areas from dry to moderately moist; commonly in sunny sites",
  bloomTime: "Summer (commonly Jun–Aug; can extend depending on region)",
  sun: "Full sun",
  soil: "Adaptable; dry to medium moisture; best with decent drainage",
  water: "Low to medium",
  height: "2–4 ft",
  spread: "2–3 ft",
  uses: [
    "Western/native meadow plantings",
    "Monarch habitat in appropriate regions",
    "Tall backdrop for pollinator borders",
  ],
  pollinators: ["Monarchs", "Other butterflies", "Native bees", "Honey bees"],
  hostFor: ["Monarch caterpillars"],
  cautions: ["Milky sap is irritating/toxic if ingested"],
  careNotes:
    "Prefers sun and space. Cut back in late fall/early spring. Works best in naturalized beds rather than small manicured gardens.",
}, 

"Asclepias viridis": {
  friendly: true,
  commonName: "Green milkweed / Spider milkweed",
  nativeRange: "Central & eastern United States",
  habitat: "Prairies, pastures, roadsides, ditches; tolerant of varied soils",
  bloomTime: "Spring through early/mid-summer (often May–Jul)",
  sun: "Full sun to part sun",
  soil: "Adaptable; prefers well-drained but tolerates a range",
  water: "Low to medium (drought tolerant)",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Early-season monarch support (blooms earlier than many milkweeds)",
    "Prairie gardens and sunny beds",
    "Low-water pollinator plantings",
  ],
  pollinators: ["Native bees", "Butterflies", "Moths"],
  hostFor: ["Monarch caterpillars"],
  cautions: [
    "Milky sap is irritating/toxic if ingested",
    "Sap may irritate skin for some people",
  ],
  careNotes:
    "Low-maintenance. Great choice where summers get hot and dry. Let it naturalize lightly for best ecological benefit.",
}, 

"Asclepias hirtella": {
  friendly: true,
  commonName: "Tall green milkweed",
  nativeRange: "Eastern & central United States (prairie/old-field regions)",
  habitat: "Prairies, pastures, roadsides; open sunny sites",
  bloomTime: "Summer (commonly Jun–Aug)",
  sun: "Full sun to part sun",
  soil: "Well-drained to moderately moist; adaptable across medium-dry to medium-wet sites",
  water: "Low to medium",
  height: "2–4 ft",
  spread: "2–3 ft",
  uses: [
    "Prairie restorations and meadow mixes",
    "Monarch habitat patches",
    "Tall vertical texture in pollinator beds",
  ],
  pollinators: ["Native bees", "Butterflies", "Moths"],
  hostFor: ["Monarch caterpillars"],
  cautions: ["Milky sap is irritating/toxic if ingested"],
  careNotes:
    "Likes sun and doesn’t need rich soil. Avoid frequent transplanting—establish it where you want it and let it build strength.",
}, 

"Asclepias purpurascens": {
  friendly: true,
  commonName: "Purple milkweed",
  nativeRange: "Central & eastern North America (rare/patchy in places)",
  habitat: "Dry open woodlands, sandy prairies, shorelines, thickets; often on sandy soils",
  bloomTime: "Late spring through summer (commonly May–Jul)",
  sun: "Full sun (best) to light part sun",
  soil: "Well-drained, often sandy; prefers not to sit wet",
  water: "Low to medium",
  height: "2–3 ft",
  spread: "1–3 ft",
  uses: [
    "High-value native pollinator gardens",
    "Woodland edge meadows (sunny openings)",
    "Specialty monarch habitat plantings",
  ],
  pollinators: ["Butterflies", "Native bees", "Beneficial insects"],
  hostFor: ["Monarch caterpillars"],
  cautions: [
    "Milky sap is irritating/toxic if ingested",
    "Often uncommon—best treated as a ‘special’ plant rather than massed aggressively",
  ],
  careNotes:
    "Give it sun and drainage. Because it can be rare in some regions, prioritize locally appropriate sourcing if you’re using native-only logic.",
},


  // ----------------------
// Coneflowers (Echinacea) and similar composites
// ----------------------

"Echinacea purpurea": {
  friendly: true,
  commonName: "Purple coneflower",
  nativeRange: "Central & eastern United States",
  habitat: "Prairies, open woodlands, meadows, roadsides",
  bloomTime: "Summer to early fall (Jun–Sep)",
  sun: "Full sun (best) to light part sun",
  soil: "Well-drained loam or clay; tolerates poor soils",
  water: "Low to medium; drought tolerant once established",
  height: "2–5 ft",
  spread: "1–2 ft",
  uses: [
    "Pollinator gardens",
    "Prairie plantings",
    "Cut flower gardens",
    "Medicinal herb gardens"
  ],
  pollinators: [
    "Native bees",
    "Honey bees",
    "Butterflies",
    "Beetles"
  ],
  hostFor: [],
  cautions: [],
  careNotes:
    "Deadhead for extended bloom or leave seedheads for winter birds. Very adaptable and beginner-friendly.",
},

"Echinacea pallida": {
  friendly: true,
  commonName: "Pale purple coneflower",
  nativeRange: "Central United States (prairie regions)",
  habitat: "Dry prairies, open rocky slopes",
  bloomTime: "Late spring to summer (May–Jul)",
  sun: "Full sun",
  soil: "Well-drained sandy or rocky soils",
  water: "Low; drought tolerant",
  height: "2–4 ft",
  spread: "1–2 ft",
  uses: [
    "Prairie restorations",
    "Dry pollinator gardens"
  ],
  pollinators: [
    "Native bees",
    "Butterflies"
  ],
  hostFor: [],
  cautions: [],
  careNotes:
    "Prefers lean soil. Too much fertilizer causes flopping.",
},

"Echinacea angustifolia": {
  friendly: true,
  commonName: "Narrow-leaved coneflower",
  nativeRange: "Great Plains region of North America",
  habitat: "Shortgrass prairies, dry hillsides",
  bloomTime: "Late spring to summer (May–Jul)",
  sun: "Full sun",
  soil: "Dry, well-drained soils",
  water: "Low",
  height: "1–2 ft",
  spread: "1–1.5 ft",
  uses: [
    "Prairie restorations",
    "Low-water landscapes"
  ],
  pollinators: [
    "Native bees",
    "Butterflies"
  ],
  hostFor: [],
  cautions: [],
  careNotes:
    "Deep taproot—difficult to transplant once mature.",
},

"Echinacea paradoxa": {
  friendly: true,
  commonName: "Yellow coneflower",
  nativeRange: "Ozark region of Missouri and Arkansas",
  habitat: "Rocky glades and open woodlands",
  bloomTime: "Late spring to early summer",
  sun: "Full sun",
  soil: "Well-drained rocky or sandy soil",
  water: "Low",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Native plant gardens",
    "Accent plant in sunny borders"
  ],
  pollinators: [
    "Bees",
    "Butterflies"
  ],
  hostFor: [],
  cautions: ["Less adaptable outside native range"],
  careNotes:
    "Needs excellent drainage; avoid heavy clay soils.",
},

"Rudbeckia hirta": {
  friendly: true,
  commonName: "Black-eyed Susan",
  nativeRange: "Widespread across North America",
  habitat: "Fields, prairies, roadsides",
  bloomTime: "Summer to fall (Jun–Oct)",
  sun: "Full sun",
  soil: "Adaptable; prefers well-drained soil",
  water: "Low to medium",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Wildflower meadows",
    "Pollinator gardens",
    "Mass plantings"
  ],
  pollinators: [
    "Bees",
    "Butterflies",
    "Hoverflies"
  ],
  hostFor: [],
  cautions: ["Short-lived perennial or biennial"],
  careNotes:
    "Self-seeds readily. Deadhead to reduce spread.",
},

"Rudbeckia fulgida": {
  friendly: true,
  commonName: "Orange coneflower",
  nativeRange: "Eastern United States",
  habitat: "Moist meadows, woodland edges",
  bloomTime: "Mid-summer to fall",
  sun: "Full sun to part sun",
  soil: "Moist but well-drained",
  water: "Medium",
  height: "2–3 ft",
  spread: "1.5–2 ft",
  uses: [
    "Rain gardens",
    "Pollinator borders"
  ],
  pollinators: [
    "Bees",
    "Butterflies"
  ],
  hostFor: [],
  cautions: [],
  careNotes:
    "Clump-forming and easy to divide every few years.",
},

"Rudbeckia triloba": {
  friendly: true,
  commonName: "Brown-eyed Susan",
  nativeRange: "Eastern & central U.S.",
  habitat: "Open woodlands, fields",
  bloomTime: "Late summer to fall",
  sun: "Full sun",
  soil: "Well-drained",
  water: "Low to medium",
  height: "3–5 ft",
  spread: "2–3 ft",
  uses: [
    "Back-of-border plantings",
    "Wildlife gardens"
  ],
  pollinators: [
    "Bees",
    "Butterflies"
  ],
  hostFor: [],
  cautions: ["Short-lived perennial"],
  careNotes:
    "Self-seeds lightly; great for naturalized areas.",
},

"Rudbeckia laciniata": {
  friendly: true,
  commonName: "Cutleaf coneflower",
  nativeRange: "Eastern & central North America",
  habitat: "Moist prairies, streambanks",
  bloomTime: "Mid to late summer",
  sun: "Full sun to part sun",
  soil: "Moist soils preferred",
  water: "Medium to high",
  height: "5–7 ft",
  spread: "3–4 ft",
  uses: [
    "Rain gardens",
    "Large native landscapes"
  ],
  pollinators: [
    "Bees",
    "Butterflies"
  ],
  hostFor: [],
  cautions: ["Can spread aggressively in wet soils"],
  careNotes:
    "Tall—may require staking in rich soil.",
},

"Heliopsis helianthoides": {
  friendly: true,
  commonName: "False sunflower",
  nativeRange: "Eastern & central U.S.",
  habitat: "Prairies, woodland edges",
  bloomTime: "Summer (Jun–Aug)",
  sun: "Full sun",
  soil: "Well-drained",
  water: "Low to medium",
  height: "3–5 ft",
  spread: "2–3 ft",
  uses: [
    "Pollinator borders",
    "Cut flower gardens"
  ],
  pollinators: [
    "Native bees",
    "Butterflies",
    "Beetles"
  ],
  hostFor: [],
  cautions: [],
  careNotes:
    "Deadhead for longer bloom; divide every few years to maintain vigor.",
},

"Ratibida pinnata": {
  friendly: true,
  commonName: "Gray-headed coneflower",
  nativeRange: "Central & eastern North America",
  habitat: "Prairies, open fields",
  bloomTime: "Summer (Jun–Sep)",
  sun: "Full sun",
  soil: "Dry to medium; well-drained",
  water: "Low",
  height: "3–5 ft",
  spread: "2–3 ft",
  uses: [
    "Prairie restorations",
    "Wildflower meadows"
  ],
  pollinators: [
    "Native bees",
    "Butterflies"
  ],
  hostFor: [],
  cautions: [],
  careNotes:
    "Very drought tolerant; leave seedheads for birds in winter.",
},


  // ----------------------
// Coreopsis and tickseeds
// ----------------------

"Coreopsis lanceolata": {
  friendly: true,
  commonName: "Lanceleaf coreopsis",
  nativeRange: "Eastern & central United States",
  habitat: "Open woods, prairies, roadsides; thrives in sunny, well-drained spots",
  bloomTime: "Late spring through summer (often May–Jul; can rebloom)",
  sun: "Full sun (best) to light part sun",
  soil: "Well-drained sandy/loamy; tolerates poor soils; dislikes soggy clay",
  water: "Low to medium once established",
  height: "1–2 ft",
  spread: "1–1.5 ft",
  uses: [
    "Pollinator gardens",
    "Wildflower meadows",
    "Borders and mass plantings",
    "Low-maintenance sunny beds",
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies", "Hoverflies"],
  hostFor: [],
  cautions: ["Can self-seed in ideal conditions (usually a plus in meadows)"],
  careNotes:
    "Deadhead to extend bloom and reduce reseeding; cut back after first flush for a tidy rebloom.",
},

"Coreopsis tinctoria": {
  friendly: true,
  commonName: "Plains coreopsis / Golden tickseed",
  nativeRange: "Widespread across much of North America (especially Great Plains; often used as a wildflower annual)",
  habitat: "Prairies, open fields, disturbed sites; adaptable and quick to establish",
  bloomTime: "Summer into fall (Jun–Oct depending on planting time)",
  sun: "Full sun",
  soil: "Adaptable; prefers well-drained but tolerates average soils",
  water: "Low to medium; more bloom with occasional water",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Fast color in wildflower mixes",
    "Pollinator patches",
    "Roadside/meadow seeding",
    "Beginner-friendly annual displays",
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies", "Beneficial flies"],
  hostFor: [],
  cautions: ["Annual—relies on reseeding for return", "Can reseed heavily if allowed"],
  careNotes:
    "Let some seed heads mature if you want it to come back next year. Great ‘fill’ plant while perennials establish.",
},

"Coreopsis verticillata": {
  friendly: true,
  commonName: "Threadleaf coreopsis",
  nativeRange: "Eastern United States",
  habitat: "Open woods and sunny slopes; commonly used in gardens due to long bloom",
  bloomTime: "Early summer through fall (often Jun–Sep; longer with deadheading)",
  sun: "Full sun (best) to part sun",
  soil: "Well-drained; tolerates average soils; avoid waterlogged sites",
  water: "Low to medium; drought tolerant once established",
  height: "1.5–3 ft",
  spread: "1.5–2.5 ft",
  uses: [
    "Long-blooming borders",
    "Pollinator-friendly foundation beds",
    "Mass plantings for color",
    "Low-water landscaping",
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies", "Hoverflies"],
  hostFor: [],
  cautions: ["Can spread by rhizomes in ideal conditions (usually manageable)"],
  careNotes:
    "Shear lightly midseason after first flush to encourage fresh growth and more blooms. Divide every few years if clumps thin.",
},

"Coreopsis grandiflora": {
  friendly: true,
  commonName: "Large-flowered coreopsis",
  nativeRange: "Central & southeastern United States",
  habitat: "Open fields and prairies; thrives in sunny, well-drained areas",
  bloomTime: "Late spring through summer (often May–Aug)",
  sun: "Full sun",
  soil: "Well-drained; prefers sandy/loamy; tolerates poor soils",
  water: "Low to medium",
  height: "1–2.5 ft",
  spread: "1–1.5 ft",
  uses: [
    "Sunny borders",
    "Wildflower-style beds",
    "Container-friendly pollinator plant",
    "Cut flowers (short-lived but bright)",
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies"],
  hostFor: [],
  cautions: ["Often short-lived perennial (sometimes treated as biennial)"],
  careNotes:
    "Deadhead for continuous bloom. Allow some seed set if you want it to persist naturally in the garden.",
},

"Coreopsis tripteris": {
  friendly: true,
  commonName: "Tall coreopsis",
  nativeRange: "Eastern & central United States",
  habitat: "Prairies, woodland edges, open meadows; likes sun and space",
  bloomTime: "Late summer to fall (often Aug–Oct)",
  sun: "Full sun",
  soil: "Adaptable; prefers well-drained to moderately moist soils",
  water: "Low to medium",
  height: "4–8 ft",
  spread: "2–4 ft",
  uses: [
    "Back-of-border native plantings",
    "Prairie restorations",
    "Late-season nectar support",
    "Large pollinator meadows",
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies", "Beneficial wasps"],
  hostFor: [],
  cautions: ["Can get tall and may lean in rich soil or shade"],
  careNotes:
    "Give it room and sun. Consider staking in small gardens. Leave seed heads for birds and winter interest.",
},


  // ----------------------
// Asters and goldenrods (huge late-season resources)
// ----------------------

"Symphyotrichum novae-angliae": {
  friendly: true,
  commonName: "New England aster",
  nativeRange: "Eastern & central North America",
  habitat: "Prairies, meadows, open woodlands, roadsides; prefers open sun",
  bloomTime: "Late summer through fall (Aug–Oct)",
  sun: "Full sun (best) to part sun",
  soil: "Average to moist, well-drained; tolerant of clay if not waterlogged",
  water: "Medium; drought tolerant once established but blooms best with some moisture",
  height: "3–6 ft",
  spread: "2–3 ft",
  uses: [
    "Fall pollinator ‘lifeline’ plant",
    "Prairie/meadow plantings",
    "Back-of-border native gardens",
    "Cut flowers (fresh/dried)"
  ],
  pollinators: ["Native bees", "Honey bees", "Bumblebees", "Butterflies", "Hoverflies"],
  hostFor: [],
  cautions: [
    "Can get powdery mildew in crowded/humid spots (airflow helps)",
    "May need staking in rich soil or part shade"
  ],
  careNotes:
    "Pinch stems in late spring for a bushier plant and more blooms. Leave seed heads for birds and winter interest.",
},

"Symphyotrichum novi-belgii": {
  friendly: true,
  commonName: "New York aster",
  nativeRange: "Eastern North America",
  habitat: "Moist meadows, streambanks, open fields; likes consistent moisture",
  bloomTime: "Late summer through fall (Aug–Oct)",
  sun: "Full sun to part sun",
  soil: "Moist, well-drained soils; tolerates heavier soils with moisture",
  water: "Medium to high (especially during bloom)",
  height: "2–5 ft",
  spread: "2–3 ft",
  uses: [
    "Rain gardens and damp borders",
    "Fall color and nectar support",
    "Meadow mixes"
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies", "Beneficial flies"],
  hostFor: [],
  cautions: ["Can be prone to mildew if airflow is poor"],
  careNotes:
    "Cut back by ~1/3 in early summer to reduce flop and encourage branching. Divide clumps every few years if crowded.",
},

"Symphyotrichum oblongifolium": {
  friendly: true,
  commonName: "Aromatic aster",
  nativeRange: "Central & eastern United States",
  habitat: "Dry prairies, glades, rocky slopes; great in lean soils",
  bloomTime: "Fall (Sep–Nov in many areas)",
  sun: "Full sun",
  soil: "Dry to medium, well-drained; tolerant of rocky soils",
  water: "Low once established",
  height: "1–3 ft",
  spread: "2–4 ft",
  uses: [
    "Drought-tolerant fall pollinator plant",
    "Edges, borders, and slopes",
    "Groundcover-like native drift plantings"
  ],
  pollinators: ["Native bees", "Butterflies", "Hoverflies"],
  hostFor: [],
  cautions: ["Can spread outward into a low mound (usually desirable)"],
  careNotes:
    "Shear lightly in early summer for a tighter mound. Full sun keeps it dense and bloom-heavy.",
},

"Symphyotrichum ericoides": {
  friendly: true,
  commonName: "Heath aster / White heath aster",
  nativeRange: "Widespread across North America",
  habitat: "Dry prairies, open woods, fields; adaptable and tough",
  bloomTime: "Late summer through fall (Aug–Oct)",
  sun: "Full sun",
  soil: "Dry to medium, well-drained; tolerates lean soils",
  water: "Low to medium",
  height: "1–3 ft",
  spread: "1–3 ft",
  uses: [
    "Fall meadow mixes",
    "Pollinator patches",
    "Filler plant that blooms when others fade"
  ],
  pollinators: ["Small native bees", "Honey bees", "Butterflies", "Beneficial flies"],
  hostFor: [],
  cautions: ["May self-seed lightly in meadows (usually manageable)"],
  careNotes:
    "Cut back in early summer for sturdier growth. Leave stems over winter for insect habitat.",
},

"Symphyotrichum laeve": {
  friendly: true,
  commonName: "Smooth aster",
  nativeRange: "Central & eastern North America",
  habitat: "Prairies, open woods, roadsides; prefers sun and moderate moisture",
  bloomTime: "Late summer through fall (Aug–Oct)",
  sun: "Full sun to part sun",
  soil: "Medium moisture, well-drained; tolerant of clay if not soggy",
  water: "Medium",
  height: "2–4 ft",
  spread: "1.5–2.5 ft",
  uses: [
    "Reliable fall nectar source",
    "Prairie restorations",
    "Back-of-border native plantings"
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies", "Hoverflies"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Stems are usually sturdy, but pinching in late spring can make it bushier. Divide if clumps get crowded.",
},

"Solidago canadensis": {
  friendly: true,
  commonName: "Canada goldenrod",
  nativeRange: "Widespread across North America",
  habitat: "Fields, roadsides, disturbed sites; sun-loving and vigorous",
  bloomTime: "Late summer through fall (Aug–Oct)",
  sun: "Full sun",
  soil: "Adaptable; tolerates poor soils; prefers well-drained to moderately moist",
  water: "Low to medium",
  height: "3–6 ft",
  spread: "2–4+ ft (spreads by rhizomes)",
  uses: [
    "Pollinator meadows (major late-season nectar)",
    "Naturalized areas",
    "Habitat restoration"
  ],
  pollinators: ["Native bees", "Honey bees", "Wasps", "Butterflies", "Beetles", "Hoverflies"],
  hostFor: ["Many native moth/butterfly larvae (goldenrods support lots of insects)"],
  cautions: [
    "Spreads aggressively in garden beds",
    "Often blamed for allergies (ragweed is usually the real culprit)"
  ],
  careNotes:
    "Use in meadows or large spaces where it can spread. Cut stems before seed set if you need to control it.",
},

"Solidago rugosa": {
  friendly: true,
  commonName: "Rough goldenrod",
  nativeRange: "Eastern North America",
  habitat: "Moist meadows, woodland edges, thickets; prefers slightly moist soil",
  bloomTime: "Late summer through fall (Aug–Oct)",
  sun: "Full sun to part sun",
  soil: "Medium to moist; adaptable if not bone-dry",
  water: "Medium",
  height: "3–5 ft",
  spread: "2–3 ft",
  uses: [
    "Native borders with fall bloom",
    "Rain garden edges",
    "Pollinator support plantings"
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies", "Beneficial wasps"],
  hostFor: ["Insect diversity support (goldenrods are keystone plants)"],
  cautions: ["Can spread slowly over time"],
  careNotes:
    "If it flops, pinch early summer or plant in full sun. Leave stems for overwintering insects.",
},

"Solidago speciosa": {
  friendly: true,
  commonName: "Showy goldenrod",
  nativeRange: "Eastern & central North America",
  habitat: "Prairies, open woods, dry to medium soils; more clump-forming than some goldenrods",
  bloomTime: "Late summer to fall (Aug–Oct)",
  sun: "Full sun",
  soil: "Well-drained; dry to medium moisture",
  water: "Low to medium",
  height: "2–5 ft",
  spread: "1.5–2.5 ft",
  uses: [
    "‘Well-behaved’ goldenrod for garden beds",
    "Fall nectar anchor plant",
    "Prairie-style borders"
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies", "Hoverflies"],
  hostFor: ["Insect diversity support (goldenrods are keystone plants)"],
  cautions: [],
  careNotes:
    "Great choice when you want goldenrod without the aggressive spread. Cut back in early summer to reduce height if needed.",
},

"Solidago nemoralis": {
  friendly: true,
  commonName: "Gray goldenrod",
  nativeRange: "Widespread across North America",
  habitat: "Dry fields, sandy sites, open slopes; thrives in lean soils",
  bloomTime: "Late summer to fall (Aug–Oct)",
  sun: "Full sun",
  soil: "Dry, well-drained; sandy/rocky soils ideal",
  water: "Low",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Drought-tolerant native gardens",
    "Rock gardens and dry meadows",
    "Compact goldenrod option"
  ],
  pollinators: ["Native bees", "Butterflies", "Beneficial flies"],
  hostFor: ["Insect diversity support (goldenrods are keystone plants)"],
  cautions: [],
  careNotes:
    "Minimal care—avoid rich soil. Great for dry sunny areas where taller goldenrods would struggle.",
},

"Solidago odora": {
  friendly: true,
  commonName: "Sweet goldenrod / Anise-scented goldenrod",
  nativeRange: "Eastern United States",
  habitat: "Open woods, sandy clearings, dry slopes; often in well-drained soils",
  bloomTime: "Late summer to fall (Aug–Oct)",
  sun: "Full sun to part sun",
  soil: "Well-drained; often sandy/loamy",
  water: "Low to medium",
  height: "2–4 ft",
  spread: "1.5–2.5 ft",
  uses: [
    "Pollinator gardens (high nectar + fragrance)",
    "Native borders",
    "Herbal interest (aromatic foliage)"
  ],
  pollinators: ["Native bees", "Butterflies", "Honey bees"],
  hostFor: ["Insect diversity support (goldenrods are keystone plants)"],
  cautions: ["Foliage is aromatic; some people may be sensitive to scent"],
  careNotes:
    "Crush leaves for a sweet anise scent. Keep in sun for best blooms. Great ‘garden-friendly’ goldenrod choice.",
},

"Solidago gigantea": {
  friendly: true,
  commonName: "Giant goldenrod",
  nativeRange: "Widespread across North America (especially central/eastern regions)",
  habitat: "Moist prairies, stream edges, ditches; likes moisture more than many goldenrods",
  bloomTime: "Late summer to fall (Aug–Oct)",
  sun: "Full sun",
  soil: "Medium to moist; adaptable if moisture is present",
  water: "Medium",
  height: "4–7 ft",
  spread: "2–4 ft",
  uses: [
    "Large meadow plantings",
    "Wet meadow / rain garden edges",
    "Late-season nectar powerhouse"
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies", "Wasps", "Hoverflies"],
  hostFor: ["Insect diversity support (goldenrods are keystone plants)"],
  cautions: ["Can spread by rhizomes in ideal moist soils", "Very tall—needs space"],
  careNotes:
    "Best for larger areas. If you need to control it, cut back or thin shoots in spring and remove runners.",
},

// ----------------------
// Bee balms and mints (Monarda, Pycnanthemum, etc.)
// ----------------------

"Monarda didyma": {
  friendly: true,
  commonName: "Scarlet bee balm",
  nativeRange: "Eastern North America",
  habitat: "Moist meadows, stream edges, woodland openings",
  bloomTime: "Summer (Jun–Aug)",
  sun: "Full sun to part sun (part sun helps in hot climates)",
  soil: "Moist, rich soil; tolerates average soil if watered",
  water: "Medium to high",
  height: "2–4 ft",
  spread: "2–3 ft",
  uses: [
    "Hummingbird gardens",
    "Moist pollinator borders",
    "Tea/herb gardens (aromatic leaves)"
  ],
  pollinators: ["Hummingbirds", "Bumblebees", "Native bees", "Butterflies"],
  hostFor: [],
  cautions: [
    "Can get powdery mildew (airflow helps)",
    "Spreads by rhizomes; can form colonies"
  ],
  careNotes:
    "Thin stems for airflow. Deadhead for extended bloom. Divide every 2–3 years to keep vigorous and reduce crowding.",
},

"Monarda fistulosa": {
  friendly: true,
  commonName: "Wild bergamot",
  nativeRange: "Widespread across North America",
  habitat: "Prairies, open woods, fields; prefers sun and well-drained soil",
  bloomTime: "Summer (Jun–Aug)",
  sun: "Full sun to part sun",
  soil: "Well-drained; dry to medium moisture",
  water: "Low to medium",
  height: "2–4 ft",
  spread: "2–3 ft",
  uses: [
    "Prairie plantings",
    "Pollinator gardens",
    "Low-water native borders"
  ],
  pollinators: ["Native bees", "Bumblebees", "Butterflies", "Moths"],
  hostFor: [],
  cautions: ["Powdery mildew possible in humid/crowded conditions"],
  careNotes:
    "More drought tolerant than scarlet bee balm. Cut back after bloom for tidiness; divide if it spreads too much.",
},

"Monarda punctata": {
  friendly: true,
  commonName: "Spotted bee balm / Horsemint",
  nativeRange: "Eastern & central United States",
  habitat: "Dry sandy fields, prairies, open slopes; loves lean soils",
  bloomTime: "Summer (Jul–Sep)",
  sun: "Full sun",
  soil: "Dry, sandy, well-drained",
  water: "Low",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Drought-tolerant pollinator gardens",
    "Native wildflower meadows",
    "‘Wow’ plant for bee diversity"
  ],
  pollinators: [
    "Native bees (especially wasp-like bees)",
    "Bumblebees",
    "Butterflies",
    "Beneficial wasps"
  ],
  hostFor: [],
  cautions: ["Often short-lived; reseeds in the right conditions"],
  careNotes:
    "Do not overwater or fertilize—lean soil is the trick. Let it reseed for a steady presence.",
},

"Monarda bradburiana": {
  friendly: true,
  commonName: "Eastern bee balm",
  nativeRange: "Central United States (Ozarks and nearby regions)",
  habitat: "Open woods and woodland edges; tolerates partial shade better than most Monarda",
  bloomTime: "Late spring to early summer (May–Jun)",
  sun: "Part sun to full sun",
  soil: "Average, well-drained; medium moisture",
  water: "Medium",
  height: "1–2 ft",
  spread: "1–2 ft",
  uses: [
    "Woodland edge pollinator gardens",
    "Early-season nectar support",
    "Compact native borders"
  ],
  pollinators: ["Native bees", "Bumblebees", "Butterflies"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Great for partial sun. Cut back after flowering for neatness. Clumps can be divided every few years.",
},

"Pycnanthemum virginianum": {
  friendly: true,
  commonName: "Virginia mountain mint",
  nativeRange: "Eastern North America",
  habitat: "Meadows, prairies, open woods; adaptable and very pollinator-active",
  bloomTime: "Mid to late summer (Jul–Sep)",
  sun: "Full sun to part sun",
  soil: "Average to moist; well-drained preferred",
  water: "Medium",
  height: "2–4 ft",
  spread: "2–3 ft",
  uses: [
    "Pollinator ‘magnet’ plant",
    "Meadow plantings",
    "Herbaceous borders"
  ],
  pollinators: ["Native bees", "Bumblebees", "Butterflies", "Hoverflies", "Beneficial wasps"],
  hostFor: [],
  cautions: ["Can spread by rhizomes (usually manageable)"],
  careNotes:
    "If you want it contained, grow it in a defined bed edge or thin runners yearly. Incredible for increasing bee diversity.",
},

"Pycnanthemum tenuifolium": {
  friendly: true,
  commonName: "Narrowleaf mountain mint",
  nativeRange: "Eastern North America",
  habitat: "Dry to medium fields, open woods; tolerates drier sites than some mountain mints",
  bloomTime: "Summer (Jul–Sep)",
  sun: "Full sun to part sun",
  soil: "Well-drained; dry to medium moisture",
  water: "Low to medium",
  height: "2–3 ft",
  spread: "2–3 ft",
  uses: [
    "Drought-tolerant pollinator gardens",
    "Meadow mixes",
    "Fragrant foliage borders"
  ],
  pollinators: ["Native bees", "Butterflies", "Beneficial flies", "Wasps"],
  hostFor: [],
  cautions: ["Spreads by rhizomes; can form colonies"],
  careNotes:
    "Cut back by ~1/3 in early summer if you want a shorter, bushier habit. One of the best plants for ‘constant buzzing.’",
},

"Pycnanthemum muticum": {
  friendly: true,
  commonName: "Blunt mountain mint",
  nativeRange: "Eastern & central United States",
  habitat: "Meadows and open woods; thrives in sun with average moisture",
  bloomTime: "Mid to late summer (Jul–Sep)",
  sun: "Full sun to part sun",
  soil: "Average, well-drained; medium moisture",
  water: "Medium",
  height: "2–3 ft",
  spread: "2–4 ft",
  uses: [
    "Top-tier pollinator plant (one of the best)",
    "Mass plantings (silvery bracts look amazing)",
    "Native borders and meadows"
  ],
  pollinators: ["Native bees", "Butterflies", "Hoverflies", "Beneficial wasps"],
  hostFor: [],
  cautions: ["Spreads by rhizomes—plan space or edge it"],
  careNotes:
    "If you plant one mountain mint, pick this. Trim edges yearly to keep it tidy; the pollinator activity is insane.",
},

"Agastache foeniculum": {
  friendly: true,
  commonName: "Anise hyssop",
  nativeRange: "Upper Midwest / northern Great Plains (widely grown beyond native range)",
  habitat: "Prairies and open fields; thrives in sunny, well-drained garden soil",
  bloomTime: "Summer to early fall (Jun–Sep)",
  sun: "Full sun",
  soil: "Well-drained; average to dry soils; dislikes soggy soil",
  water: "Low to medium",
  height: "2–4 ft",
  spread: "1–2 ft",
  uses: [
    "Pollinator borders",
    "Herb gardens (anise-scented leaves)",
    "Cut flowers"
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies", "Hummingbirds"],
  hostFor: [],
  cautions: ["Can self-seed lightly (usually manageable)"],
  careNotes:
    "Deadhead for longer bloom or let it seed for naturalized patches. Very easy plant if drainage is good.",
},

"Agastache rugosa": {
  friendly: true,
  commonName: "Korean mint",
  nativeRange: "East Asia (non-native in North America but pollinator-beneficial)",
  habitat: "Garden plant; prefers sunny borders with good drainage",
  bloomTime: "Summer to early fall (Jul–Sep)",
  sun: "Full sun",
  soil: "Well-drained; average garden soil",
  water: "Low to medium",
  height: "2–4 ft",
  spread: "1–2 ft",
  uses: [
    "Long-blooming pollinator borders",
    "Herb/scent gardens",
    "Containers (large pots)"
  ],
  pollinators: ["Bees", "Butterflies", "Hummingbirds"],
  hostFor: [],
  cautions: ["Non-native (still valuable, but track for native-only modes)"],
  careNotes:
    "Needs sun and drainage. Cut back in spring. Great performer with minimal fuss.",
},

"Agastache nepetoides": {
  friendly: true,
  commonName: "Yellow giant hyssop",
  nativeRange: "Eastern & central United States",
  habitat: "Open woods, woodland edges, moist meadows",
  bloomTime: "Mid to late summer (Jul–Sep)",
  sun: "Full sun to part sun",
  soil: "Average to moist; well-drained preferred",
  water: "Medium",
  height: "4–7 ft",
  spread: "2–3 ft",
  uses: [
    "Tall native pollinator borders",
    "Woodland edge plantings",
    "Late-summer nectar support"
  ],
  pollinators: ["Native bees", "Bumblebees", "Butterflies", "Beneficial wasps"],
  hostFor: [],
  cautions: ["Tall—may need staking in rich soil or shade"],
  careNotes:
    "Give it sun if possible for sturdier stems. Leave seed heads for winter interest and to support wildlife.",
},


// ----------------------
// Blazing stars and penstemons
// ----------------------

"Liatris spicata": {
  friendly: true,
  commonName: "Dense blazing star / Gayfeather",
  nativeRange: "Eastern & central North America",
  habitat: "Moist meadows, prairies, open sunny areas",
  bloomTime: "Mid to late summer (Jul–Sep)",
  sun: "Full sun",
  soil: "Medium to moist, well-drained; tolerates clay if not soggy",
  water: "Medium; drought tolerant once established",
  height: "2–4 ft",
  spread: "1–1.5 ft",
  uses: [
    "Vertical accent in pollinator gardens",
    "Rain garden edges",
    "Prairie-style borders",
    "Cut flower gardens"
  ],
  pollinators: [
    "Monarchs",
    "Swallowtails",
    "Native bees",
    "Honey bees",
    "Butterflies"
  ],
  hostFor: [],
  cautions: [],
  careNotes:
    "Thrives in sun with moderate moisture. Leave seed heads for birds and winter structure. Divide corms every few years if crowded.",
},

"Liatris pycnostachya": {
  friendly: true,
  commonName: "Prairie blazing star",
  nativeRange: "Central United States (Great Plains & Midwest)",
  habitat: "Tallgrass prairies; prefers moist to medium prairie soils",
  bloomTime: "Mid to late summer (Jul–Sep)",
  sun: "Full sun",
  soil: "Medium to moist; well-drained prairie soils",
  water: "Medium",
  height: "3–5 ft",
  spread: "1–2 ft",
  uses: [
    "Prairie restorations",
    "Large meadow plantings",
    "High-value nectar anchor plant"
  ],
  pollinators: [
    "Monarchs",
    "Native bees",
    "Butterflies",
    "Skippers"
  ],
  hostFor: [],
  cautions: ["Can grow tall—may lean in rich soils"],
  careNotes:
    "Best used in naturalistic plantings. Provides strong vertical structure in late summer when many plants fade.",
},

"Liatris aspera": {
  friendly: true,
  commonName: "Rough blazing star",
  nativeRange: "Central & eastern United States",
  habitat: "Dry prairies, open rocky slopes, sandy fields",
  bloomTime: "Late summer (Aug–Sep)",
  sun: "Full sun",
  soil: "Dry to medium, well-drained; sandy or rocky preferred",
  water: "Low once established",
  height: "2–4 ft",
  spread: "1–1.5 ft",
  uses: [
    "Drought-tolerant pollinator gardens",
    "Prairie restorations",
    "Monarch nectar support"
  ],
  pollinators: [
    "Monarchs",
    "Native bees",
    "Butterflies"
  ],
  hostFor: [],
  cautions: [],
  careNotes:
    "Excellent for lean soils. Avoid overwatering. Pairs well with prairie grasses and goldenrods.",
},

"Penstemon digitalis": {
  friendly: true,
  commonName: "Foxglove beardtongue",
  nativeRange: "Eastern North America",
  habitat: "Open woods, prairies, woodland edges",
  bloomTime: "Late spring to early summer (May–Jun)",
  sun: "Full sun to part sun",
  soil: "Well-drained; adaptable; tolerates clay",
  water: "Low to medium",
  height: "2–4 ft",
  spread: "1–2 ft",
  uses: [
    "Early-season pollinator support",
    "Woodland edge plantings",
    "Native borders"
  ],
  pollinators: [
    "Long-tongued native bees",
    "Bumblebees",
    "Butterflies"
  ],
  hostFor: [],
  cautions: ["Short-lived perennial but reseeds lightly"],
  careNotes:
    "One of the best early nectar sources for native bees. Leave some seed stalks for reseeding.",
},

"Penstemon hirsutus": {
  friendly: true,
  commonName: "Hairy beardtongue",
  nativeRange: "Eastern United States",
  habitat: "Open woods, sandy fields, rocky slopes",
  bloomTime: "Late spring to early summer",
  sun: "Full sun to part sun",
  soil: "Dry to medium, well-drained",
  water: "Low",
  height: "1–2 ft",
  spread: "1–1.5 ft",
  uses: [
    "Compact native pollinator gardens",
    "Rock gardens",
    "Woodland edge borders"
  ],
  pollinators: [
    "Native bees",
    "Bumblebees"
  ],
  hostFor: [],
  cautions: [],
  careNotes:
    "Prefers lean soils. Avoid rich fertilizer. Great smaller-scale penstemon option.",
},

"Penstemon strictus": {
  friendly: true,
  commonName: "Rocky Mountain penstemon",
  nativeRange: "Western United States (Rocky Mountain region)",
  habitat: "Mountain meadows, rocky slopes, open plains",
  bloomTime: "Late spring to summer (May–Jul)",
  sun: "Full sun",
  soil: "Well-drained; sandy or rocky preferred",
  water: "Low to medium",
  height: "2–3 ft",
  spread: "1–2 ft",
  uses: [
    "Western native gardens",
    "Hummingbird gardens",
    "Dry pollinator landscapes"
  ],
  pollinators: [
    "Hummingbirds",
    "Native bees",
    "Bumblebees"
  ],
  hostFor: [],
  cautions: ["Needs excellent drainage; dislikes wet winters"],
  careNotes:
    "Avoid heavy clay or overwatering. Thrives in sunny, dry climates with good air circulation.",
},

"Penstemon grandiflorus": {
  friendly: true,
  commonName: "Large beardtongue / Shell-leaf penstemon",
  nativeRange: "Central United States (Great Plains)",
  habitat: "Prairies and open plains; dry to medium soils",
  bloomTime: "Late spring to early summer",
  sun: "Full sun",
  soil: "Well-drained; sandy/rocky ideal",
  water: "Low",
  height: "2–3 ft",
  spread: "1–2 ft",
  uses: [
    "Prairie restorations",
    "Showy early-season pollinator support",
    "Native wildflower beds"
  ],
  pollinators: [
    "Bumblebees",
    "Native bees",
    "Butterflies"
  ],
  hostFor: [],
  cautions: ["Prefers dry conditions; avoid overwatering"],
  careNotes:
    "Distinct silvery foliage makes it ornamental even out of bloom. Cut back after flowering for tidiness.",
},


  // ----------------------
// US native wildflowers
// ----------------------

"Gaillardia pulchella": {
  friendly: true,
  commonName: "Blanketflower",
  nativeRange: "Central & southern United States",
  habitat: "Dry prairies, roadsides, sandy soils",
  bloomTime: "Late spring through fall",
  sun: "Full sun",
  soil: "Dry, sandy, well-drained",
  water: "Low",
  height: "1–2 ft",
  spread: "1–1.5 ft",
  uses: ["Wildflower meadows", "Drought gardens", "Pollinator borders"],
  pollinators: ["Native bees", "Butterflies", "Hoverflies"],
  hostFor: [],
  cautions: ["Short-lived perennial or annual depending on climate"],
  careNotes: "Thrives in poor soil. Avoid heavy fertilizing.",
},

"Gaillardia aristata": {
  friendly: true,
  commonName: "Common blanketflower",
  nativeRange: "Western & central North America",
  habitat: "Open plains, prairies",
  bloomTime: "Summer to early fall",
  sun: "Full sun",
  soil: "Well-drained",
  water: "Low to medium",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: ["Prairie gardens", "Long-blooming pollinator beds"],
  pollinators: ["Bees", "Butterflies"],
  hostFor: [],
  cautions: [],
  careNotes: "Deadhead to extend bloom.",
},

"Lupinus perennis": {
  friendly: true,
  commonName: "Wild lupine",
  nativeRange: "Eastern North America",
  habitat: "Sandy prairies, open woods",
  bloomTime: "Spring to early summer",
  sun: "Full sun",
  soil: "Dry, sandy, well-drained",
  water: "Low",
  height: "1–2 ft",
  spread: "1–2 ft",
  uses: ["Host plant restoration", "Sandy native gardens"],
  pollinators: ["Native bees", "Bumblebees"],
  hostFor: ["Karner blue butterfly", "Other specialist butterflies"],
  cautions: ["Requires sandy soil; sensitive to disturbance"],
  careNotes: "Do not overwater. Needs open sun and low competition.",
},

"Aquilegia canadensis": {
  friendly: true,
  commonName: "Wild columbine",
  nativeRange: "Eastern North America",
  habitat: "Woodland edges, rocky slopes",
  bloomTime: "Spring (Apr–Jun)",
  sun: "Part sun to light shade",
  soil: "Well-drained; rocky or loamy",
  water: "Low to medium",
  height: "1–2 ft",
  spread: "1–1.5 ft",
  uses: ["Woodland pollinator gardens", "Early nectar source"],
  pollinators: ["Hummingbirds", "Long-tongued bees"],
  hostFor: [],
  cautions: [],
  careNotes: "Self-seeds gently. Great for partial shade.",
},

"Silphium laciniatum": {
  friendly: true,
  commonName: "Compass plant",
  nativeRange: "Central United States",
  habitat: "Tallgrass prairies",
  bloomTime: "Mid to late summer",
  sun: "Full sun",
  soil: "Deep, well-drained prairie soils",
  water: "Low to medium",
  height: "6–9 ft",
  spread: "2–3 ft",
  uses: ["Prairie restoration", "Back-of-border focal plant"],
  pollinators: ["Native bees", "Beetles", "Butterflies"],
  hostFor: [],
  cautions: ["Very tall; deep taproot makes transplanting difficult"],
  careNotes: "Best planted young. Long-lived prairie species.",
},

"Eutrochium purpureum": {
  friendly: true,
  commonName: "Sweet Joe-Pye weed",
  nativeRange: "Eastern North America",
  habitat: "Moist meadows, woodland edges",
  bloomTime: "Late summer to fall",
  sun: "Full sun to part sun",
  soil: "Moist, rich soil preferred",
  water: "Medium to high",
  height: "4–7 ft",
  spread: "2–4 ft",
  uses: ["Rain gardens", "Late-season butterfly plantings"],
  pollinators: ["Monarchs", "Swallowtails", "Native bees"],
  hostFor: [],
  cautions: ["Tall—requires space"],
  careNotes: "Thrives in moisture. Excellent late nectar plant.",
},

"Oenothera biennis": {
  friendly: true,
  commonName: "Common evening primrose",
  nativeRange: "Widespread across North America",
  habitat: "Fields, disturbed soils",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Well-drained",
  water: "Low",
  height: "3–5 ft",
  spread: "1–2 ft",
  uses: ["Nocturnal pollinator gardens", "Wildflower mixes"],
  pollinators: ["Moths", "Bees"],
  hostFor: [],
  cautions: ["Biennial; reseeds readily"],
  careNotes: "Blooms open at dusk. Leave seed for reseeding.",
},

"Gaura lindheimeri": {
  friendly: true,
  commonName: "Whirling butterflies",
  nativeRange: "South-central United States",
  habitat: "Open prairies, rocky soils",
  bloomTime: "Late spring to fall",
  sun: "Full sun",
  soil: "Well-drained",
  water: "Low",
  height: "2–4 ft",
  spread: "1–2 ft",
  uses: ["Airy pollinator borders", "Drought gardens"],
  pollinators: ["Bees", "Butterflies"],
  hostFor: [],
  cautions: [],
  careNotes: "Cut back midseason to encourage fresh growth.",
},

"Verbascum thapsus": {
  friendly: true,
  commonName: "Common mullein",
  nativeRange: "Non-native (Europe) but naturalized across North America",
  habitat: "Dry disturbed soils",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Dry, poor soils",
  water: "Low",
  height: "3–6 ft",
  spread: "1–2 ft",
  uses: ["Wildlife habitat", "Structural accent"],
  pollinators: ["Bees"],
  hostFor: [],
  cautions: ["Non-native; can spread aggressively"],
  careNotes: "Best in unmanaged or restoration-style areas.",
},

"Erigeron speciosus": {
  friendly: true,
  commonName: "Showy fleabane",
  nativeRange: "Western North America",
  habitat: "Open slopes, mountain meadows",
  bloomTime: "Late spring to summer",
  sun: "Full sun",
  soil: "Well-drained",
  water: "Low to medium",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: ["Western pollinator gardens", "Mountain landscapes"],
  pollinators: ["Bees", "Butterflies"],
  hostFor: [],
  cautions: [],
  careNotes: "Divide every few years for vigor.",
},


  // ----------------------
// Shrubs and small trees
// ----------------------

"Cephalanthus occidentalis": {
  friendly: true,
  commonName: "Buttonbush",
  nativeRange: "Eastern & central North America",
  habitat: "Wetlands, pond edges, streambanks, rain gardens",
  bloomTime: "Summer (Jun–Aug)",
  sun: "Full sun to part sun",
  soil: "Moist to wet soils; tolerates flooding",
  water: "High (likes consistently wet ground)",
  height: "6–12 ft (can be taller)",
  spread: "6–12 ft",
  uses: [
    "Rain gardens and wet sites",
    "Pollinator ‘magnet’ shrub",
    "Wildlife habitat plantings",
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies", "Beneficial wasps", "Hoverflies"],
  hostFor: [],
  cautions: ["Not for dry sites; struggles if soil dries repeatedly"],
  careNotes: "A top-tier shrub for wet areas. Prune in late winter if you need to shape it; flowers form on new growth.",
},

"Clethra alnifolia": {
  friendly: true,
  commonName: "Summersweet / Sweet pepperbush",
  nativeRange: "Eastern North America",
  habitat: "Moist woods, stream edges, swamp margins; tolerates shade",
  bloomTime: "Mid to late summer (Jul–Aug)",
  sun: "Part sun to part shade (tolerates full sun with moisture)",
  soil: "Moist, acidic soils preferred; adaptable if kept moist",
  water: "Medium to high",
  height: "3–8 ft",
  spread: "3–6 ft",
  uses: [
    "Shade-tolerant pollinator shrub",
    "Fragrant gardens",
    "Rain garden edges",
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies"],
  hostFor: [],
  cautions: ["Can sucker/spread slowly (usually manageable)"],
  careNotes: "One of the best mid-summer nectar shrubs. Mulch helps keep roots cool and moist.",
},

"Itea virginica": {
  friendly: true,
  commonName: "Virginia sweetspire",
  nativeRange: "Southeastern & eastern United States",
  habitat: "Moist woods, streambanks; tolerates wet soil",
  bloomTime: "Late spring to early summer (May–Jun)",
  sun: "Full sun to part shade",
  soil: "Moist to wet; adaptable; prefers slightly acidic",
  water: "Medium to high",
  height: "3–6 ft",
  spread: "3–6 ft",
  uses: [
    "Rain gardens",
    "Woodland-edge shrub borders",
    "Pollinator + fall color plantings",
  ],
  pollinators: ["Native bees", "Butterflies", "Beneficial flies"],
  hostFor: [],
  cautions: ["Can sucker/spread into a colony (great for naturalized areas)"],
  careNotes: "Prune after flowering if needed. Reliable shrub for wet-to-average sites with great fall color.",
},

"Amelanchier canadensis": {
  friendly: true,
  commonName: "Serviceberry",
  nativeRange: "Eastern North America",
  habitat: "Woodland edges, moist open woods",
  bloomTime: "Early spring (Mar–Apr)",
  sun: "Full sun to part sun",
  soil: "Moist, well-drained",
  water: "Medium",
  height: "10–25 ft",
  spread: "10–20 ft",
  uses: [
    "Early-season pollinator support",
    "Edible landscaping (berries)",
    "Small ornamental tree for native gardens",
  ],
  pollinators: ["Native bees", "Honey bees", "Early butterflies"],
  hostFor: [],
  cautions: ["Fruit can attract birds (usually a feature, not a bug)"],
  careNotes: "A keystone early-bloom tree/shrub. Plant where it can get airflow to reduce leaf issues.",
},

"Viburnum dentatum": {
  friendly: true,
  commonName: "Arrowwood viburnum",
  nativeRange: "Eastern North America",
  habitat: "Thickets, woodland edges, moist woods",
  bloomTime: "Late spring (May–Jun)",
  sun: "Full sun to part shade",
  soil: "Average to moist; adaptable",
  water: "Medium",
  height: "6–10 ft",
  spread: "6–10 ft",
  uses: [
    "Native hedge / screen",
    "Pollinator + bird habitat",
    "Foundation/native shrub borders",
  ],
  pollinators: ["Native bees", "Butterflies", "Beneficial flies"],
  hostFor: [],
  cautions: [],
  careNotes: "Flowers support insects; berries support birds. Prune after flowering if shaping is needed.",
},

"Viburnum trilobum": {
  friendly: true,
  commonName: "American cranberrybush viburnum",
  nativeRange: "Northern U.S. & Canada",
  habitat: "Moist woods and stream edges",
  bloomTime: "Spring (May–Jun)",
  sun: "Full sun to part shade",
  soil: "Moist, well-drained",
  water: "Medium",
  height: "8–12 ft",
  spread: "8–12 ft",
  uses: [
    "Wildlife shrub (berries + cover)",
    "Pollinator-supporting spring bloom",
    "Native hedgerows",
  ],
  pollinators: ["Native bees", "Butterflies", "Beneficial flies"],
  hostFor: [],
  cautions: [],
  careNotes: "Great for colder regions. Fruit persists into winter and supports birds.",
},

"Ceanothus americanus": {
  friendly: true,
  commonName: "New Jersey tea",
  nativeRange: "Eastern & central North America",
  habitat: "Dry open woods, prairies, sunny slopes",
  bloomTime: "Early to mid-summer (Jun–Jul)",
  sun: "Full sun to part sun",
  soil: "Dry to medium, well-drained (prefers lean soils)",
  water: "Low once established",
  height: "2–4 ft",
  spread: "3–5 ft",
  uses: [
    "Drought-tolerant native shrub",
    "Pollinator patches",
    "Prairie-style landscapes",
  ],
  pollinators: ["Native bees", "Butterflies", "Beneficial wasps"],
  hostFor: ["Butterfly larvae (various species use Ceanothus)"],
  cautions: ["Deep roots—doesn’t like transplanting once established"],
  careNotes: "Nitrogen-fixing and tough. Keep it sunny and lean; avoid rich fertilizers.",
},

"Spiraea alba": {
  friendly: true,
  commonName: "Meadowsweet (white spirea)",
  nativeRange: "Eastern North America",
  habitat: "Wet meadows, bog margins, stream edges",
  bloomTime: "Summer (Jun–Aug)",
  sun: "Full sun to part sun",
  soil: "Moist to wet; tolerant of seasonal wetness",
  water: "Medium to high",
  height: "2–4 ft",
  spread: "2–4 ft",
  uses: [
    "Rain garden shrub layer",
    "Pollinator borders in moist sites",
    "Naturalized wet meadow plantings",
  ],
  pollinators: ["Native bees", "Butterflies", "Hoverflies"],
  hostFor: [],
  cautions: ["Spreads by suckers in ideal wet sites"],
  careNotes: "Cut back in late winter for fresh growth. Great for wet areas where many shrubs fail.",
},

"Spiraea tomentosa": {
  friendly: true,
  commonName: "Steeplebush",
  nativeRange: "Eastern North America",
  habitat: "Wet meadows, bog edges, moist thickets",
  bloomTime: "Mid to late summer (Jul–Sep)",
  sun: "Full sun",
  soil: "Moist to wet",
  water: "High",
  height: "2–4 ft",
  spread: "2–4 ft",
  uses: [
    "Wet meadow shrub plantings",
    "Late-summer nectar support",
  ],
  pollinators: ["Native bees", "Butterflies", "Hoverflies"],
  hostFor: [],
  cautions: ["Can spread in wet sites"],
  careNotes: "Thrives where soil stays damp. Cut back yearly to keep it full and blooming heavily.",
},

"Hypericum perforatum": {
  friendly: true,
  commonName: "Common St. John’s wort",
  nativeRange: "Non-native (Europe/Asia); widely naturalized in North America",
  habitat: "Dry disturbed sites, roadsides",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Dry to medium, well-drained",
  water: "Low",
  height: "1–3 ft",
  spread: "1–3 ft",
  uses: ["Pollinator forage (where appropriate)"],
  pollinators: ["Bees"],
  hostFor: [],
  cautions: ["Non-native; can be invasive in some regions"],
  careNotes: "If you want a native alternative later, we can add native Hypericum species and swap this out.",
},

"Rhus aromatica": {
  friendly: true,
  commonName: "Fragrant sumac",
  nativeRange: "Eastern & central North America",
  habitat: "Dry hillsides, open woods, rocky slopes",
  bloomTime: "Early spring",
  sun: "Full sun to part sun",
  soil: "Dry to medium; well-drained",
  water: "Low",
  height: "2–6 ft",
  spread: "6–10 ft (spreading)",
  uses: [
    "Erosion control",
    "Tough native groundcover shrub",
    "Early-season pollinator support",
  ],
  pollinators: ["Early native bees"],
  hostFor: [],
  cautions: ["Spreads wide—plan space"],
  careNotes: "Great for slopes and hard sites. Flowers are early; fruit/cover supports wildlife.",
},

"Rhus glabra": {
  friendly: true,
  commonName: "Smooth sumac",
  nativeRange: "Widespread across North America",
  habitat: "Fields, prairies, roadsides; tolerant of poor soils",
  bloomTime: "Early to mid-summer",
  sun: "Full sun",
  soil: "Dry to medium; well-drained",
  water: "Low",
  height: "8–15 ft",
  spread: "8–15 ft",
  uses: [
    "Wildlife thickets",
    "Pollinator + bird habitat",
    "Hardy native screening",
  ],
  pollinators: ["Native bees", "Beneficial flies"],
  hostFor: [],
  cautions: ["Forms colonies via suckers"],
  careNotes: "Use in naturalized areas. Excellent for tough sites; great fall color and wildlife value.",
},

"Rhus typhina": {
  friendly: true,
  commonName: "Staghorn sumac",
  nativeRange: "Eastern North America",
  habitat: "Open woods, roadsides, rocky sites",
  bloomTime: "Early summer",
  sun: "Full sun",
  soil: "Dry to medium; well-drained",
  water: "Low",
  height: "10–20 ft",
  spread: "10–20 ft",
  uses: [
    "Naturalized thickets",
    "Wildlife habitat",
    "Dramatic fall color plantings",
  ],
  pollinators: ["Native bees", "Beneficial flies"],
  hostFor: [],
  cautions: ["Spreads via suckers; best in large spaces"],
  careNotes: "Very hardy and drought tolerant. Use as a colony-forming habitat plant rather than a ‘formal’ shrub.",
},

"Aronia melanocarpa": {
  friendly: true,
  commonName: "Black chokeberry",
  nativeRange: "Eastern North America",
  habitat: "Wet woods, bog edges, thickets; adaptable to average soils",
  bloomTime: "Spring (Apr–May)",
  sun: "Full sun to part shade",
  soil: "Moist to average; adaptable",
  water: "Medium",
  height: "3–6 ft",
  spread: "3–6 ft",
  uses: [
    "Native shrub borders",
    "Pollinator + bird-friendly berries",
    "Rain garden edges",
  ],
  pollinators: ["Native bees", "Honey bees"],
  hostFor: [],
  cautions: [],
  careNotes: "Spring blooms feed bees; berries support birds. Great fall color too.",
},

"Aronia arbutifolia": {
  friendly: true,
  commonName: "Red chokeberry",
  nativeRange: "Eastern North America",
  habitat: "Wet woods, swamps, thickets",
  bloomTime: "Spring",
  sun: "Full sun to part shade",
  soil: "Moist; tolerates wet sites",
  water: "Medium to high",
  height: "6–10 ft",
  spread: "3–6 ft",
  uses: [
    "Wetland edges",
    "Native hedgerows",
    "Wildlife support plantings",
  ],
  pollinators: ["Native bees", "Honey bees"],
  hostFor: [],
  cautions: ["Can sucker/spread in wet sites"],
  careNotes: "Excellent for wetter areas. Provides nectar in spring and fruit later for wildlife.",
},

"Physocarpus opulifolius": {
  friendly: true,
  commonName: "Ninebark",
  nativeRange: "Eastern & central North America",
  habitat: "Streambanks, open woods, rocky slopes; very adaptable",
  bloomTime: "Late spring to early summer (May–Jun)",
  sun: "Full sun to part shade",
  soil: "Adaptable; best in well-drained to moderately moist soils",
  water: "Low to medium",
  height: "5–10 ft",
  spread: "4–8 ft",
  uses: [
    "Hardy native foundation shrub",
    "Pollinator + cover plantings",
    "Erosion control",
  ],
  pollinators: ["Native bees", "Butterflies", "Hoverflies"],
  hostFor: [],
  cautions: [],
  careNotes: "Very tough. Prune after flowering if needed; peeling bark adds winter interest.",
},

"Sambucus canadensis": {
  friendly: true,
  commonName: "American elderberry",
  nativeRange: "Eastern & central North America",
  habitat: "Moist soils, stream edges, wet thickets",
  bloomTime: "Early to mid-summer (Jun–Jul)",
  sun: "Full sun to part sun",
  soil: "Moist to wet; rich soils preferred",
  water: "Medium to high",
  height: "5–12 ft",
  spread: "6–12 ft",
  uses: [
    "Wildlife gardens (berries)",
    "Pollinator shrub layer",
    "Rain garden edges",
  ],
  pollinators: ["Native bees", "Butterflies", "Beneficial flies"],
  hostFor: [],
  cautions: ["Raw parts of plant can be toxic; ripe berries are used with proper prep"],
  careNotes: "Blooms feed insects; berries feed birds. Best in moist soil; prune in late winter to shape.",
},

"Sambucus racemosa": {
  friendly: true,
  commonName: "Red elderberry",
  nativeRange: "Northern & western North America (also present in parts of the East)",
  habitat: "Moist woods, forest edges",
  bloomTime: "Spring to early summer",
  sun: "Part sun to part shade",
  soil: "Moist, well-drained",
  water: "Medium",
  height: "6–12 ft",
  spread: "6–10 ft",
  uses: [
    "Woodland edge habitat plantings",
    "Early-season pollinator support",
  ],
  pollinators: ["Native bees", "Beneficial flies"],
  hostFor: [],
  cautions: ["Berries are for wildlife; not typically used like black elderberry"],
  careNotes: "Great for cooler, woodland-edge conditions. Early bloom helps spring insects.",
},

"Cornus sericea": {
  friendly: true,
  commonName: "Red osier dogwood",
  nativeRange: "Widespread across North America",
  habitat: "Wetlands, streambanks, moist thickets",
  bloomTime: "Spring (May–Jun)",
  sun: "Full sun to part shade",
  soil: "Moist to wet",
  water: "High",
  height: "6–10 ft",
  spread: "6–10 ft",
  uses: [
    "Streambank stabilization",
    "Rain gardens",
    "Wildlife thickets",
  ],
  pollinators: ["Native bees", "Butterflies", "Beneficial flies"],
  hostFor: [],
  cautions: ["Spreads via suckers in wet sites"],
  careNotes: "For best red stem color, coppice/renew older stems every few years in late winter.",
},

"Cornus florida": {
  friendly: true,
  commonName: "Flowering dogwood",
  nativeRange: "Eastern United States",
  habitat: "Woodland edges, understory openings",
  bloomTime: "Spring (Apr–May)",
  sun: "Part sun (morning sun/afternoon shade ideal)",
  soil: "Well-drained, slightly acidic, rich organic soil",
  water: "Medium (consistent moisture helps)",
  height: "15–30 ft",
  spread: "15–30 ft",
  uses: [
    "Small native ornamental tree",
    "Early-season pollinator support",
    "Wildlife value (berries)",
  ],
  pollinators: ["Native bees", "Beneficial flies"],
  hostFor: [],
  cautions: ["Sensitive to drought/compaction; prefers woodland-like conditions"],
  careNotes: "Mulch and keep roots cool. Avoid planting in harsh full-sun, dry lawns.",
},

// ----------------------
// Native grasses (habitat + host plant value)
// ----------------------

"Schizachyrium scoparium": {
  friendly: true,
  commonName: "Little bluestem",
  nativeRange: "Widespread across North America",
  habitat: "Prairies, dry fields, open slopes",
  bloomTime: "Late summer (flowers subtle) + strong fall/winter structure",
  sun: "Full sun",
  soil: "Dry to medium; well-drained",
  water: "Low",
  height: "2–4 ft",
  spread: "1.5–2 ft",
  uses: [
    "Host plant + overwintering habitat",
    "Prairie restorations",
    "Drought-tolerant landscaping",
  ],
  pollinators: ["Supports pollinator ecosystems (habitat)"],
  hostFor: ["Skippers and grass-feeding caterpillars (habitat/host value)"],
  cautions: [],
  careNotes: "Leave standing through winter for habitat. Cut back in early spring before new growth.",
},

"Andropogon gerardii": {
  friendly: true,
  commonName: "Big bluestem",
  nativeRange: "Central & eastern North America",
  habitat: "Tallgrass prairie",
  bloomTime: "Late summer (flowers subtle)",
  sun: "Full sun",
  soil: "Medium; adaptable",
  water: "Low to medium",
  height: "4–8 ft",
  spread: "2–3 ft",
  uses: [
    "Prairie restorations",
    "Habitat structure for insects/birds",
    "Erosion control in large plantings",
  ],
  pollinators: ["Supports pollinator ecosystems (habitat)"],
  hostFor: ["Grassland insects and caterpillars (habitat/host value)"],
  cautions: ["Large—best for meadows and restoration, not small beds"],
  careNotes: "Cut back in early spring. Thrives with sun and space.",
},

"Sorghastrum nutans": {
  friendly: true,
  commonName: "Indiangrass",
  nativeRange: "Central & eastern North America",
  habitat: "Tallgrass prairie, open fields",
  bloomTime: "Late summer (flowers subtle)",
  sun: "Full sun",
  soil: "Medium; well-drained to moderately moist",
  water: "Low to medium",
  height: "3–7 ft",
  spread: "2–3 ft",
  uses: [
    "Prairie restorations",
    "Habitat plantings",
    "Fall color + structure",
  ],
  pollinators: ["Supports pollinator ecosystems (habitat)"],
  hostFor: ["Grassland insects and caterpillars (habitat/host value)"],
  cautions: [],
  careNotes: "Leave through winter for habitat. Cut back in early spring.",
},

"Panicum virgatum": {
  friendly: true,
  commonName: "Switchgrass",
  nativeRange: "Widespread across North America",
  habitat: "Prairies, open woods, wet to dry sites depending on ecotype",
  bloomTime: "Mid to late summer (flowers subtle)",
  sun: "Full sun",
  soil: "Adaptable; dry to moist",
  water: "Low to medium",
  height: "3–6 ft",
  spread: "2–3 ft",
  uses: [
    "Habitat + nesting material",
    "Rain gardens (moist ecotypes) or dry borders (dry ecotypes)",
    "Erosion control",
  ],
  pollinators: ["Supports pollinator ecosystems (habitat)"],
  hostFor: ["Grassland insects and caterpillars (habitat/host value)"],
  cautions: [],
  careNotes: "Very adaptable. Choose ecotype based on site moisture. Cut back in early spring.",
},

"Elymus canadensis": {
  friendly: true,
  commonName: "Canada wild rye",
  nativeRange: "Widespread across North America",
  habitat: "Open woods, prairies, streambanks; often an early successional grass",
  bloomTime: "Early to mid-summer (seedheads prominent)",
  sun: "Full sun to part sun",
  soil: "Adaptable; medium moisture",
  water: "Low to medium",
  height: "2–5 ft",
  spread: "1–2 ft",
  uses: [
    "Quick-establishing native grass",
    "Erosion control",
    "Habitat restoration mixes",
  ],
  pollinators: ["Supports pollinator ecosystems (habitat)"],
  hostFor: ["Grassland insects and caterpillars (habitat/host value)"],
  cautions: ["Often short-lived but reseeds in restoration mixes"],
  careNotes: "Great in seed mixes as a ‘starter’ native grass. Let it reseed if desired.",
},

"Bouteloua gracilis": {
  friendly: true,
  commonName: "Blue grama",
  nativeRange: "Great Plains & western North America",
  habitat: "Shortgrass prairie, dry open sites",
  bloomTime: "Summer (seedheads distinctive)",
  sun: "Full sun",
  soil: "Dry, well-drained",
  water: "Low",
  height: "0.5–1.5 ft",
  spread: "1–2 ft",
  uses: [
    "Low-water native lawns",
    "Prairie restorations",
    "Drought landscapes",
  ],
  pollinators: ["Supports pollinator ecosystems (habitat)"],
  hostFor: ["Grassland insects and caterpillars (habitat/host value)"],
  cautions: [],
  careNotes: "Excellent for hot, dry sites. Low maintenance and tough.",
},

"Bouteloua curtipendula": {
  friendly: true,
  commonName: "Sideoats grama",
  nativeRange: "Widespread across North America",
  habitat: "Prairies, rocky slopes, open sites",
  bloomTime: "Summer (seedheads hang along one side of stem)",
  sun: "Full sun",
  soil: "Dry to medium; well-drained",
  water: "Low",
  height: "1.5–3 ft",
  spread: "1–2 ft",
  uses: [
    "Prairie plantings",
    "Drought-tolerant landscapes",
    "Habitat mixes",
  ],
  pollinators: ["Supports pollinator ecosystems (habitat)"],
  hostFor: ["Grassland insects and caterpillars (habitat/host value)"],
  cautions: [],
  careNotes: "Very tough, easy native grass. Leave standing over winter for habitat benefits.",
},

"Muhlenbergia capillaris": {
  friendly: true,
  commonName: "Pink muhly grass",
  nativeRange: "Southeastern United States",
  habitat: "Sandy open sites, pine savannas",
  bloomTime: "Fall (showy pink plumes)",
  sun: "Full sun",
  soil: "Well-drained; sandy preferred",
  water: "Low to medium",
  height: "2–3 ft",
  spread: "2–3 ft",
  uses: [
    "Ornamental native grass with habitat value",
    "Borders and mass plantings",
  ],
  pollinators: ["Supports pollinator ecosystems (habitat)"],
  hostFor: ["Insect habitat/overwintering structure"],
  cautions: [],
  careNotes: "Cut back in late winter/early spring. Needs sun for best plumes.",
},

"Eragrostis spectabilis": {
  friendly: true,
  commonName: "Purple lovegrass",
  nativeRange: "Eastern North America",
  habitat: "Dry fields, sandy sites, open woods",
  bloomTime: "Late summer (airy purple seedheads)",
  sun: "Full sun",
  soil: "Dry to medium; well-drained",
  water: "Low",
  height: "1–2 ft",
  spread: "1–2 ft",
  uses: [
    "Drought-tolerant native grass",
    "Meadow mixes",
    "Habitat structure plantings",
  ],
  pollinators: ["Supports pollinator ecosystems (habitat)"],
  hostFor: ["Insect habitat/overwintering structure"],
  cautions: [],
  careNotes: "Leave standing for winter habitat; cut back in spring.",
},

"Danthonia spicata": {
  friendly: true,
  commonName: "Poverty oatgrass",
  nativeRange: "Eastern North America",
  habitat: "Dry open woods, rocky sites, sandy soils",
  bloomTime: "Spring to early summer (subtle blooms)",
  sun: "Full sun to part sun",
  soil: "Dry, poor soils; well-drained",
  water: "Low",
  height: "1–2 ft",
  spread: "1–2 ft",
  uses: [
    "Low-maintenance native groundcover grass",
    "Rocky/sandy restoration",
    "Habitat plantings",
  ],
  pollinators: ["Supports pollinator ecosystems (habitat)"],
  hostFor: ["Grassland insects (habitat/host value)"],
  cautions: [],
  careNotes: "Thrives where other grasses struggle. Minimal water and no fertilizer needed.",
},

// ----------------------
// Larger native trees (major spring nectar/pollen sources)
// ----------------------

"Tilia americana": {
  friendly: true,
  commonName: "American linden / Basswood",
  nativeRange: "Eastern North America",
  habitat: "Rich woods, bottomlands; prefers decent moisture",
  bloomTime: "Early to mid-summer (Jun–Jul)",
  sun: "Full sun to part sun",
  soil: "Moist, well-drained; rich soils ideal",
  water: "Medium",
  height: "50–80 ft",
  spread: "30–50 ft",
  uses: [
    "High-value bee tree",
    "Shade tree with pollinator benefits",
  ],
  pollinators: ["Honey bees", "Native bees", "Bumblebees"],
  hostFor: [],
  cautions: ["Large tree—site appropriately"],
  careNotes: "When in bloom, it can be a major nectar flow for bees. Plant where it has room to mature.",
},

"Tilia cordata": {
  friendly: true,
  commonName: "Littleleaf linden",
  nativeRange: "Non-native (Europe); widely planted in North America",
  habitat: "Urban and residential landscapes",
  bloomTime: "Early to mid-summer",
  sun: "Full sun",
  soil: "Adaptable; prefers well-drained",
  water: "Medium",
  height: "40–70 ft",
  spread: "25–40 ft",
  uses: ["Ornamental shade tree with strong nectar value"],
  pollinators: ["Honey bees", "Bumblebees"],
  hostFor: [],
  cautions: ["Non-native (still nectar-rich; track for native-only mode)"],
  careNotes: "Very attractive to bees when blooming. If you want native-only, prioritize Tilia americana.",
},

"Aesculus pavia": {
  friendly: true,
  commonName: "Red buckeye",
  nativeRange: "Southeastern United States",
  habitat: "Woodland edges, streambanks",
  bloomTime: "Spring (Mar–Apr)",
  sun: "Part sun to full sun",
  soil: "Moist, well-drained",
  water: "Medium",
  height: "10–20 ft",
  spread: "10–15 ft",
  uses: [
    "Hummingbird gardens",
    "Small ornamental native tree/shrub",
    "Early nectar support",
  ],
  pollinators: ["Hummingbirds", "Large bees"],
  hostFor: [],
  cautions: ["Seeds are toxic if ingested"],
  careNotes: "Excellent early-season hummingbird plant. Prefers woodland-edge conditions with consistent moisture.",
},

"Aesculus glabra": {
  friendly: true,
  commonName: "Ohio buckeye",
  nativeRange: "Midwestern United States",
  habitat: "Bottomlands and rich woods",
  bloomTime: "Spring (Apr–May)",
  sun: "Full sun to part sun",
  soil: "Moist, well-drained",
  water: "Medium",
  height: "20–40 ft",
  spread: "20–40 ft",
  uses: ["Early spring pollinator support", "Native shade tree (medium-sized)"],
  pollinators: ["Native bees"],
  hostFor: [],
  cautions: ["Seeds are toxic if ingested"],
  careNotes: "Spring flowers provide early resources. Plant away from high-traffic areas if seed toxicity is a concern.",
},

"Robinia pseudoacacia": {
  friendly: true,
  commonName: "Black locust",
  nativeRange: "Eastern United States (but invasive in some regions)",
  habitat: "Open woods, disturbed sites; fast-growing",
  bloomTime: "Late spring (May–Jun)",
  sun: "Full sun",
  soil: "Adaptable; tolerates poor soils",
  water: "Low to medium",
  height: "40–80 ft",
  spread: "20–40 ft",
  uses: ["Major nectar tree (where appropriate)", "Erosion control in tough soils"],
  pollinators: ["Honey bees", "Native bees"],
  hostFor: [],
  cautions: ["Can be invasive outside native range", "Thorns on some trees"],
  careNotes: "Incredible bee tree during bloom, but consider regional invasiveness before recommending for planting.",
},

"Gleditsia triacanthos": {
  friendly: true,
  commonName: "Honey locust",
  nativeRange: "Central & eastern North America",
  habitat: "Open woods, floodplains; very adaptable",
  bloomTime: "Late spring to early summer",
  sun: "Full sun",
  soil: "Adaptable; tolerates a wide range",
  water: "Low to medium",
  height: "30–70 ft",
  spread: "25–50 ft",
  uses: ["Shade tree with pollinator value", "Urban-tolerant native tree"],
  pollinators: ["Bees"],
  hostFor: [],
  cautions: ["Wild type can have large thorns (many landscape cultivars are thornless)"],
  careNotes: "Good native shade option. If using in-app recommendations, note thornless cultivars for residential yards.",
},

"Cercis canadensis": {
  friendly: true,
  commonName: "Eastern redbud",
  nativeRange: "Eastern United States",
  habitat: "Woodland edges, open woods",
  bloomTime: "Early spring (Mar–Apr)",
  sun: "Full sun to part shade",
  soil: "Well-drained; adaptable; prefers moderate moisture",
  water: "Medium",
  height: "15–30 ft",
  spread: "15–25 ft",
  uses: ["Early-season pollinator support", "Small ornamental native tree"],
  pollinators: ["Native bees"],
  hostFor: [],
  cautions: [],
  careNotes: "One of the best early bloomers for native bees. Great residential-scale native tree.",
},

"Acer rubrum": {
  friendly: true,
  commonName: "Red maple",
  nativeRange: "Eastern North America",
  habitat: "Wet to upland woods; very adaptable",
  bloomTime: "Late winter to early spring",
  sun: "Full sun to part sun",
  soil: "Adaptable; tolerates wet sites and average soils",
  water: "Medium",
  height: "40–70 ft",
  spread: "30–50 ft",
  uses: ["Early pollen source for bees", "Shade tree", "Wet-site tolerant tree"],
  pollinators: ["Honey bees", "Native bees"],
  hostFor: [],
  cautions: ["Large tree—site appropriately"],
  careNotes: "A major early pollen flow for bees when little else is blooming.",
},

"Salix discolor": {
  friendly: true,
  commonName: "Pussy willow",
  nativeRange: "Northern & eastern North America",
  habitat: "Wetlands, stream edges, damp soils",
  bloomTime: "Very early spring",
  sun: "Full sun",
  soil: "Moist to wet",
  water: "High",
  height: "6–20 ft",
  spread: "6–15 ft",
  uses: ["Critical early pollen/nectar source", "Wet-site shrub/tree"],
  pollinators: ["Honey bees", "Native bees", "Early bumblebees"],
  hostFor: [],
  cautions: ["Needs moisture; not for dry sites"],
  careNotes: "One of the best early-season bee plants. Coppice/prune as needed to maintain shrub form.",
},

"Salix nigra": {
  friendly: true,
  commonName: "Black willow",
  nativeRange: "Eastern North America",
  habitat: "Streambanks, floodplains, wetlands",
  bloomTime: "Early spring",
  sun: "Full sun",
  soil: "Moist to wet",
  water: "High",
  height: "30–60 ft",
  spread: "30–50 ft",
  uses: [
    "Wetland restoration",
    "Early-season pollinator support",
    "Streambank stabilization",
  ],
  pollinators: ["Honey bees", "Native bees", "Early bumblebees"],
  hostFor: [],
  cautions: ["Large tree; wood can be brittle in storms"],
  careNotes: "Excellent for wet-site restoration. Flowers provide early resources when bee colonies are ramping up.",
},


  // ----------------------
// Classic garden nectar plants (non-native but beneficial)
// ----------------------

"Lavandula angustifolia": {
  friendly: true,
  commonName: "English lavender",
  nativeRange: "Mediterranean region (non-native in North America)",
  habitat: "Garden plant; thrives in hot, sunny, dry conditions with sharp drainage",
  bloomTime: "Late spring through summer (varies by cultivar)",
  sun: "Full sun",
  soil: "Very well-drained; sandy/gravelly preferred",
  water: "Low once established",
  height: "1–2.5 ft",
  spread: "1–2 ft",
  uses: [
    "Bee-friendly borders",
    "Herb/scent gardens",
    "Containers and edging",
    "Drought-tolerant landscapes",
  ],
  pollinators: ["Honey bees", "Bumblebees", "Native bees"],
  hostFor: [],
  cautions: ["Non-native", "Hates wet feet (root rot in poorly drained soil)"],
  careNotes:
    "Prune lightly after bloom and again in early spring (don’t cut into old woody stems). Needs drainage more than water.",
},

"Lavandula x intermedia": {
  friendly: true,
  commonName: "Lavandin",
  nativeRange: "Mediterranean (hybrid; non-native in North America)",
  habitat: "Garden plant; similar needs to English lavender but often larger",
  bloomTime: "Summer (often later and longer than L. angustifolia)",
  sun: "Full sun",
  soil: "Very well-drained; sandy/gravelly",
  water: "Low",
  height: "2–3.5 ft",
  spread: "2–3 ft",
  uses: [
    "Large fragrant borders",
    "Bee forage plantings",
    "Cut/dried flower harvest",
  ],
  pollinators: ["Honey bees", "Bumblebees", "Native bees"],
  hostFor: [],
  cautions: ["Non-native", "Needs excellent drainage"],
  careNotes:
    "Often more heat-tolerant and more floriferous. Give it space and airflow; avoid heavy mulching around the crown.",
},

"Salvia nemorosa": {
  friendly: true,
  commonName: "Wood sage (ornamental salvia)",
  nativeRange: "Europe/West Asia (non-native in North America)",
  habitat: "Garden plant; performs best in sunny, well-drained beds",
  bloomTime: "Late spring through summer (reblooms with deadheading)",
  sun: "Full sun",
  soil: "Well-drained; average soils",
  water: "Low to medium",
  height: "1–2.5 ft",
  spread: "1–2 ft",
  uses: [
    "Long-blooming pollinator borders",
    "Drought-tolerant mixed beds",
    "Edging/low structure plantings",
  ],
  pollinators: ["Bumblebees", "Honey bees", "Native bees", "Butterflies"],
  hostFor: [],
  cautions: ["Non-native"],
  careNotes:
    "Cut spent flower spikes back to encourage repeat bloom. Very reliable ‘constant bee traffic’ plant.",
},

"Salvia x sylvestris": {
  friendly: true,
  commonName: "Hybrid salvia",
  nativeRange: "Garden hybrid (non-native lineage)",
  habitat: "Garden plant; sunny borders",
  bloomTime: "Late spring through summer (reblooms if cut back)",
  sun: "Full sun",
  soil: "Well-drained; average",
  water: "Low to medium",
  height: "1.5–3 ft",
  spread: "1–2 ft",
  uses: [
    "Pollinator borders",
    "Low-water perennial beds",
    "Color blocks in sunny beds",
  ],
  pollinators: ["Bumblebees", "Honey bees", "Native bees", "Butterflies"],
  hostFor: [],
  cautions: ["Non-native hybrid"],
  careNotes:
    "Shear back after the first big bloom flush for a strong second wave. Avoid soggy soil.",
},

"Salvia guaranitica": {
  friendly: true,
  commonName: "Anise-scented sage",
  nativeRange: "South America (non-native in North America)",
  habitat: "Garden plant; warm-season performer",
  bloomTime: "Summer through fall (long season in warm climates)",
  sun: "Full sun to part sun",
  soil: "Well-drained; moderate fertility",
  water: "Medium (more bloom with consistent moisture)",
  height: "3–6 ft",
  spread: "2–4 ft",
  uses: [
    "Hummingbird gardens",
    "Late-season nectar support",
    "Tall border plantings",
  ],
  pollinators: ["Hummingbirds", "Bumblebees", "Large native bees"],
  hostFor: [],
  cautions: ["Non-native", "May be tender/annual in cold climates"],
  careNotes:
    "In colder zones it may die back or be grown as an annual. Cut back hard in spring once frost danger passes.",
},

"Nepeta cataria": {
  friendly: true,
  commonName: "Catnip",
  nativeRange: "Europe/Asia (non-native; naturalized)",
  habitat: "Disturbed sites and gardens; very tough and drought tolerant",
  bloomTime: "Summer (often extended)",
  sun: "Full sun to part sun",
  soil: "Well-drained; tolerant of poor soils",
  water: "Low",
  height: "2–3 ft",
  spread: "2–3 ft",
  uses: [
    "Bee forage patches",
    "Herb gardens",
    "Low-maintenance pollinator beds",
  ],
  pollinators: ["Honey bees", "Native bees"],
  hostFor: [],
  cautions: ["Non-native", "Can spread/self-seed", "Cats may roll in it and flatten plants"],
  careNotes:
    "Shear midseason for fresh growth and more flowers. If you want less spread, deadhead before seeds mature.",
},

"Nepeta racemosa": {
  friendly: true,
  commonName: "Dwarf catmint",
  nativeRange: "Eurasia (non-native in North America)",
  habitat: "Garden plant; sunny borders and edges",
  bloomTime: "Late spring through summer (often repeats)",
  sun: "Full sun to part sun",
  soil: "Well-drained; average",
  water: "Low to medium",
  height: "0.5–1.5 ft",
  spread: "1–2 ft",
  uses: [
    "Edging plant in pollinator beds",
    "Groundcover-like borders",
    "Long-blooming low structure",
  ],
  pollinators: ["Bumblebees", "Honey bees", "Native bees"],
  hostFor: [],
  cautions: ["Non-native"],
  careNotes:
    "Cut back after the first bloom flush to keep it tidy and push a second bloom wave.",
},

"Nepeta x faassenii": {
  friendly: true,
  commonName: "Faassen’s catmint",
  nativeRange: "Garden hybrid (non-native lineage)",
  habitat: "Garden plant; sunny, well-drained beds",
  bloomTime: "Late spring through fall (very long bloom)",
  sun: "Full sun",
  soil: "Well-drained",
  water: "Low to medium",
  height: "1–2 ft",
  spread: "2–3 ft",
  uses: [
    "One of the best ‘set it and forget it’ bee plants",
    "Borders and mass plantings",
    "Drought-tolerant perennial beds",
  ],
  pollinators: ["Bumblebees", "Honey bees", "Native bees", "Butterflies"],
  hostFor: [],
  cautions: ["Non-native hybrid"],
  careNotes:
    "Shear back by ~1/3 after the first big bloom for a clean mound and tons of rebloom.",
},

"Verbena bonariensis": {
  friendly: true,
  commonName: "Tall verbena / Purpletop vervain (ornamental)",
  nativeRange: "South America (non-native in North America)",
  habitat: "Garden plant; loves sun and decent drainage",
  bloomTime: "Summer through fall",
  sun: "Full sun",
  soil: "Well-drained; tolerates average soils",
  water: "Low to medium",
  height: "3–6 ft",
  spread: "1–2 ft",
  uses: [
    "Airy ‘see-through’ pollinator plant",
    "Butterfly gardens",
    "Late-season nectar support",
  ],
  pollinators: ["Butterflies", "Native bees", "Honey bees"],
  hostFor: [],
  cautions: ["Non-native", "Can self-seed in warm climates"],
  careNotes:
    "Let it weave through other plants. Deadhead to reduce reseeding if needed.",
},

"Verbena hastata": {
  friendly: true,
  commonName: "Blue vervain",
  nativeRange: "Widespread across North America",
  habitat: "Moist meadows, stream edges, wet ditches",
  bloomTime: "Summer (Jun–Sep)",
  sun: "Full sun to part sun",
  soil: "Moist to wet; tolerates heavy soils",
  water: "Medium to high",
  height: "2–5 ft",
  spread: "1–2 ft",
  uses: [
    "Rain gardens",
    "Wet meadow plantings",
    "Tall pollinator borders",
  ],
  pollinators: ["Native bees", "Butterflies", "Beneficial flies"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Great native ‘spike’ plant for damp areas. Cut back after bloom for tidiness or let it seed lightly.",
},

"Gaura sinuata": {
  friendly: true,
  commonName: "Butterfly gaura",
  nativeRange: "South-central United States",
  habitat: "Dry prairies, sandy/rocky soils",
  bloomTime: "Late spring through fall",
  sun: "Full sun",
  soil: "Well-drained; sandy/rocky preferred",
  water: "Low",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Drought-tolerant pollinator beds",
    "Airy borders",
    "Hot, sunny landscapes",
  ],
  pollinators: ["Bees", "Butterflies", "Moths"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Excellent for lean soils. Cut back midseason if it gets leggy to encourage fresh flowering stems.",
},

"Erysimum cheiri": {
  friendly: true,
  commonName: "Wallflower",
  nativeRange: "Europe/Asia (non-native in North America)",
  habitat: "Garden plant; cool-season bloomer in many climates",
  bloomTime: "Spring (can extend into early summer)",
  sun: "Full sun",
  soil: "Well-drained",
  water: "Low to medium",
  height: "1–2 ft",
  spread: "0.75–1.5 ft",
  uses: [
    "Early-season color + nectar",
    "Pollinator beds (spring)",
    "Containers and borders",
  ],
  pollinators: ["Bees", "Butterflies"],
  hostFor: [],
  cautions: ["Non-native", "Often short-lived/perennial depending on climate"],
  careNotes:
    "Best bloom in cool weather. Provide sharp drainage; avoid soggy soil.",
},

"Dianthus barbatus": {
  friendly: true,
  commonName: "Sweet William",
  nativeRange: "Europe/Asia (non-native in North America)",
  habitat: "Garden plant; cool-season performer",
  bloomTime: "Late spring to early summer",
  sun: "Full sun to part sun",
  soil: "Well-drained; neutral to slightly alkaline",
  water: "Low to medium",
  height: "1–2 ft",
  spread: "0.75–1.5 ft",
  uses: [
    "Fragrant borders",
    "Cut flowers",
    "Early nectar in mixed beds",
  ],
  pollinators: ["Bees", "Butterflies"],
  hostFor: [],
  cautions: ["Non-native"],
  careNotes:
    "Deadhead to extend bloom. Avoid overly wet soil to prevent rot.",
},

"Dianthus caryophyllus": {
  friendly: true,
  commonName: "Carnation",
  nativeRange: "Mediterranean (non-native in North America)",
  habitat: "Garden plant; prefers sun and drainage",
  bloomTime: "Late spring through summer (varies by cultivar)",
  sun: "Full sun",
  soil: "Well-drained; prefers neutral to slightly alkaline",
  water: "Low to medium",
  height: "1–3 ft",
  spread: "0.75–1.5 ft",
  uses: [
    "Cut flower gardens",
    "Fragrant beds",
  ],
  pollinators: ["Bees (mostly for pollen/limited nectar)", "Butterflies (occasionally)"],
  hostFor: [],
  cautions: ["Non-native", "Some modern cultivars offer less nectar than open forms"],
  careNotes:
    "Choose open, single-flower types for better pollinator value. Deadhead for continued bloom.",
},

"Campanula persicifolia": {
  friendly: true,
  commonName: "Peach-leaved bellflower",
  nativeRange: "Europe/Asia (non-native in North America)",
  habitat: "Garden plant; prefers cooler climates and well-drained soil",
  bloomTime: "Early to mid-summer",
  sun: "Full sun to part sun",
  soil: "Well-drained; average garden soil",
  water: "Medium",
  height: "1.5–3 ft",
  spread: "1–1.5 ft",
  uses: [
    "Cottage gardens",
    "Pollinator borders in temperate climates",
  ],
  pollinators: ["Bees"],
  hostFor: [],
  cautions: ["Non-native"],
  careNotes:
    "Deadhead to extend bloom. Provide moisture during hot spells but avoid soggy soil.",
},

"Campanula glomerata": {
  friendly: true,
  commonName: "Clustered bellflower",
  nativeRange: "Europe/Asia (non-native in North America)",
  habitat: "Garden plant; tough and adaptable",
  bloomTime: "Early to mid-summer",
  sun: "Full sun to part sun",
  soil: "Average; prefers well-drained",
  water: "Medium",
  height: "1–2.5 ft",
  spread: "1–2+ ft",
  uses: [
    "Pollinator borders",
    "Cottage plantings",
  ],
  pollinators: ["Bees"],
  hostFor: [],
  cautions: ["Non-native", "Can spread in some gardens"],
  careNotes:
    "If it spreads more than you want, divide or edge it. Deadhead to keep it tidy.",
},

"Centranthus ruber": {
  friendly: true,
  commonName: "Jupiter’s beard / Red valerian",
  nativeRange: "Mediterranean (non-native in North America)",
  habitat: "Dry, sunny walls/slopes; thrives in poor soils",
  bloomTime: "Late spring through summer (often repeats into fall)",
  sun: "Full sun",
  soil: "Well-drained; thrives in gravel/rocky soils",
  water: "Low",
  height: "2–3 ft",
  spread: "2–3 ft",
  uses: [
    "Drought gardens",
    "Butterfly plantings",
    "Rock gardens and slopes",
  ],
  pollinators: ["Butterflies", "Bees"],
  hostFor: [],
  cautions: ["Non-native", "Can self-seed freely in some climates"],
  careNotes:
    "Deadhead to reduce reseeding and extend bloom. A ‘thrives on neglect’ nectar plant.",
},

"Eschscholzia californica": {
  friendly: true,
  commonName: "California poppy",
  nativeRange: "Western United States",
  habitat: "Dry open sites; meadows, slopes, disturbed ground",
  bloomTime: "Spring to summer (can extend; often seasonal flushes)",
  sun: "Full sun",
  soil: "Dry, well-drained; sandy/rocky preferred",
  water: "Low",
  height: "0.5–1.5 ft",
  spread: "1–1.5 ft",
  uses: [
    "Drought-tolerant wildflower mixes",
    "Pollinator patches",
    "Low borders and slopes",
  ],
  pollinators: ["Native bees (pollen)", "Hoverflies"],
  hostFor: [],
  cautions: ["Too much water reduces bloom and can cause flop"],
  careNotes:
    "Do not overwater. Let it self-seed for recurring spring color.",
},

"Papaver orientale": {
  friendly: true,
  commonName: "Oriental poppy",
  nativeRange: "Caucasus/West Asia (non-native in North America)",
  habitat: "Garden plant; cool-season growth with summer dormancy",
  bloomTime: "Late spring to early summer",
  sun: "Full sun",
  soil: "Well-drained; average to rich",
  water: "Medium (during growth); low once dormant",
  height: "2–3 ft",
  spread: "1.5–2 ft",
  uses: [
    "Spring focal blooms",
    "Pollen source for bees",
  ],
  pollinators: ["Bees (pollen-heavy)"],
  hostFor: [],
  cautions: ["Non-native", "Goes dormant after flowering—plan companion plants to fill gaps"],
  careNotes:
    "After bloom, foliage may yellow and disappear. Plant with later-blooming companions to cover the space.",
},

"Papaver rhoeas": {
  friendly: true,
  commonName: "Corn poppy / Flanders poppy",
  nativeRange: "Europe/West Asia (non-native in North America)",
  habitat: "Annual wildflower for gardens and meadows",
  bloomTime: "Late spring to summer",
  sun: "Full sun",
  soil: "Well-drained; tolerates poor soils",
  water: "Low to medium",
  height: "1–3 ft",
  spread: "1–1.5 ft",
  uses: [
    "Annual wildflower mixes",
    "Pollen source in sunny beds",
  ],
  pollinators: ["Bees (mostly pollen)", "Hoverflies"],
  hostFor: [],
  cautions: ["Non-native", "Reseeds readily"],
  careNotes:
    "Direct sow for best results. Great for quick spring/summer pollen but not a major nectar plant.",
},


 // ----------------------
// Herbs – extremely important in home pollinator gardens
// ----------------------

"Ocimum basilicum": {
  friendly: true,
  commonName: "Sweet basil",
  nativeRange: "Tropical Asia (non-native in North America)",
  habitat: "Garden annual; thrives in warm, sunny beds and containers",
  bloomTime: "Summer through fall (once allowed to bolt/flower)",
  sun: "Full sun",
  soil: "Rich, well-drained garden soil",
  water: "Medium (even moisture for best growth)",
  height: "1–2.5 ft",
  spread: "1–1.5 ft",
  uses: [
    "Culinary herb",
    "Container gardens",
    "Pollinator support when flowering",
  ],
  pollinators: ["Honey bees", "Native bees", "Hoverflies"],
  hostFor: [],
  cautions: ["Not frost tolerant (annual in most climates)"],
  careNotes:
    "If you want pollinator value, let a few plants flower (don’t pinch all blooms). For eating, pinch flowers off to keep leaves tender.",
},

"Thymus vulgaris": {
  friendly: true,
  commonName: "Garden thyme",
  nativeRange: "Mediterranean (non-native in North America)",
  habitat: "Low perennial herb; great in rock gardens and edging",
  bloomTime: "Late spring to summer",
  sun: "Full sun",
  soil: "Very well-drained; sandy/gravelly ideal",
  water: "Low once established",
  height: "6–12 in",
  spread: "12–18 in",
  uses: [
    "Culinary herb",
    "Groundcover/edging",
    "Drought-tolerant pollinator plant",
  ],
  pollinators: ["Honey bees", "Small native bees"],
  hostFor: [],
  cautions: ["Dislikes wet soil (root rot risk)"],
  careNotes:
    "One of the best tiny-flower bee plants. Needs sun and sharp drainage. Lightly trim after bloom to keep it dense.",
},

"Origanum vulgare": {
  friendly: true,
  commonName: "Oregano",
  nativeRange: "Europe/West Asia (non-native; naturalized in many places)",
  habitat: "Perennial herb; sunny beds, borders, containers",
  bloomTime: "Summer (Jul–Sep)",
  sun: "Full sun",
  soil: "Well-drained; average soils",
  water: "Low to medium",
  height: "1–2 ft",
  spread: "1.5–2 ft",
  uses: [
    "Culinary herb",
    "Pollinator plant (flowers are a magnet)",
    "Groundcover-like border plant",
  ],
  pollinators: ["Honey bees", "Native bees", "Butterflies", "Hoverflies"],
  hostFor: [],
  cautions: ["Can spread; may self-seed"],
  careNotes:
    "Let it flower for maximum pollinator value. Shear after flowering to keep it tidy and encourage new growth.",
},

"Rosmarinus officinalis": {
  friendly: true,
  commonName: "Rosemary",
  nativeRange: "Mediterranean (non-native in North America)",
  habitat: "Shrubby herb; thrives in warm climates and containers",
  bloomTime: "Winter to spring in warm climates; spring/summer in containers",
  sun: "Full sun",
  soil: "Very well-drained; sandy/gravelly",
  water: "Low to medium (low once established)",
  height: "2–6 ft (smaller in pots)",
  spread: "2–4 ft",
  uses: [
    "Culinary herb",
    "Evergreen container shrub",
    "Early nectar in mild climates",
  ],
  pollinators: ["Honey bees", "Bumblebees", "Native bees"],
  hostFor: [],
  cautions: ["Not reliably hardy in cold winters; often grown in pots and overwintered"],
  careNotes:
    "Drainage is everything. Let soil dry slightly between waterings. In cold zones, bring pots indoors before hard frost.",
},

"Salvia officinalis": {
  friendly: true,
  commonName: "Garden sage",
  nativeRange: "Mediterranean (non-native in North America)",
  habitat: "Perennial herb; sunny borders and herb gardens",
  bloomTime: "Late spring to early summer",
  sun: "Full sun",
  soil: "Well-drained; average to sandy",
  water: "Low to medium",
  height: "1–2.5 ft",
  spread: "1–2 ft",
  uses: [
    "Culinary herb",
    "Pollinator garden herb layer",
    "Drought-tolerant beds",
  ],
  pollinators: ["Bumblebees", "Honey bees", "Butterflies"],
  hostFor: [],
  cautions: ["Can get woody over time; replace or prune back periodically"],
  careNotes:
    "Let some plants bloom for pollinators. Prune lightly after flowering; avoid cutting hard into old wood.",
},

"Mentha spicata": {
  friendly: true,
  commonName: "Spearmint",
  nativeRange: "Europe/Asia (non-native; widely naturalized)",
  habitat: "Spreading perennial; moist soils; containers recommended",
  bloomTime: "Summer (Jul–Sep)",
  sun: "Full sun to part sun",
  soil: "Moist, rich soil",
  water: "Medium",
  height: "1–2.5 ft",
  spread: "Aggressive spreader",
  uses: [
    "Culinary herb",
    "Tea gardens",
    "Pollinator forage (flowers are heavily visited)",
  ],
  pollinators: ["Honey bees", "Native bees", "Hoverflies", "Beneficial flies"],
  hostFor: [],
  cautions: ["Spreads aggressively—use containers or barriers"],
  careNotes:
    "If you let mint flower, pollinators will stack on it. To prevent takeover, keep it in a pot and cut flowers before seed set.",
},

"Mentha x piperita": {
  friendly: true,
  commonName: "Peppermint",
  nativeRange: "Hybrid (non-native lineage; widely cultivated/naturalized)",
  habitat: "Spreading perennial; prefers moisture; containers recommended",
  bloomTime: "Summer",
  sun: "Full sun to part sun",
  soil: "Moist, rich soil",
  water: "Medium",
  height: "1–2.5 ft",
  spread: "Aggressive spreader",
  uses: [
    "Culinary herb",
    "Tea gardens",
    "Pollinator forage patches",
  ],
  pollinators: ["Honey bees", "Native bees", "Hoverflies", "Beneficial flies"],
  hostFor: [],
  cautions: ["Spreads aggressively—container recommended"],
  careNotes:
    "Same as spearmint—excellent pollinator value when flowering, but control it to prevent it from taking over beds.",
},

"Melissa officinalis": {
  friendly: true,
  commonName: "Lemon balm",
  nativeRange: "Europe/West Asia (non-native; naturalized)",
  habitat: "Hardy herb; sunny to part-shade beds",
  bloomTime: "Summer",
  sun: "Full sun to part sun",
  soil: "Average, well-drained",
  water: "Low to medium",
  height: "1.5–3 ft",
  spread: "1.5–2.5 ft",
  uses: [
    "Tea herb",
    "Pollinator support when flowering",
    "Herb gardens",
  ],
  pollinators: ["Honey bees", "Native bees"],
  hostFor: [],
  cautions: ["Can self-seed/spread"],
  careNotes:
    "Let it flower for bees, but deadhead if you don’t want it popping up everywhere.",
},

"Allium schoenoprasum": {
  friendly: true,
  commonName: "Chives",
  nativeRange: "Europe/Asia (non-native; widely cultivated)",
  habitat: "Perennial clumping herb; great in borders and pots",
  bloomTime: "Late spring to early summer",
  sun: "Full sun",
  soil: "Well-drained; average garden soil",
  water: "Low to medium",
  height: "10–18 in",
  spread: "12–18 in",
  uses: [
    "Culinary herb",
    "Edible border plant",
    "Pollinator support (flowers are excellent)",
  ],
  pollinators: ["Honey bees", "Native bees", "Butterflies"],
  hostFor: [],
  cautions: ["Can self-seed if flowers aren’t removed"],
  careNotes:
    "If you want pollinator value, leave blooms. If you want less spread, snip flowers after peak bloom.",
},

"Allium tuberosum": {
  friendly: true,
  commonName: "Garlic chives",
  nativeRange: "East Asia (non-native; can naturalize)",
  habitat: "Perennial clump; sunny borders; very hardy",
  bloomTime: "Late summer to fall (Aug–Oct)",
  sun: "Full sun",
  soil: "Well-drained; adaptable",
  water: "Low to medium",
  height: "1–2 ft",
  spread: "1–2 ft",
  uses: [
    "Culinary herb",
    "Late-season nectar/pollen source",
  ],
  pollinators: ["Bees", "Butterflies", "Hoverflies"],
  hostFor: [],
  cautions: ["Can self-seed and spread; may be invasive in some areas"],
  careNotes:
    "Great late bloom for pollinators, but deadhead if you don’t want seedlings everywhere.",
},

"Lamium maculatum": {
  friendly: true,
  commonName: "Spotted deadnettle",
  nativeRange: "Europe/West Asia (non-native)",
  habitat: "Shade groundcover; woodland gardens and shady beds",
  bloomTime: "Spring to early summer (often repeats)",
  sun: "Part shade to shade",
  soil: "Moist, well-drained",
  water: "Medium",
  height: "6–12 in",
  spread: "1–2+ ft",
  uses: [
    "Shade groundcover",
    "Early-season bee support in shade",
  ],
  pollinators: ["Bumblebees", "Native bees"],
  hostFor: [],
  cautions: ["Non-native; can spread in ideal conditions"],
  careNotes:
    "Useful in shady spaces where few nectar plants thrive. Keep contained if it spreads too much.",
},

"Lamium amplexicaule": {
  friendly: true,
  commonName: "Henbit",
  nativeRange: "Europe/Asia (non-native; common naturalized weed)",
  habitat: "Lawns, disturbed soils, fields",
  bloomTime: "Very early spring",
  sun: "Full sun to part sun",
  soil: "Adaptable",
  water: "Low to medium",
  height: "4–12 in",
  spread: "Spreads by seed",
  uses: [
    "Early-season forage for emerging bees (in unmanaged areas)",
  ],
  pollinators: ["Early native bees"],
  hostFor: [],
  cautions: ["Non-native weed; often removed in lawns"],
  careNotes:
    "From a pollinator perspective, it’s valuable early forage. If you’re curating native-only spaces, you’d replace this with native spring ephemerals later.",
},

"Stachys byzantina": {
  friendly: true,
  commonName: "Lamb’s ear",
  nativeRange: "Middle East (non-native)",
  habitat: "Garden perennial; sunny beds with good drainage",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Well-drained; average to dry",
  water: "Low",
  height: "0.5–1.5 ft (flower spikes taller)",
  spread: "1–2 ft",
  uses: [
    "Soft-texture border plant",
    "Groundcover in sunny beds",
    "Pollinator support when flowering",
  ],
  pollinators: ["Bees"],
  hostFor: [],
  cautions: ["Foliage can rot in humid/wet conditions"],
  careNotes:
    "Needs drainage and airflow. Consider removing flower spikes if you want it for foliage only; leave spikes for pollinators.",
},

"Scutellaria lateriflora": {
  friendly: true,
  commonName: "Blue skullcap / Mad-dog skullcap",
  nativeRange: "Widespread across North America",
  habitat: "Moist woods, stream edges, wet meadows",
  bloomTime: "Summer (Jul–Sep)",
  sun: "Part sun to part shade",
  soil: "Moist to wet",
  water: "Medium to high",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Native herb gardens",
    "Rain garden edges",
    "Moist woodland pollinator plantings",
  ],
  pollinators: ["Native bees", "Bumblebees"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Great native mint-family plant for damp shade. Keep soil consistently moist for best flowering.",
},

"Scutellaria integrifolia": {
  friendly: true,
  commonName: "Helmet skullcap",
  nativeRange: "Eastern United States",
  habitat: "Open woods, woodland edges, meadows",
  bloomTime: "Summer (Jun–Aug)",
  sun: "Full sun to part sun",
  soil: "Well-drained; medium moisture",
  water: "Medium",
  height: "1–2.5 ft",
  spread: "1–2 ft",
  uses: [
    "Native borders",
    "Pollinator plantings with mint-family flowers",
  ],
  pollinators: ["Native bees", "Bumblebees", "Butterflies"],
  hostFor: [],
  cautions: [],
  careNotes:
    "A solid native alternative to non-native ornamentals—good structure, good bloom, good pollinator traffic.",
},

"Clinopodium vulgare": {
  friendly: true,
  commonName: "Wild basil",
  nativeRange: "Europe/Asia (non-native; naturalized)",
  habitat: "Dry open sites, roadsides",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Dry to medium; well-drained",
  water: "Low",
  height: "1–2 ft",
  spread: "1–2 ft",
  uses: [
    "Bee forage in rough areas",
    "Herbaceous borders (where appropriate)",
  ],
  pollinators: ["Bees", "Butterflies"],
  hostFor: [],
  cautions: ["Non-native; can spread in some regions"],
  careNotes:
    "If you want a stricter native list later, we can swap this for native Monarda/Pycnanthemum options you already have.",
},

"Lycopus americanus": {
  friendly: true,
  commonName: "American water horehound",
  nativeRange: "Widespread across North America",
  habitat: "Wetlands, stream edges, damp soils",
  bloomTime: "Summer",
  sun: "Full sun to part sun",
  soil: "Moist to wet",
  water: "High",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Rain gardens",
    "Wet meadow plantings",
    "Native herb layer for damp sites",
  ],
  pollinators: ["Native bees", "Beneficial flies"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Excellent native mint-family plant for wet sites. Let it naturalize where moisture stays consistent.",
},

"Teucrium chamaedrys": {
  friendly: true,
  commonName: "Wall germander",
  nativeRange: "Europe/West Asia (non-native)",
  habitat: "Garden perennial; sunny borders; tolerates heat",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Well-drained; average to dry",
  water: "Low to medium",
  height: "0.75–1.5 ft",
  spread: "1–2 ft",
  uses: [
    "Low hedge/edging plant",
    "Bee-friendly border plantings",
  ],
  pollinators: ["Bees"],
  hostFor: [],
  cautions: ["Non-native"],
  careNotes:
    "Shear after bloom to maintain shape. Great low structure plant if you want a tidy edge with pollinator value.",
},

"Teucrium canadense": {
  friendly: true,
  commonName: "Canada germander",
  nativeRange: "Eastern & central North America",
  habitat: "Moist meadows, stream edges, woodland margins",
  bloomTime: "Summer (Jul–Sep)",
  sun: "Full sun to part sun",
  soil: "Moist to medium",
  water: "Medium",
  height: "2–4 ft",
  spread: "2–3 ft",
  uses: [
    "Native pollinator borders",
    "Rain garden edges",
    "Meadow plantings",
  ],
  pollinators: ["Native bees", "Butterflies", "Beneficial flies"],
  hostFor: [],
  cautions: ["Can spread by rhizomes in moist soils"],
  careNotes:
    "A strong native mint-family pollinator plant. Use where it has room to form a patch, or thin runners yearly.",
},

"Prunella vulgaris": {
  friendly: true,
  commonName: "Self-heal",
  nativeRange: "Widespread (North America has native populations; also naturalized forms exist)",
  habitat: "Lawns, meadows, woodland edges; tolerant and low-growing",
  bloomTime: "Late spring through summer",
  sun: "Full sun to part shade",
  soil: "Adaptable; prefers medium moisture",
  water: "Low to medium",
  height: "4–12 in",
  spread: "1–2 ft",
  uses: [
    "Low pollinator groundcover",
    "Meadow lawns",
    "Understory edges",
  ],
  pollinators: ["Small native bees", "Bumblebees", "Butterflies"],
  hostFor: [],
  cautions: ["Can spread in lawns (often desirable if you allow flowering groundcovers)"],
  careNotes:
    "One of the best low, lawn-friendly pollinator plants. Mow less frequently if you want more flowers.",
},


  // ----------------------
// Fruits and berries important for bee forage
// ----------------------

"Vaccinium corymbosum": {
  friendly: true,
  commonName: "Highbush blueberry",
  nativeRange: "Eastern North America",
  habitat: "Woodland edges, bog margins, moist acidic soils",
  bloomTime: "Spring (Apr–May)",
  sun: "Full sun to part sun",
  soil: "Acidic (pH ~4.5–5.5), moist, well-drained, high organic matter",
  water: "Medium (consistent moisture improves fruit set)",
  height: "4–8 ft",
  spread: "4–6 ft",
  uses: [
    "Edible landscaping (berries)",
    "Native shrub borders",
    "Pollinator + wildlife plantings",
  ],
  pollinators: ["Native bees (especially bumblebees)", "Honey bees"],
  hostFor: [],
  cautions: ["Needs acidic soil—won’t thrive in alkaline ground without amendments"],
  careNotes:
    "Top bee plant in spring. Plant 2+ cultivars for better fruit set. Mulch with pine needles/bark to maintain acidity and moisture.",
},

"Vaccinium angustifolium": {
  friendly: true,
  commonName: "Lowbush blueberry",
  nativeRange: "Northeastern U.S. & Canada",
  habitat: "Open acidic barrens, sandy soils, pine edges",
  bloomTime: "Spring",
  sun: "Full sun",
  soil: "Acidic, sandy, well-drained",
  water: "Low to medium",
  height: "0.5–2 ft",
  spread: "2–4+ ft (colonizing)",
  uses: [
    "Edible groundcover",
    "Native low shrub layer",
    "Pollinator-friendly edible gardens",
  ],
  pollinators: ["Native bees (bumblebees)", "Honey bees"],
  hostFor: [],
  cautions: ["Requires acidic soil and sun; struggles in shade"],
  careNotes:
    "Great for groundcover-style blueberry patches. Mulch lightly and avoid heavy fertilizing (acid-loving plants only).",
},

"Fragaria x ananassa": {
  friendly: true,
  commonName: "Garden strawberry",
  nativeRange: "Hybrid (non-native lineage; widely cultivated)",
  habitat: "Garden plant; beds, containers, raised planters",
  bloomTime: "Spring (and sometimes again depending on variety)",
  sun: "Full sun",
  soil: "Rich, well-drained, evenly moist",
  water: "Medium",
  height: "6–10 in",
  spread: "1–2 ft (spreads by runners)",
  uses: [
    "Edible groundcover",
    "Raised bed fruit production",
    "Pollinator-supporting spring blooms",
  ],
  pollinators: ["Honey bees", "Native bees", "Hoverflies"],
  hostFor: [],
  cautions: ["Non-native hybrid", "Can be prone to rot in wet conditions"],
  careNotes:
    "Keep soil evenly moist and mulch to keep fruit clean. Allow some flowers early for pollinators, but manage runners if you want tidy beds.",
},

"Fragaria virginiana": {
  friendly: true,
  commonName: "Wild strawberry",
  nativeRange: "Widespread across North America",
  habitat: "Meadows, woodland edges, open lawns",
  bloomTime: "Spring to early summer",
  sun: "Full sun to part shade",
  soil: "Adaptable; best in well-drained soil with medium moisture",
  water: "Low to medium",
  height: "4–8 in",
  spread: "1–2+ ft (spreads by runners)",
  uses: [
    "Native groundcover",
    "Pollinator-friendly lawn alternative",
    "Edible landscaping (small berries)",
  ],
  pollinators: ["Small native bees", "Honey bees", "Hoverflies"],
  hostFor: [],
  cautions: ["Berries are small and often eaten quickly by wildlife"],
  careNotes:
    "Excellent native groundcover that flowers early. Great for ‘bee lawn’ style plantings if you mow less frequently during bloom.",
},

"Rubus idaeus": {
  friendly: true,
  commonName: "Red raspberry",
  nativeRange: "Europe/Asia (species), but cultivated widely; many North American raspberries exist too",
  habitat: "Garden bramble; full sun with good airflow",
  bloomTime: "Late spring to summer (varies by cultivar)",
  sun: "Full sun",
  soil: "Well-drained, rich soil",
  water: "Medium",
  height: "4–6 ft",
  spread: "3–6 ft (can sucker)",
  uses: [
    "Fruit production",
    "Hedgerow-style edible landscapes",
    "High-value bee forage",
  ],
  pollinators: ["Honey bees", "Native bees", "Bumblebees"],
  hostFor: [],
  cautions: ["Thorns on many varieties", "Can spread by suckers"],
  careNotes:
    "Raspberry flowers are a major bee resource. Prune canes correctly (depends on summer-bearing vs everbearing varieties).",
},

"Rubus fruticosus": {
  friendly: true,
  commonName: "Blackberry (European blackberry complex)",
  nativeRange: "Europe/Asia (non-native; many blackberries in North America are native species instead)",
  habitat: "Bramble thickets; edges and disturbed areas",
  bloomTime: "Late spring to summer",
  sun: "Full sun",
  soil: "Adaptable; best in well-drained soil",
  water: "Low to medium",
  height: "3–10 ft (depends on type)",
  spread: "Spreading/can form thickets",
  uses: [
    "Bee forage during bloom",
    "Fruit production (cultivars)",
    "Wildlife thickets",
  ],
  pollinators: ["Honey bees", "Native bees", "Butterflies"],
  hostFor: [],
  cautions: ["Non-native forms can be invasive", "Thorns", "Aggressive spread"],
  careNotes:
    "Pollinator value is high, but for a native-forward list, native Rubus species are better choices (you already have one below).",
},

"Rubus allegheniensis": {
  friendly: true,
  commonName: "Allegheny blackberry",
  nativeRange: "Eastern North America",
  habitat: "Woodland edges, thickets, open disturbed sites",
  bloomTime: "Late spring to early summer",
  sun: "Full sun to part sun",
  soil: "Adaptable; prefers well-drained",
  water: "Low to medium",
  height: "4–10 ft",
  spread: "Forms thickets",
  uses: [
    "Native hedgerows",
    "Pollinator + wildlife habitat",
    "Fruit for birds and mammals",
  ],
  pollinators: ["Honey bees", "Native bees", "Bumblebees", "Butterflies"],
  hostFor: [],
  cautions: ["Thorns", "Spreads and forms thickets"],
  careNotes:
    "A native bramble with strong ecological value. Best used in naturalized edges or hedgerows rather than small formal gardens.",
},

"Malus domestica": {
  friendly: true,
  commonName: "Domestic apple",
  nativeRange: "Central Asia (non-native in North America; widely cultivated)",
  habitat: "Orchards and home gardens",
  bloomTime: "Spring (Apr–May)",
  sun: "Full sun",
  soil: "Well-drained, fertile",
  water: "Medium",
  height: "10–25+ ft (depends on rootstock)",
  spread: "10–25 ft",
  uses: [
    "Fruit production",
    "Spring bee forage",
    "Edible landscaping",
  ],
  pollinators: ["Honey bees", "Native bees"],
  hostFor: [],
  cautions: ["Most varieties require cross-pollination with another apple/crabapple variety"],
  careNotes:
    "Apple blossoms are a major spring nectar/pollen event. Plant compatible varieties and avoid spraying insecticides during bloom.",
},

"Pyrus communis": {
  friendly: true,
  commonName: "European pear",
  nativeRange: "Europe/West Asia (non-native; widely cultivated)",
  habitat: "Orchards and home gardens",
  bloomTime: "Spring",
  sun: "Full sun",
  soil: "Well-drained; fertile",
  water: "Medium",
  height: "12–30 ft",
  spread: "12–25 ft",
  uses: [
    "Fruit production",
    "Spring bee forage",
  ],
  pollinators: ["Honey bees", "Native bees"],
  hostFor: [],
  cautions: ["Often needs a second variety for pollination"],
  careNotes:
    "Pear blooms help spring pollinators. Like apples, avoid insecticide spraying during bloom.",
},

"Prunus persica": {
  friendly: true,
  commonName: "Peach",
  nativeRange: "China (non-native; widely cultivated)",
  habitat: "Orchards and sunny home gardens",
  bloomTime: "Early spring (often before many flowers)",
  sun: "Full sun",
  soil: "Well-drained; fertile",
  water: "Medium",
  height: "8–20 ft",
  spread: "8–15 ft",
  uses: [
    "Fruit production",
    "Early-season bee forage",
  ],
  pollinators: ["Honey bees", "Native bees"],
  hostFor: [],
  cautions: ["Early bloom can be damaged by late frosts"],
  careNotes:
    "Peach blossoms can be an important early resource. Site trees in full sun with good airflow and avoid spraying during bloom.",
},


  // ----------------------
// Gourds, vines, and field crops with pollinator value
// ----------------------

"Cucurbita pepo": {
  friendly: true,
  commonName: "Squash / Pumpkin (various cultivars)",
  nativeRange: "North America (domesticated species)",
  habitat: "Garden beds, farms, raised beds",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Rich, well-drained, high organic matter",
  water: "Medium to high (consistent moisture improves yield)",
  height: "Vining or bush form (sprawling 3–10+ ft)",
  spread: "6–15+ ft (vines)",
  uses: [
    "Vegetable production",
    "Pollinator-supporting food gardens",
  ],
  pollinators: [
    "Squash bees (Peponapis spp.)",
    "Honey bees",
    "Bumblebees"
  ],
  hostFor: ["Specialist squash bees (nest in nearby soil)"],
  cautions: ["Requires pollination for fruit set"],
  careNotes:
    "Flowers open early in the morning and close by midday. Avoid spraying during bloom to protect squash bees.",
},

"Cucurbita maxima": {
  friendly: true,
  commonName: "Winter squash",
  nativeRange: "South America (domesticated crop)",
  habitat: "Garden beds and farms",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Rich, well-drained",
  water: "Medium to high",
  height: "Sprawling vine",
  spread: "6–15+ ft",
  uses: [
    "Food crop",
    "Pollinator-supporting vegetable gardens"
  ],
  pollinators: ["Squash bees", "Honey bees", "Bumblebees"],
  hostFor: ["Squash bees"],
  cautions: ["Heavy feeder; needs space"],
  careNotes:
    "Like other squash, depends heavily on bees. Plant near native flowering plants to support pollinator populations.",
},

"Cucurbita moschata": {
  friendly: true,
  commonName: "Butternut squash",
  nativeRange: "Central/South America (domesticated crop)",
  habitat: "Garden and farm settings",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Rich, well-drained",
  water: "Medium to high",
  height: "Vining habit",
  spread: "6–15+ ft",
  uses: [
    "Food production",
    "Pollinator-dependent vegetable crop"
  ],
  pollinators: ["Squash bees", "Honey bees", "Bumblebees"],
  hostFor: ["Squash bees"],
  cautions: ["Requires pollination for proper fruit development"],
  careNotes:
    "Hand-pollination may be needed if pollinator populations are low. Avoid insecticides during flowering.",
},

"Cucumis sativus": {
  friendly: true,
  commonName: "Cucumber",
  nativeRange: "South Asia (non-native crop)",
  habitat: "Garden beds, trellised vines",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Well-drained, fertile",
  water: "Medium",
  height: "Vining or bush type",
  spread: "3–8 ft",
  uses: [
    "Vegetable production",
    "Pollinator-supportive gardens"
  ],
  pollinators: ["Honey bees", "Native bees", "Bumblebees"],
  hostFor: [],
  cautions: ["Many varieties need insect pollination; some hybrids are parthenocarpic"],
  careNotes:
    "Encourage bees by planting nearby flowers. Male and female flowers must both be pollinated for fruit in most varieties.",
},

"Citrullus lanatus": {
  friendly: true,
  commonName: "Watermelon",
  nativeRange: "Africa (non-native crop)",
  habitat: "Warm-season gardens and farms",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Well-drained, fertile",
  water: "Medium to high",
  height: "Sprawling vine",
  spread: "6–15+ ft",
  uses: [
    "Fruit production",
    "Bee-dependent crop"
  ],
  pollinators: ["Honey bees", "Native bees", "Bumblebees"],
  hostFor: [],
  cautions: ["Requires pollination for full fruit development"],
  careNotes:
    "Pollination directly impacts fruit size and sweetness. Plant companion nectar plants to increase bee visits.",
},

"Helianthus annuus": {
  friendly: true,
  commonName: "Common sunflower",
  nativeRange: "North America",
  habitat: "Fields, gardens, farms",
  bloomTime: "Summer to early fall",
  sun: "Full sun",
  soil: "Adaptable; prefers well-drained",
  water: "Low to medium",
  height: "3–12 ft",
  spread: "1–3 ft",
  uses: [
    "Cut flowers",
    "Wildlife gardens",
    "Seed production",
    "Pollinator magnet plant"
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies", "Beetles"],
  hostFor: ["Various caterpillars and seed-feeding insects"],
  cautions: ["Tall varieties may require staking"],
  careNotes:
    "Single-flower varieties provide better pollinator access than heavily double-flowered ornamental types.",
},

"Fagopyrum esculentum": {
  friendly: true,
  commonName: "Buckwheat",
  nativeRange: "Central Asia (non-native crop)",
  habitat: "Cover crop fields, garden beds",
  bloomTime: "Summer (blooms quickly after planting)",
  sun: "Full sun",
  soil: "Poor to average soils tolerated",
  water: "Low to medium",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Cover crop",
    "Quick nectar source",
    "Soil improvement"
  ],
  pollinators: ["Honey bees", "Native bees", "Hoverflies"],
  hostFor: [],
  cautions: ["Not frost tolerant; short growing cycle"],
  careNotes:
    "One of the fastest ways to add nectar to a garden. Blooms within weeks of planting.",
},

"Borago officinalis": {
  friendly: true,
  commonName: "Borage",
  nativeRange: "Mediterranean (non-native)",
  habitat: "Garden annual; thrives in sunny beds",
  bloomTime: "Summer through fall",
  sun: "Full sun",
  soil: "Well-drained; average soil",
  water: "Low to medium",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Pollinator herb gardens",
    "Companion plant in vegetable beds"
  ],
  pollinators: ["Honey bees", "Bumblebees", "Native bees"],
  hostFor: [],
  cautions: ["Self-seeds readily"],
  careNotes:
    "Blooms continuously and produces abundant nectar. Let some plants reseed for ongoing pollinator support.",
},

"Trifolium pratense": {
  friendly: true,
  commonName: "Red clover",
  nativeRange: "Europe/Asia (non-native; widely naturalized)",
  habitat: "Fields, lawns, pastures",
  bloomTime: "Late spring through summer",
  sun: "Full sun to part sun",
  soil: "Adaptable; prefers well-drained",
  water: "Low to medium",
  height: "1–2 ft",
  spread: "1–2 ft",
  uses: [
    "Pasture crop",
    "Pollinator-supportive lawns",
    "Nitrogen-fixing cover crop"
  ],
  pollinators: ["Bumblebees", "Honey bees"],
  hostFor: [],
  cautions: ["Non-native; can spread in lawns"],
  careNotes:
    "Long-tubed flowers especially benefit bumblebees. Often used in bee lawns as a nectar source.",
},

"Trifolium repens": {
  friendly: true,
  commonName: "White clover",
  nativeRange: "Europe/Asia (non-native; widely naturalized)",
  habitat: "Lawns, fields, pastures",
  bloomTime: "Late spring through summer",
  sun: "Full sun to part sun",
  soil: "Adaptable; tolerates compacted soils",
  water: "Low to medium",
  height: "4–12 in",
  spread: "Spreading groundcover",
  uses: [
    "Bee lawn component",
    "Nitrogen-fixing groundcover",
    "Pasture plant"
  ],
  pollinators: ["Honey bees", "Native bees", "Hoverflies"],
  hostFor: [],
  cautions: ["Non-native; spreads easily"],
  careNotes:
    "Excellent low-growing nectar source in lawns. Mow less frequently to allow flowers for pollinators.",
},


 // ----------------------
// Additional Beneficial Non-Native Plants
// ----------------------

"Knautia macedonica": {
  friendly: true,
  commonName: "Macedonian scabious",
  nativeRange: "Balkans (non-native in North America)",
  habitat: "Garden perennial for sunny borders; thrives with airflow and drainage",
  bloomTime: "Summer through fall (very long-blooming)",
  sun: "Full sun",
  soil: "Well-drained; average to moderately fertile",
  water: "Low to medium",
  height: "2–4 ft",
  spread: "1–2 ft",
  uses: [
    "Long-blooming pollinator borders",
    "Cut flowers",
    "Cottage gardens",
  ],
  pollinators: ["Bumblebees", "Honey bees", "Native bees", "Butterflies"],
  hostFor: [],
  cautions: ["Non-native"],
  careNotes:
    "Deadhead for nonstop bloom. One of those plants that stays busy with bees all day when in peak flower.",
},

"Scabiosa atropurpurea": {
  friendly: true,
  commonName: "Pincushion flower",
  nativeRange: "Mediterranean region (non-native in North America)",
  habitat: "Often grown as an annual or short-lived perennial; sunny beds",
  bloomTime: "Late spring through fall (with deadheading)",
  sun: "Full sun",
  soil: "Well-drained; average",
  water: "Low to medium",
  height: "1–3 ft",
  spread: "1–1.5 ft",
  uses: [
    "Continuous nectar source",
    "Cut flowers",
    "Pollinator borders",
  ],
  pollinators: ["Butterflies", "Native bees", "Honey bees"],
  hostFor: [],
  cautions: ["Non-native", "May self-seed in mild climates"],
  careNotes:
    "Deadhead regularly for a long season. In colder climates it’s commonly treated as an annual.",
},

"Lathyrus latifolius": {
  friendly: true,
  commonName: "Perennial sweet pea",
  nativeRange: "Europe (non-native in North America)",
  habitat: "Climbing vine for fences/trellises; sun to part sun",
  bloomTime: "Early to mid-summer (sometimes longer with pruning)",
  sun: "Full sun to part sun",
  soil: "Well-drained; average garden soil",
  water: "Medium",
  height: "6–10 ft (vine)",
  spread: "3–6 ft",
  uses: [
    "Trellis/fence vine",
    "Bee-friendly vertical gardening",
    "Cut flowers",
  ],
  pollinators: ["Bumblebees", "Large native bees"],
  hostFor: [],
  cautions: ["Non-native", "Can spread via rhizomes and seed in some areas"],
  careNotes:
    "Give it support and cut back after flowering to control spread. Like other pea-family flowers, it’s especially good for bumblebees.",
},

"Polemonium caeruleum": {
  friendly: true,
  commonName: "Jacob’s ladder (ornamental)",
  nativeRange: "Europe/Asia (non-native in North America)",
  habitat: "Cooler gardens; prefers consistent moisture and part shade",
  bloomTime: "Spring to early summer",
  sun: "Part sun to part shade",
  soil: "Moist, rich, well-drained",
  water: "Medium",
  height: "1–2.5 ft",
  spread: "1–1.5 ft",
  uses: [
    "Woodland-style gardens",
    "Early-season pollinator support in shade",
  ],
  pollinators: ["Native bees", "Bumblebees"],
  hostFor: [],
  cautions: ["Non-native", "Struggles in hot, dry conditions"],
  careNotes:
    "Best in cooler climates or morning sun/afternoon shade. Keep evenly moist for best bloom and foliage quality.",
},

"Anchusa azurea": {
  friendly: true,
  commonName: "Italian bugloss",
  nativeRange: "Mediterranean/Europe (non-native in North America)",
  habitat: "Sunny borders; drought tolerant once established",
  bloomTime: "Late spring through summer",
  sun: "Full sun",
  soil: "Well-drained; sandy/gravelly ideal",
  water: "Low to medium",
  height: "3–5 ft",
  spread: "2–3 ft",
  uses: [
    "High-nectar bee plant",
    "Bold blue color in borders",
    "Cottage gardens",
  ],
  pollinators: ["Honey bees", "Bumblebees", "Native bees"],
  hostFor: [],
  cautions: ["Non-native", "Can self-seed", "Tall—may need support"],
  careNotes:
    "If you want ‘electric blue + nonstop bees,’ this is it. Give it drainage and space; deadhead for extended flowering.",
},

"Cerinthe major": {
  friendly: true,
  commonName: "Honeywort",
  nativeRange: "Mediterranean (non-native in North America)",
  habitat: "Cool-season annual in many climates; great in beds and containers",
  bloomTime: "Spring through early summer (can extend in mild climates)",
  sun: "Full sun to part sun",
  soil: "Well-drained; average",
  water: "Low to medium",
  height: "1–2.5 ft",
  spread: "1–2 ft",
  uses: [
    "Early nectar plantings",
    "Container pollinator gardens",
    "Companion plant in beds",
  ],
  pollinators: ["Honey bees", "Bumblebees", "Native bees"],
  hostFor: [],
  cautions: ["Non-native", "May self-seed"],
  careNotes:
    "Often blooms when pollinators are ramping up in spring. Let it self-seed for easy repeat performance.",
},

"Nigella damascena": {
  friendly: true,
  commonName: "Love-in-a-mist",
  nativeRange: "Southern Europe/North Africa (non-native in North America)",
  habitat: "Annual for garden beds; prefers cool-season growth",
  bloomTime: "Spring to early summer",
  sun: "Full sun",
  soil: "Well-drained; average",
  water: "Low to medium",
  height: "1–2 ft",
  spread: "1–1.5 ft",
  uses: [
    "Spring pollinator beds",
    "Cut flowers / dried seed pods",
    "Wildflower-style gardens",
  ],
  pollinators: ["Small native bees", "Hoverflies"],
  hostFor: [],
  cautions: ["Non-native", "Self-seeds readily"],
  careNotes:
    "Direct sow for best results. Pollinator value is solid in spring, and the seed pods add a second ‘season’ of interest.",
},

"Phacelia campanularia": {
  friendly: true,
  commonName: "California bluebell",
  nativeRange: "California (native to U.S. West; not native to most of North America)",
  habitat: "Dry open sites; desert and Mediterranean climates; spring wildflower",
  bloomTime: "Spring",
  sun: "Full sun",
  soil: "Well-drained; sandy/gravelly",
  water: "Low",
  height: "6–12 in",
  spread: "0.5–1 ft",
  uses: [
    "Bee support in spring",
    "Wildflower mixes for dry sites",
    "Low borders in sunny beds",
  ],
  pollinators: ["Native bees (high use)", "Honey bees"],
  hostFor: [],
  cautions: ["Regionally native (California); treat as non-native outside its native range"],
  careNotes:
    "A bee favorite in spring. Best direct-seeded in fall/winter in mild climates or early spring in cooler zones.",
},

"Phacelia tanacetifolia": {
  friendly: true,
  commonName: "Lacy phacelia",
  nativeRange: "California (native to U.S. West; widely used as a cover crop)",
  habitat: "Cover crop fields, gardens; fast-growing annual",
  bloomTime: "Spring to summer (blooms quickly after sowing)",
  sun: "Full sun",
  soil: "Adaptable; prefers well-drained",
  water: "Low to medium",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Cover crop / soil improvement",
    "One of the best short-term nectar boosts",
    "Bee forage plantings",
  ],
  pollinators: ["Honey bees (top nectar plant)", "Native bees", "Hoverflies"],
  hostFor: [],
  cautions: ["Regionally native (California); treat as non-native outside native range"],
  careNotes:
    "If someone wants a quick ‘pollinator rescue patch,’ this is a powerhouse. Sow in waves for continuous bloom.",
},

"Lobularia maritima": {
  friendly: true,
  commonName: "Sweet alyssum",
  nativeRange: "Mediterranean (non-native in North America)",
  habitat: "Low annual for edging, containers, and between garden rows",
  bloomTime: "Spring through fall (especially strong in cool weather)",
  sun: "Full sun to part sun",
  soil: "Well-drained; average",
  water: "Low to medium",
  height: "4–10 in",
  spread: "8–18 in",
  uses: [
    "Edging plant in pollinator beds",
    "Companion plant in vegetable gardens",
    "Continuous small-flower nectar source",
  ],
  pollinators: ["Small native bees", "Hoverflies", "Honey bees"],
  hostFor: [],
  cautions: ["Non-native", "May reseed in mild climates"],
  careNotes:
    "This is a stealth MVP for hoverflies (which also eat aphids). Plant along veggie beds for both pollinators and beneficial insects.",
},


 // ----------------------
// Yarrow, phlox, and other mixed ornamentals
// ----------------------

"Achillea millefolium": {
  friendly: true,
  commonName: "Common yarrow",
  nativeRange: "Widespread across North America, Europe, and Asia",
  habitat: "Meadows, roadsides, dry fields",
  bloomTime: "Late spring through summer",
  sun: "Full sun",
  soil: "Well-drained; tolerant of poor soils",
  water: "Low",
  height: "1–3 ft",
  spread: "1–2 ft (spreads by rhizomes)",
  uses: [
    "Pollinator borders",
    "Meadow plantings",
    "Medicinal herb gardens"
  ],
  pollinators: ["Native bees", "Honey bees", "Hoverflies", "Beetles"],
  hostFor: [],
  cautions: ["Can spread aggressively in ideal conditions"],
  careNotes:
    "Flat flower clusters provide landing pads for small pollinators. Cut back after bloom to encourage rebloom.",
},

"Achillea filipendulina": {
  friendly: true,
  commonName: "Fernleaf yarrow",
  nativeRange: "Caucasus/Middle East (non-native in North America)",
  habitat: "Sunny borders and ornamental beds",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Well-drained",
  water: "Low to medium",
  height: "3–4 ft",
  spread: "1–2 ft",
  uses: [
    "Tall back-of-border plant",
    "Cut flowers",
    "Pollinator gardens"
  ],
  pollinators: ["Bees", "Hoverflies", "Butterflies"],
  hostFor: [],
  cautions: ["Non-native"],
  careNotes:
    "Tall, bright yellow umbels are extremely visible to pollinators. Divide every few years to maintain vigor.",
},

"Phlox paniculata": {
  friendly: true,
  commonName: "Garden phlox",
  nativeRange: "Eastern North America",
  habitat: "Woodland edges, garden beds",
  bloomTime: "Mid to late summer",
  sun: "Full sun to part sun",
  soil: "Moist, well-drained",
  water: "Medium",
  height: "2–4 ft",
  spread: "1–2 ft",
  uses: [
    "Fragrant borders",
    "Butterfly gardens",
    "Cut flowers"
  ],
  pollinators: ["Butterflies", "Bees", "Hummingbirds"],
  hostFor: [],
  cautions: ["Susceptible to powdery mildew in poor airflow"],
  careNotes:
    "Choose mildew-resistant cultivars and provide airflow. Excellent mid-season nectar source.",
},

"Phlox subulata": {
  friendly: true,
  commonName: "Creeping phlox",
  nativeRange: "Eastern & central North America",
  habitat: "Rock gardens, slopes, sunny groundcover",
  bloomTime: "Early spring",
  sun: "Full sun",
  soil: "Well-drained; sandy or rocky ideal",
  water: "Low",
  height: "4–6 in",
  spread: "1–2 ft",
  uses: [
    "Groundcover",
    "Early-season pollinator support",
    "Erosion control"
  ],
  pollinators: ["Small native bees", "Early butterflies"],
  hostFor: [],
  cautions: [],
  careNotes:
    "One of the earliest spring nectar sources in sunny landscapes. Shear lightly after bloom.",
},

"Phlox divaricata": {
  friendly: true,
  commonName: "Wild blue phlox",
  nativeRange: "Eastern North America",
  habitat: "Woodlands and shaded slopes",
  bloomTime: "Spring",
  sun: "Part shade to shade",
  soil: "Moist, rich, well-drained",
  water: "Medium",
  height: "1–1.5 ft",
  spread: "1–2 ft",
  uses: [
    "Woodland pollinator gardens",
    "Native shade plantings"
  ],
  pollinators: ["Native bees", "Butterflies"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Important early woodland nectar source before many summer plants begin blooming.",
},

"Digitalis purpurea": {
  friendly: true,
  commonName: "Foxglove",
  nativeRange: "Europe (non-native in North America)",
  habitat: "Garden beds, cottage gardens",
  bloomTime: "Late spring to early summer",
  sun: "Full sun to part shade",
  soil: "Moist, well-drained",
  water: "Medium",
  height: "2–5 ft",
  spread: "1–2 ft",
  uses: [
    "Cottage-style pollinator gardens",
    "Vertical accent planting"
  ],
  pollinators: ["Bumblebees (primary)", "Long-tongued bees"],
  hostFor: [],
  cautions: ["Toxic if ingested", "Non-native"],
  careNotes:
    "Biennial in many climates. Bumblebees are especially well-adapted to its tubular flowers.",
},

"Campanula rotundifolia": {
  friendly: true,
  commonName: "Harebell",
  nativeRange: "Northern North America, Europe, Asia",
  habitat: "Meadows, rocky slopes",
  bloomTime: "Summer",
  sun: "Full sun to part sun",
  soil: "Well-drained",
  water: "Low to medium",
  height: "1–2 ft",
  spread: "1 ft",
  uses: [
    "Naturalized meadow plantings",
    "Rock gardens"
  ],
  pollinators: ["Bees", "Small native pollinators"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Delicate nodding bells provide nectar in midsummer when many other species slow down.",
},

"Geranium maculatum": {
  friendly: true,
  commonName: "Wild geranium",
  nativeRange: "Eastern North America",
  habitat: "Woodland edges, shaded meadows",
  bloomTime: "Spring",
  sun: "Part sun to shade",
  soil: "Moist, rich, well-drained",
  water: "Medium",
  height: "1–2 ft",
  spread: "1–2 ft",
  uses: [
    "Native woodland gardens",
    "Spring pollinator support"
  ],
  pollinators: ["Native bees"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Excellent early-season nectar and pollen plant in partially shaded landscapes.",
},

"Polemonium reptans": {
  friendly: true,
  commonName: "Jacob’s ladder (native)",
  nativeRange: "Eastern North America",
  habitat: "Woodlands and shaded slopes",
  bloomTime: "Spring",
  sun: "Part shade",
  soil: "Moist, rich",
  water: "Medium",
  height: "1–1.5 ft",
  spread: "1–2 ft",
  uses: [
    "Shade pollinator gardens",
    "Woodland native plantings"
  ],
  pollinators: ["Native bees"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Pairs well with other spring ephemerals for layered woodland nectar support.",
},

"Helenium autumnale": {
  friendly: true,
  commonName: "Sneezeweed",
  nativeRange: "North America",
  habitat: "Moist meadows and garden beds",
  bloomTime: "Late summer through fall",
  sun: "Full sun",
  soil: "Moist, well-drained",
  water: "Medium to high",
  height: "3–5 ft",
  spread: "2–3 ft",
  uses: [
    "Late-season pollinator plantings",
    "Rain gardens"
  ],
  pollinators: ["Bees", "Butterflies"],
  hostFor: [],
  cautions: ["Can be short-lived without division"],
  careNotes:
    "Important late-season nectar source when many summer blooms fade.",
},

// ----------------------
// Extra Milkweeds
// ----------------------

"Asclepias exaltata": {
  friendly: true,
  commonName: "Poke milkweed",
  nativeRange: "Eastern North America",
  habitat: "Woodland edges and partial shade",
  bloomTime: "Late spring to summer",
  sun: "Part sun",
  soil: "Moist, well-drained",
  water: "Medium",
  height: "3–6 ft",
  spread: "2–3 ft",
  uses: ["Woodland monarch habitat"],
  pollinators: ["Monarchs", "Native bees"],
  hostFor: ["Monarch caterpillars"],
  cautions: [],
  careNotes:
    "A shade-tolerant milkweed that expands monarch habitat beyond full-sun prairie sites.",
},

"Asclepias sullivantii": {
  friendly: true,
  commonName: "Sullivant’s milkweed",
  nativeRange: "Midwestern United States",
  habitat: "Tallgrass prairie remnants",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Moist to mesic prairie soils",
  water: "Medium",
  height: "3–4 ft",
  spread: "1–2 ft",
  uses: ["Prairie restoration"],
  pollinators: ["Monarchs", "Native bees"],
  hostFor: ["Monarch caterpillars"],
  cautions: ["Less common; avoid wild collection"],
  careNotes:
    "High ecological value prairie milkweed for Midwest regions.",
},

"Asclepias curassavica": {
  friendly: true,
  commonName: "Tropical milkweed",
  nativeRange: "Central & South America (non-native in most U.S.)",
  habitat: "Warm-climate gardens",
  bloomTime: "Long bloom season in warm areas",
  sun: "Full sun",
  soil: "Well-drained",
  water: "Medium",
  height: "2–4 ft",
  spread: "1–2 ft",
  uses: ["Pollinator gardens in frost-free climates"],
  pollinators: ["Monarchs", "Bees"],
  hostFor: ["Monarch caterpillars"],
  cautions: [
    "Non-native",
    "May disrupt monarch migration patterns in warm regions"
  ],
  careNotes:
    "In warm climates, cut back annually to reduce disease buildup in monarch populations.",
},

 // ----------------------
// Prairie & Meadow Perennials
// ----------------------

"Amorpha canescens": {
  friendly: true,
  commonName: "Leadplant",
  nativeRange: "Central & eastern North America (prairie regions)",
  habitat: "Dry prairies, savannas, open grasslands",
  bloomTime: "Early to mid-summer",
  sun: "Full sun",
  soil: "Well-drained; sandy/rocky; tolerant of poor soils",
  water: "Low",
  height: "1–3 ft",
  spread: "2–4 ft",
  uses: [
    "Prairie restorations",
    "Native pollinator plantings",
    "Nitrogen-fixing soil support"
  ],
  pollinators: ["Native bees (very high value)", "Bumblebees", "Butterflies"],
  hostFor: ["Specialist native bees (legume-associated)"],
  cautions: ["Slow to establish the first year or two"],
  careNotes:
    "A true prairie keystone plant—deep roots improve soil and drought resilience. Avoid rich fertilizer; it prefers lean conditions.",
},

"Amorpha fruticosa": {
  friendly: true,
  commonName: "False indigo bush",
  nativeRange: "Central & eastern North America",
  habitat: "Riverbanks, wet thickets, floodplains",
  bloomTime: "Late spring to early summer",
  sun: "Full sun to part sun",
  soil: "Moist to wet; tolerant of periodic flooding",
  water: "Medium to high",
  height: "6–12 ft",
  spread: "6–10 ft",
  uses: [
    "Riparian restoration",
    "Rain garden edges (large sites)",
    "Wildlife habitat shrub"
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies"],
  hostFor: ["Native bees (generalist)", "Potential legume-associated insects"],
  cautions: ["Can spread aggressively in some regions; best for managed natural areas"],
  careNotes:
    "Excellent nectar shrub for wet sites. Use where it can form a thicket or be maintained with pruning.",
},

"Baptisia australis": {
  friendly: true,
  commonName: "Blue wild indigo",
  nativeRange: "Central & eastern United States",
  habitat: "Prairies, open woods, sunny slopes",
  bloomTime: "Spring to early summer",
  sun: "Full sun",
  soil: "Well-drained; tolerant once established",
  water: "Low to medium",
  height: "3–5 ft",
  spread: "3–4 ft",
  uses: [
    "Long-lived native border plant",
    "Prairie-style gardens",
    "Nitrogen-fixing support"
  ],
  pollinators: ["Bumblebees (primary)", "Large native bees"],
  hostFor: ["Legume-associated insects"],
  cautions: ["Deep taproot—does not like being transplanted once mature"],
  careNotes:
    "A powerhouse early-season bumblebee plant. Plant it where you want it long term and leave it alone.",
},

"Baptisia alba": {
  friendly: true,
  commonName: "White wild indigo",
  nativeRange: "Eastern United States",
  habitat: "Open woods, prairie edges, dry to mesic sites",
  bloomTime: "Late spring to early summer",
  sun: "Full sun",
  soil: "Well-drained; adaptable",
  water: "Low to medium",
  height: "3–5 ft",
  spread: "2–4 ft",
  uses: [
    "Native pollinator borders",
    "Prairie plantings",
    "Long-lived ornamental structure"
  ],
  pollinators: ["Bumblebees", "Large native bees"],
  hostFor: ["Legume-associated insects"],
  cautions: ["Slow first-year growth"],
  careNotes:
    "Same ‘plant once, enjoy for years’ vibe as B. australis. Leave seed pods for winter interest or trim for a cleaner look.",
},

"Baptisia tinctoria": {
  friendly: true,
  commonName: "Yellow wild indigo",
  nativeRange: "Eastern North America",
  habitat: "Dry open woods, sandy fields, barrens",
  bloomTime: "Early to mid-summer",
  sun: "Full sun",
  soil: "Dry, sandy, well-drained",
  water: "Low",
  height: "1–3 ft",
  spread: "2–3 ft",
  uses: [
    "Dry prairie gardens",
    "Native meadows",
    "Pollinator habitat on lean soils"
  ],
  pollinators: ["Native bees", "Bumblebees"],
  hostFor: ["Specialist bees (legume-associated)"],
  cautions: [],
  careNotes:
    "Great option for sandy, dry sites where other perennials struggle. High native bee value on poor soils.",
},

"Dalea purpurea": {
  friendly: true,
  commonName: "Purple prairie clover",
  nativeRange: "Central North America (prairie regions)",
  habitat: "Dry prairies and open grasslands",
  bloomTime: "Mid-summer",
  sun: "Full sun",
  soil: "Well-drained; sandy or gravelly",
  water: "Low",
  height: "1–2.5 ft",
  spread: "1–2 ft",
  uses: [
    "Prairie restoration",
    "Native pollinator meadows",
    "Nitrogen-fixing plantings"
  ],
  pollinators: ["Native bees (extremely high value)", "Bumblebees", "Butterflies"],
  hostFor: ["Specialist native bees (prairie clover associates)"],
  cautions: [],
  careNotes:
    "One of the best prairie nectar plants for native bees. Handles drought well once established.",
},

"Dalea candida": {
  friendly: true,
  commonName: "White prairie clover",
  nativeRange: "Central North America",
  habitat: "Dry prairies and open grasslands",
  bloomTime: "Mid-summer",
  sun: "Full sun",
  soil: "Well-drained; lean soils preferred",
  water: "Low",
  height: "1–2 ft",
  spread: "1–2 ft",
  uses: [
    "Prairie meadows",
    "Native pollinator restoration",
    "Nitrogen-fixing support"
  ],
  pollinators: ["Native bees", "Bumblebees", "Butterflies"],
  hostFor: ["Specialist bees (legume-associated)"],
  cautions: [],
  careNotes:
    "Same pollinator value class as purple prairie clover, just a different color profile. Excellent in prairie seed mixes.",
},

"Vernonia fasciculata": {
  friendly: true,
  commonName: "Prairie ironweed",
  nativeRange: "Central & upper Midwestern United States",
  habitat: "Wet prairies, moist meadows, ditches",
  bloomTime: "Late summer to fall",
  sun: "Full sun",
  soil: "Moist; tolerant of heavy clay",
  water: "Medium to high",
  height: "3–5 ft",
  spread: "2–3 ft",
  uses: [
    "Late-season pollinator meadows",
    "Rain gardens (large scale)",
    "Butterfly gardens"
  ],
  pollinators: ["Butterflies", "Native bees", "Honey bees"],
  hostFor: ["Some native caterpillars (generalist meadow habitat support)"],
  cautions: ["Can spread and form colonies"],
  careNotes:
    "A late-season nectar firehose. Plant with asters/goldenrods for an end-of-season pollinator buffet.",
},

"Vernonia noveboracensis": {
  friendly: true,
  commonName: "New York ironweed",
  nativeRange: "Eastern United States",
  habitat: "Moist meadows, stream edges, wetlands",
  bloomTime: "Late summer to fall",
  sun: "Full sun",
  soil: "Moist to wet; clay tolerant",
  water: "Medium to high",
  height: "4–7 ft",
  spread: "2–4 ft",
  uses: [
    "Wet meadow plantings",
    "Butterfly habitat gardens",
    "Late-season pollinator support"
  ],
  pollinators: ["Butterflies", "Native bees", "Honey bees"],
  hostFor: [],
  cautions: ["Very tall—can flop without support in rich soil"],
  careNotes:
    "If you want a tall native plant that stays covered in butterflies late season, this is a staple.",
},

"Cirsium discolor": {
  friendly: true,
  commonName: "Field thistle (native)",
  nativeRange: "Eastern & central North America",
  habitat: "Open fields, prairie edges, disturbed soils",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Adaptable; prefers well-drained",
  water: "Low to medium",
  height: "3–6 ft",
  spread: "2–3 ft",
  uses: [
    "Native meadow restoration",
    "Pollinator habitat (high nectar/pollen)",
    "Bird support (seeds for finches)"
  ],
  pollinators: ["Bumblebees", "Native bees", "Butterflies"],
  hostFor: ["Painted lady and other butterflies (varies by region)"],
  cautions: ["Spiny—place away from paths", "Often mistaken for invasive thistles"],
  careNotes:
    "Native thistles are pollinator gold. The key is keeping invasives out while allowing natives where appropriate.",
},

"Cirsium altissimum": {
  friendly: true,
  commonName: "Tall thistle (native)",
  nativeRange: "Central & eastern North America",
  habitat: "Prairie edges, open woods, disturbed sites",
  bloomTime: "Late summer to fall",
  sun: "Full sun to part sun",
  soil: "Adaptable; medium moisture",
  water: "Low to medium",
  height: "4–10 ft",
  spread: "2–3 ft",
  uses: [
    "Late-season pollinator habitat",
    "Native meadow plantings",
    "Bird seed support"
  ],
  pollinators: ["Native bees", "Bumblebees", "Butterflies"],
  hostFor: [],
  cautions: ["Very tall; spiny"],
  careNotes:
    "One of the best late-season native nectar plants. Great for naturalized edges and restoration sites.",
},

"Eryngium yuccifolium": {
  friendly: true,
  commonName: "Rattlesnake master",
  nativeRange: "Central & eastern North America",
  habitat: "Prairies, savannas, dry open ground",
  bloomTime: "Mid to late summer",
  sun: "Full sun",
  soil: "Well-drained; drought tolerant once established",
  water: "Low to medium",
  height: "3–5 ft",
  spread: "2–3 ft",
  uses: [
    "Prairie plantings",
    "Architectural native borders",
    "High-diversity pollinator habitat"
  ],
  pollinators: ["Native bees", "Wasps", "Butterflies", "Beetles"],
  hostFor: [],
  cautions: [],
  careNotes:
    "This plant pulls in an insane diversity of beneficial insects. A ‘biodiversity booster’ in prairie gardens.",
},

"Silphium terebinthinaceum": {
  friendly: true,
  commonName: "Prairie dock",
  nativeRange: "Central North America",
  habitat: "Tallgrass prairie and open grasslands",
  bloomTime: "Mid to late summer",
  sun: "Full sun",
  soil: "Deep soils; medium moisture; drought tolerant once established",
  water: "Low to medium",
  height: "5–10 ft",
  spread: "3–5 ft",
  uses: [
    "Tall prairie plantings",
    "Windbreak-style habitat",
    "Pollinator and bird support"
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies"],
  hostFor: [],
  cautions: ["Very tall; needs space"],
  careNotes:
    "Huge leaves and tall blooms make it a prairie anchor plant. Great for large native gardens and restoration plantings.",
},

"Silphium terebinthinaceum var. pinnatifidum": {
  friendly: true,
  commonName: "Cutleaf prairie dock",
  nativeRange: "Central North America",
  habitat: "Prairie environments",
  bloomTime: "Mid to late summer",
  sun: "Full sun",
  soil: "Medium moisture; deep soils",
  water: "Low to medium",
  height: "5–10 ft",
  spread: "3–5 ft",
  uses: [
    "Prairie restoration",
    "Tall native habitat gardens"
  ],
  pollinators: ["Bees", "Butterflies"],
  hostFor: [],
  cautions: ["Very tall; best for larger spaces"],
  careNotes:
    "Same ecological role as prairie dock—strong structure, late-season pollinator support, and habitat value.",
},

"Geum triflorum": {
  friendly: true,
  commonName: "Prairie smoke",
  nativeRange: "Northern & central North America",
  habitat: "Dry prairies, rocky meadows",
  bloomTime: "Spring to early summer",
  sun: "Full sun",
  soil: "Well-drained; sandy/rocky",
  water: "Low",
  height: "6–18 in",
  spread: "1–2 ft",
  uses: [
    "Native rock gardens",
    "Dry meadow plantings",
    "Early-season pollinator support"
  ],
  pollinators: ["Native bees"],
  hostFor: [],
  cautions: [],
  careNotes:
    "An early-season native that supports spring bees and adds unique seedhead interest later.",
},

"Sanguisorba canadensis": {
  friendly: true,
  commonName: "Canadian burnet",
  nativeRange: "Northeastern & upper Midwestern North America",
  habitat: "Wet meadows, stream edges, damp prairies",
  bloomTime: "Late summer to fall",
  sun: "Full sun to part sun",
  soil: "Moist to wet",
  water: "Medium to high",
  height: "3–6 ft",
  spread: "2–3 ft",
  uses: [
    "Wet meadow plantings",
    "Late-season pollinator habitat",
    "Rain gardens (large scale)"
  ],
  pollinators: ["Bees", "Butterflies", "Beneficial flies"],
  hostFor: [],
  cautions: [],
  careNotes:
    "A late-season nectar source that works well in damp ground where many prairie flowers struggle.",
},


// ----------------------
// More Asters, Goldenrods & Late-Season Plants
// ----------------------

"Symphyotrichum pilosum": {
  friendly: true,
  commonName: "Hairy white oldfield aster",
  nativeRange: "Central & eastern North America",
  habitat: "Old fields, prairies, disturbed sites",
  bloomTime: "Late summer through fall",
  sun: "Full sun",
  soil: "Adaptable; tolerates poor soils",
  water: "Low to medium",
  height: "2–4 ft",
  spread: "1–2 ft",
  uses: [
    "Late-season pollinator meadows",
    "Restoration plantings",
    "Naturalized areas"
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies", "Hoverflies"],
  hostFor: ["Specialist aster-feeding insects (varies regionally)"],
  cautions: ["Can self-seed readily"],
  careNotes:
    "An aggressive but powerful fall nectar source. Excellent in restoration or large meadow-style plantings.",
},

"Symphyotrichum lateriflorum": {
  friendly: true,
  commonName: "Calico aster",
  nativeRange: "Eastern & central North America",
  habitat: "Woodland edges, meadows, open woods",
  bloomTime: "Late summer to fall",
  sun: "Full sun to part shade",
  soil: "Well-drained; adaptable",
  water: "Low to medium",
  height: "2–3 ft",
  spread: "1–2 ft",
  uses: [
    "Native woodland edges",
    "Pollinator borders",
    "Fall nectar support"
  ],
  pollinators: ["Small native bees", "Butterflies", "Beneficial flies"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Delicate-looking but ecologically strong. Great bridge plant between woodland and meadow habitats.",
},

"Symphyotrichum lanceolatum": {
  friendly: true,
  commonName: "Lanceleaf aster",
  nativeRange: "Eastern & central North America",
  habitat: "Moist meadows, streambanks",
  bloomTime: "Late summer through fall",
  sun: "Full sun",
  soil: "Moist; tolerant of clay",
  water: "Medium",
  height: "3–5 ft",
  spread: "2–3 ft",
  uses: [
    "Rain gardens",
    "Wet meadow restorations",
    "Late-season nectar beds"
  ],
  pollinators: ["Bees", "Butterflies"],
  hostFor: [],
  cautions: ["Spreads by rhizomes in moist soils"],
  careNotes:
    "Excellent for wetter sites where other asters struggle. Very dependable fall bloomer.",
},

"Doellingeria umbellata": {
  friendly: true,
  commonName: "Flat-topped aster",
  nativeRange: "Eastern North America",
  habitat: "Moist meadows, open woods",
  bloomTime: "Late summer to fall",
  sun: "Full sun to part sun",
  soil: "Moist, well-drained",
  water: "Medium",
  height: "3–5 ft",
  spread: "2–3 ft",
  uses: [
    "Butterfly gardens",
    "Moist meadow plantings",
    "Native pollinator beds"
  ],
  pollinators: ["Butterflies", "Native bees"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Flat flower clusters are easy landing platforms. Great nectar bridge into fall migration season.",
},

"Eurybia macrophylla": {
  friendly: true,
  commonName: "Bigleaf aster",
  nativeRange: "Eastern North America",
  habitat: "Woodlands, shaded slopes",
  bloomTime: "Late summer",
  sun: "Part shade to shade",
  soil: "Rich, moist, well-drained",
  water: "Medium",
  height: "1–2 ft",
  spread: "1–2 ft",
  uses: [
    "Shade pollinator gardens",
    "Woodland native plantings"
  ],
  pollinators: ["Small native bees", "Butterflies"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Provides fall nectar in shaded environments where options are limited.",
},

"Solidago altissima": {
  friendly: true,
  commonName: "Tall goldenrod",
  nativeRange: "Eastern & central North America",
  habitat: "Fields, prairies, roadsides",
  bloomTime: "Late summer through fall",
  sun: "Full sun",
  soil: "Adaptable; tolerates poor soils",
  water: "Low to medium",
  height: "4–7 ft",
  spread: "3–5 ft (rhizomatous)",
  uses: [
    "Large meadow plantings",
    "Fall nectar powerhouse",
    "Restoration work"
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies", "Wasps"],
  hostFor: ["Numerous native insects (goldenrods host high insect diversity)"],
  cautions: ["Spreads aggressively in fertile soils"],
  careNotes:
    "One of the most important late-season nectar plants in North America. Best in larger spaces.",
},

"Solidago caesia": {
  friendly: true,
  commonName: "Bluestem goldenrod",
  nativeRange: "Eastern North America",
  habitat: "Open woodlands, edges",
  bloomTime: "Late summer to fall",
  sun: "Part sun to light shade",
  soil: "Well-drained; woodland soils",
  water: "Low to medium",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Woodland pollinator gardens",
    "Fall shade nectar source"
  ],
  pollinators: ["Bees", "Butterflies"],
  hostFor: [],
  cautions: [],
  careNotes:
    "A great goldenrod alternative for partial shade gardens.",
},

"Solidago bicolor": {
  friendly: true,
  commonName: "White goldenrod",
  nativeRange: "Eastern North America",
  habitat: "Dry open woods and fields",
  bloomTime: "Late summer to fall",
  sun: "Full sun to part sun",
  soil: "Well-drained; sandy or rocky",
  water: "Low",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Dry meadow plantings",
    "Unusual color accent in native gardens"
  ],
  pollinators: ["Native bees", "Butterflies"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Offers strong pollinator value with a less typical white bloom color.",
},

"Solidago ulmifolia": {
  friendly: true,
  commonName: "Elmleaf goldenrod",
  nativeRange: "Eastern North America",
  habitat: "Woodland edges, shaded slopes",
  bloomTime: "Late summer to fall",
  sun: "Part sun",
  soil: "Well-drained; adaptable",
  water: "Low to medium",
  height: "2–4 ft",
  spread: "1–2 ft",
  uses: [
    "Shade-friendly fall nectar plant",
    "Native woodland plantings"
  ],
  pollinators: ["Native bees", "Butterflies"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Less aggressive than tall goldenrod. Good balance of structure and ecological value.",
},

"Symphyotrichum dumosum": {
  friendly: true,
  commonName: "Bushy aster",
  nativeRange: "Eastern North America",
  habitat: "Open woods, meadows",
  bloomTime: "Late summer through fall",
  sun: "Full sun to part sun",
  soil: "Well-drained",
  water: "Low to medium",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Compact fall pollinator plantings",
    "Native borders",
    "Late nectar support"
  ],
  pollinators: ["Native bees", "Butterflies"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Compact and very floriferous. Excellent for smaller native gardens needing strong fall bloom.",
},


 // ----------------------
// Additional Mints & High-Nectar Lamiaceae
// ----------------------

"Monarda citriodora": {
  friendly: true,
  commonName: "Lemon bee balm",
  nativeRange: "Central & southern United States",
  habitat: "Open prairies, roadsides, sunny meadows",
  bloomTime: "Late spring through summer",
  sun: "Full sun",
  soil: "Well-drained; sandy or lean soils preferred",
  water: "Low to medium",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Pollinator gardens",
    "Wildflower meadows",
    "Annual nectar support"
  ],
  pollinators: ["Native bees", "Honey bees", "Butterflies"],
  hostFor: [],
  cautions: ["Often behaves as an annual in colder climates"],
  careNotes:
    "Fast-growing and excellent for quick nectar production. Allow some reseeding for continuous presence.",
},

"Monarda clinopodia": {
  friendly: true,
  commonName: "Basil bee balm",
  nativeRange: "Eastern North America",
  habitat: "Woodlands and shaded slopes",
  bloomTime: "Summer",
  sun: "Part sun to light shade",
  soil: "Moist, well-drained woodland soils",
  water: "Medium",
  height: "2–4 ft",
  spread: "1–2 ft",
  uses: [
    "Woodland pollinator gardens",
    "Shade-friendly nectar plantings"
  ],
  pollinators: ["Native bees", "Bumblebees"],
  hostFor: [],
  cautions: [],
  careNotes:
    "A great alternative to sun-loving bee balms for partial shade landscapes.",
},

"Monarda media": {
  friendly: true,
  commonName: "Purple bee balm",
  nativeRange: "Southeastern United States",
  habitat: "Moist meadows and open woodlands",
  bloomTime: "Summer",
  sun: "Full sun to part sun",
  soil: "Moist, well-drained",
  water: "Medium",
  height: "3–5 ft",
  spread: "2–3 ft",
  uses: [
    "Tall pollinator borders",
    "Hummingbird gardens"
  ],
  pollinators: ["Hummingbirds", "Native bees", "Butterflies"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Prefers moisture compared to other Monarda. Excellent mid-summer nectar bridge.",
},

"Agastache cana": {
  friendly: true,
  commonName: "Hummingbird mint",
  nativeRange: "Southwestern United States",
  habitat: "Dry slopes, rocky soils",
  bloomTime: "Summer to fall",
  sun: "Full sun",
  soil: "Well-drained; sandy or gravelly",
  water: "Low",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Xeriscaping",
    "Hummingbird gardens",
    "Drought-tolerant pollinator beds"
  ],
  pollinators: ["Hummingbirds", "Bees"],
  hostFor: [],
  cautions: ["Not cold hardy in all regions"],
  careNotes:
    "Thrives in heat and lean soils. Avoid overwatering—this plant prefers it dry.",
},

"Agastache mexicana": {
  friendly: true,
  commonName: "Mexican giant hyssop",
  nativeRange: "Mexico (non-native in U.S.)",
  habitat: "Sunny borders and herb gardens",
  bloomTime: "Summer through fall",
  sun: "Full sun",
  soil: "Well-drained",
  water: "Low to medium",
  height: "2–4 ft",
  spread: "1–2 ft",
  uses: [
    "Fragrant pollinator borders",
    "Herb gardens"
  ],
  pollinators: ["Bees", "Butterflies", "Hummingbirds"],
  hostFor: [],
  cautions: ["Non-native; frost sensitive in cold climates"],
  careNotes:
    "Long-blooming and highly aromatic. Cut back lightly to encourage bushier growth.",
},

"Hyssopus officinalis": {
  friendly: true,
  commonName: "Common hyssop",
  nativeRange: "Europe (non-native in North America)",
  habitat: "Sunny herb gardens",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Well-drained; tolerates poor soils",
  water: "Low",
  height: "1–2 ft",
  spread: "1–2 ft",
  uses: [
    "Herb gardens",
    "Bee forage plantings",
    "Low hedge borders"
  ],
  pollinators: ["Honey bees", "Native bees", "Butterflies"],
  hostFor: [],
  cautions: ["Non-native"],
  careNotes:
    "Very attractive to honey bees in particular. Trim after flowering to maintain compact shape.",
},

"Calamintha nepeta": {
  friendly: true,
  commonName: "Lesser calamint",
  nativeRange: "Southern Europe (non-native in North America)",
  habitat: "Sunny borders and gravel gardens",
  bloomTime: "Summer to fall (very long bloom)",
  sun: "Full sun",
  soil: "Well-drained; average",
  water: "Low to medium",
  height: "1–2 ft",
  spread: "1–2 ft",
  uses: [
    "Long-season pollinator magnet",
    "Edging plant for nectar beds"
  ],
  pollinators: ["Native bees (very high traffic)", "Honey bees"],
  hostFor: [],
  cautions: ["Non-native"],
  careNotes:
    "Often appears covered in bees all season. Cut back midseason for a fresh flush of blooms.",
},

"Origanum laevigatum": {
  friendly: true,
  commonName: "Ornamental oregano",
  nativeRange: "Mediterranean region (non-native)",
  habitat: "Sunny borders, rock gardens",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Well-drained; lean soils preferred",
  water: "Low",
  height: "1–2 ft",
  spread: "1–2 ft",
  uses: [
    "Ornamental pollinator plantings",
    "Low-water gardens"
  ],
  pollinators: ["Bees", "Butterflies"],
  hostFor: [],
  cautions: ["Non-native"],
  careNotes:
    "Purple bracts are highly attractive to pollinators. Avoid rich soils for best flowering.",
},

"Satureja montana": {
  friendly: true,
  commonName: "Winter savory",
  nativeRange: "Mediterranean region (non-native)",
  habitat: "Herb gardens, dry sunny beds",
  bloomTime: "Mid to late summer",
  sun: "Full sun",
  soil: "Well-drained; dry soils tolerated",
  water: "Low",
  height: "1–2 ft",
  spread: "1–2 ft",
  uses: [
    "Herb gardens",
    "Low-water pollinator borders"
  ],
  pollinators: ["Honey bees", "Native bees"],
  hostFor: [],
  cautions: ["Non-native"],
  careNotes:
    "Compact and drought tolerant. Allow flowers to bloom fully before harvesting for maximum pollinator benefit.",
},


 // ----------------------
// More Penstemons & Blazing Stars
// ----------------------

"Liatris ligulistylis": {
  friendly: true,
  commonName: "Meadow blazing star",
  nativeRange: "Central & northern Great Plains (U.S.)",
  habitat: "Prairies, open grasslands, well-drained sites",
  bloomTime: "Late summer to early fall",
  sun: "Full sun",
  soil: "Well-drained; sandy/loamy; tolerates lean soils",
  water: "Low to medium",
  height: "2–5 ft",
  spread: "1–2 ft",
  uses: [
    "Prairie restorations",
    "Monarch migration plantings",
    "Late-season pollinator borders"
  ],
  pollinators: ["Monarchs (major)", "Butterflies", "Native bees", "Honey bees"],
  hostFor: [],
  cautions: ["Can be harder to find; avoid wild collection"],
  careNotes:
    "One of the best monarch nectar plants in late summer. Pair with asters/goldenrods for a full fall fuel corridor.",
},

"Liatris cylindracea": {
  friendly: true,
  commonName: "Dwarf blazing star",
  nativeRange: "Central & eastern North America",
  habitat: "Dry prairies, rocky glades, open slopes",
  bloomTime: "Mid to late summer",
  sun: "Full sun",
  soil: "Well-drained; sandy/rocky",
  water: "Low",
  height: "1–2 ft",
  spread: "1 ft",
  uses: [
    "Dry prairie gardens",
    "Rock gardens",
    "Compact pollinator plantings"
  ],
  pollinators: ["Native bees", "Butterflies", "Skippers"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Great blazing star for small spaces and dry sites. Doesn’t flop, doesn’t need rich soil—just sun and drainage.",
},

"Penstemon barbatus": {
  friendly: true,
  commonName: "Scarlet bugler / Beard-tongue",
  nativeRange: "Southwestern & western United States",
  habitat: "Open woods, slopes, dry meadows",
  bloomTime: "Late spring through summer",
  sun: "Full sun",
  soil: "Well-drained; sandy/gravelly preferred",
  water: "Low to medium",
  height: "2–4 ft",
  spread: "1–2 ft",
  uses: [
    "Hummingbird gardens",
    "Drought-tolerant borders",
    "Native western pollinator plantings"
  ],
  pollinators: ["Hummingbirds (primary)", "Long-tongued native bees"],
  hostFor: [],
  cautions: ["Short-lived perennial in some climates"],
  careNotes:
    "A top hummingbird flower. Avoid heavy clay and overwatering—penstemons hate wet feet.",
},

"Penstemon pinifolius": {
  friendly: true,
  commonName: "Pineleaf penstemon",
  nativeRange: "Southwestern United States",
  habitat: "Dry rocky slopes and open sites",
  bloomTime: "Late spring to summer",
  sun: "Full sun",
  soil: "Very well-drained; rocky/sandy",
  water: "Low",
  height: "6–18 in",
  spread: "1–2 ft",
  uses: [
    "Xeriscaping",
    "Rock gardens",
    "Drought-tough pollinator borders"
  ],
  pollinators: ["Native bees", "Hummingbirds"],
  hostFor: [],
  cautions: ["Sensitive to wet winter soils"],
  careNotes:
    "Needs drainage more than anything. Perfect for hot, dry spots where other flowers burn out.",
},

"Penstemon eatonii": {
  friendly: true,
  commonName: "Firecracker penstemon",
  nativeRange: "Southwestern United States",
  habitat: "Desert edges, slopes, open woodlands",
  bloomTime: "Spring to early summer (often earlier than other penstemons)",
  sun: "Full sun",
  soil: "Well-drained; sandy/rocky",
  water: "Low",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Early-season hummingbird nectar source",
    "Dry climate native gardens",
    "Pollinator corridors"
  ],
  pollinators: ["Hummingbirds", "Native bees (some use)"],
  hostFor: [],
  cautions: ["Best in regions with dry summers or excellent drainage"],
  careNotes:
    "Blooms early and hard, which makes it valuable when nectar options are still limited. Great companion to early spring natives.",
},

"Penstemon digitalis 'Husker Red'": {
  friendly: true,
  commonName: "Husker Red beardtongue (cultivar)",
  nativeRange: "Cultivar of a North American species (Penstemon digitalis)",
  habitat: "Garden perennial; borders and native-style beds",
  bloomTime: "Late spring to early summer",
  sun: "Full sun to part sun",
  soil: "Well-drained; adaptable",
  water: "Low to medium",
  height: "2–3.5 ft",
  spread: "1–2 ft",
  uses: [
    "Pollinator-friendly ornamental borders",
    "Early-season nectar support",
    "Native-style landscapes"
  ],
  pollinators: ["Native bees", "Bumblebees", "Honey bees"],
  hostFor: [],
  cautions: ["Cultivar—still pollinator useful, but native straight species may support broader insect diversity"],
  careNotes:
    "Reliable and easy. If you want a more ‘pure native’ approach, keep the straight species too—but this cultivar still performs well for bees.",
},


  // ----------------------
// Woodland / Shade Natives
// ----------------------

"Heuchera richardsonii": {
  friendly: true,
  commonName: "Prairie alumroot",
  nativeRange: "Central North America (prairie/woodland transition zones)",
  habitat: "Prairie edges, open woods, rocky or well-drained slopes",
  bloomTime: "Late spring to early summer",
  sun: "Part sun to light shade",
  soil: "Well-drained; rocky/loamy; prefers moderate fertility",
  water: "Low to medium",
  height: "1–2 ft (flower stalks above foliage)",
  spread: "1–1.5 ft",
  uses: [
    "Native shade borders",
    "Woodland edge plantings",
    "Pollinator-friendly ground layer"
  ],
  pollinators: ["Small native bees", "Hoverflies", "Tiny beneficial insects"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Handles drier shade better than many woodland plants. Leave seed stalks for texture or trim after bloom for a cleaner look.",
},

"Heuchera americana": {
  friendly: true,
  commonName: "American alumroot / Coralbells (native)",
  nativeRange: "Eastern North America",
  habitat: "Woodlands, rocky outcrops, shaded slopes",
  bloomTime: "Late spring to summer",
  sun: "Part shade to shade (tolerates morning sun)",
  soil: "Rich, well-drained; tolerates rocky soils",
  water: "Medium (drought-tolerant once established in shade)",
  height: "1–2 ft (flower stalks)",
  spread: "1–2 ft",
  uses: [
    "Woodland gardens",
    "Native shade borders",
    "Ground-layer texture + early nectar"
  ],
  pollinators: ["Small native bees", "Hoverflies"],
  hostFor: [],
  cautions: ["Many ornamental coralbells are cultivars/hybrids—keep the native species for best ecosystem value"],
  careNotes:
    "Great for shaded beds with good drainage. Flowers are subtle but meaningful to small pollinators.",
},

"Tiarella cordifolia": {
  friendly: true,
  commonName: "Foamflower",
  nativeRange: "Eastern North America",
  habitat: "Moist woodlands and shaded stream corridors",
  bloomTime: "Spring",
  sun: "Shade to part shade",
  soil: "Moist, rich, well-drained; high organic matter",
  water: "Medium",
  height: "6–12 in (flowers rise above foliage)",
  spread: "1–2 ft (often spreads by runners)",
  uses: [
    "Native woodland groundcover",
    "Shade pollinator gardens",
    "Erosion control in shaded beds"
  ],
  pollinators: ["Small native bees", "Beneficial flies"],
  hostFor: [],
  cautions: [],
  careNotes:
    "A true spring woodland staple. Pair with Virginia bluebells and spring beauties for a layered early-season nectar timeline.",
},

"Mertensia virginica": {
  friendly: true,
  commonName: "Virginia bluebells",
  nativeRange: "Eastern & central North America",
  habitat: "Floodplain woods, moist woodland slopes",
  bloomTime: "Early spring",
  sun: "Part shade to shade (more sun early before trees leaf out is ideal)",
  soil: "Moist, rich, well-drained",
  water: "Medium",
  height: "1–2 ft",
  spread: "1–2 ft",
  uses: [
    "Spring ephemerals gardens",
    "Woodland pollinator support",
    "Native shade plantings"
  ],
  pollinators: ["Bumblebees", "Early native bees"],
  hostFor: [],
  cautions: ["Goes dormant after blooming (ephemeral)"],
  careNotes:
    "An early-season nectar source when bees are emerging. Mark the planting area so you don’t disturb dormant plants later in summer.",
},

"Tradescantia ohiensis": {
  friendly: true,
  commonName: "Ohio spiderwort",
  nativeRange: "Central & eastern North America",
  habitat: "Prairies, open woods, roadsides",
  bloomTime: "Late spring through summer (blooms in waves)",
  sun: "Full sun to part sun",
  soil: "Adaptable; tolerates clay and average soils",
  water: "Low to medium",
  height: "1.5–3 ft",
  spread: "1–2 ft",
  uses: [
    "Native borders",
    "Meadow plantings",
    "Early-to-mid season pollinator support"
  ],
  pollinators: ["Native bees (especially morning visitors)", "Hoverflies"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Flowers open in the morning and can close by afternoon heat. Shear after a bloom wave for tidier regrowth and potential rebloom.",
},

"Claytonia virginica": {
  friendly: true,
  commonName: "Spring beauty",
  nativeRange: "Eastern North America",
  habitat: "Woodlands, lawns, forest edges",
  bloomTime: "Early spring",
  sun: "Part shade to sun (best with spring sunlight before canopy leaf-out)",
  soil: "Moist, rich",
  water: "Medium",
  height: "4–8 in",
  spread: "1 ft (naturalizes by seed)",
  uses: [
    "Spring ephemeral lawns/meadows",
    "Woodland pollinator support",
    "Native ground layer plantings"
  ],
  pollinators: ["Early native bees", "Small bees"],
  hostFor: [],
  cautions: ["Goes dormant after spring bloom"],
  careNotes:
    "One of the most important ‘first flowers’ for native bees. Great for bee-lawns if mowing is delayed until after bloom.",
},

"Dicentra cucullaria": {
  friendly: true,
  commonName: "Dutchman’s breeches",
  nativeRange: "Eastern North America",
  habitat: "Rich deciduous woods and shaded slopes",
  bloomTime: "Early spring",
  sun: "Shade to part shade",
  soil: "Moist, rich, well-drained",
  water: "Medium",
  height: "6–12 in",
  spread: "1 ft",
  uses: [
    "Woodland gardens",
    "Spring ephemeral plantings"
  ],
  pollinators: ["Bumblebees (primary)"],
  hostFor: [],
  cautions: ["Ephemeral; dormant by early summer", "Toxic if ingested"],
  careNotes:
    "Built for bumblebees—flower shape favors strong early pollinators. Plant with other ephemerals to keep the area interesting after dormancy.",
},

"Mitella diphylla": {
  friendly: true,
  commonName: "Bishop’s cap",
  nativeRange: "Eastern North America",
  habitat: "Moist deciduous woods",
  bloomTime: "Spring",
  sun: "Shade to part shade",
  soil: "Moist, rich, well-drained",
  water: "Medium",
  height: "8–16 in",
  spread: "1 ft",
  uses: [
    "Woodland native plantings",
    "Shade pollinator gardens"
  ],
  pollinators: ["Small native bees", "Beneficial flies"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Tiny flowers, but meaningful for small pollinators in spring woodland ecosystems.",
},

"Maianthemum racemosum": {
  friendly: true,
  commonName: "False Solomon’s seal",
  nativeRange: "Widespread across North America",
  habitat: "Woodlands and shaded forest edges",
  bloomTime: "Late spring",
  sun: "Part shade to shade",
  soil: "Moist, rich, well-drained",
  water: "Medium",
  height: "1–3 ft",
  spread: "1–2 ft",
  uses: [
    "Woodland understory structure",
    "Native shade gardens",
    "Wildlife plantings (berries)"
  ],
  pollinators: ["Bees", "Beneficial flies"],
  hostFor: [],
  cautions: ["Berries are for wildlife; not recommended as a human edible"],
  careNotes:
    "Fragrant blooms support pollinators, and later berries support birds—strong ‘whole ecosystem’ plant for shade.",
},

// ----------------------
// Wetland / Edge Plants
// ----------------------

"Eutrochium maculatum": {
  friendly: true,
  commonName: "Spotted Joe-Pye weed",
  nativeRange: "Eastern & central North America",
  habitat: "Wet meadows, stream edges, ditches",
  bloomTime: "Late summer to fall",
  sun: "Full sun to part sun",
  soil: "Moist to wet; rich soils",
  water: "Medium to high",
  height: "4–7 ft",
  spread: "3–4 ft",
  uses: [
    "Rain gardens",
    "Wet meadow restorations",
    "Butterfly habitat plantings"
  ],
  pollinators: ["Butterflies", "Native bees", "Honey bees"],
  hostFor: [],
  cautions: ["Very tall; can flop in rich soils without support"],
  careNotes:
    "A late-season nectar monster for butterflies. Cut back by ~1/3 in early summer if you want a shorter, sturdier plant.",
},

"Eutrochium dubium": {
  friendly: true,
  commonName: "Coastal Joe-Pye weed",
  nativeRange: "Eastern coastal U.S.",
  habitat: "Moist coastal meadows and edges",
  bloomTime: "Late summer to fall",
  sun: "Full sun to part sun",
  soil: "Moist, well-drained",
  water: "Medium",
  height: "3–5 ft",
  spread: "2–3 ft",
  uses: [
    "Smaller rain gardens",
    "Compact Joe-Pye for borders",
    "Butterfly gardens"
  ],
  pollinators: ["Butterflies", "Bees"],
  hostFor: [],
  cautions: [],
  careNotes:
    "A more compact Joe-Pye option that still delivers heavy nectar late season.",
},

"Iris versicolor": {
  friendly: true,
  commonName: "Blue flag iris",
  nativeRange: "Northeastern & upper Midwestern North America",
  habitat: "Wet meadows, marsh edges, pond margins",
  bloomTime: "Late spring to early summer",
  sun: "Full sun to part sun",
  soil: "Wet to moist; tolerates standing water",
  water: "High",
  height: "2–3 ft",
  spread: "1–2 ft (clumping rhizomes)",
  uses: [
    "Pond edges",
    "Rain gardens",
    "Native wetland plantings"
  ],
  pollinators: ["Bees (some)", "Specialist wetland insects"],
  hostFor: [],
  cautions: ["All parts can be irritating/toxic if ingested"],
  careNotes:
    "More of a wetland habitat anchor than a nectar powerhouse, but valuable early bloom structure and ecological role in wet sites.",
},

"Caltha palustris": {
  friendly: true,
  commonName: "Marsh marigold",
  nativeRange: "Northern North America, Europe, Asia",
  habitat: "Marshes, wet woods, stream edges",
  bloomTime: "Early spring",
  sun: "Part sun to shade",
  soil: "Wet; boggy or saturated",
  water: "High",
  height: "1–1.5 ft",
  spread: "1–2 ft",
  uses: [
    "Bog gardens",
    "Wet shade plantings",
    "Early-season wetland color"
  ],
  pollinators: ["Early flies", "Small bees (some)"],
  hostFor: [],
  cautions: ["Toxic if ingested (not edible)"],
  careNotes:
    "One of the earliest wetland flowers, providing resources when very little else is blooming in saturated habitats.",
},

"Verbena hastata var. rosea": {
  friendly: true,
  commonName: "Pink vervain (variant of blue vervain)",
  nativeRange: "Based on Verbena hastata (native to North America)",
  habitat: "Moist meadows, stream edges",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Moist; clay tolerant",
  water: "Medium",
  height: "3–5 ft",
  spread: "1–2 ft",
  uses: [
    "Rain gardens",
    "Pollinator meadows",
    "Vertical accent in native borders"
  ],
  pollinators: ["Native bees", "Butterflies", "Beneficial wasps"],
  hostFor: [],
  cautions: [],
  careNotes:
    "Tall spikes provide steady nectar in midsummer. Great for rain gardens and meadow mixes.",
},

"Lobelia inflata": {
  friendly: true,
  commonName: "Indian tobacco",
  nativeRange: "Eastern North America",
  habitat: "Open woods, edges, disturbed soils",
  bloomTime: "Late summer",
  sun: "Part sun to full sun",
  soil: "Well-drained; average soils",
  water: "Low to medium",
  height: "1–3 ft",
  spread: "1 ft",
  uses: [
    "Native edge plantings",
    "Late-season support for small pollinators"
  ],
  pollinators: ["Small bees", "Beneficial flies"],
  hostFor: [],
  cautions: ["Toxic if ingested"],
  careNotes:
    "Not a showy ‘butterfly magnet,’ but it supports small pollinators and fills late-season gaps in edges and open woods.",
},

"Chelone glabra": {
  friendly: true,
  commonName: "White turtlehead",
  nativeRange: "Eastern North America",
  habitat: "Wet meadows, stream edges, woodland wetlands",
  bloomTime: "Late summer to fall",
  sun: "Part sun to part shade",
  soil: "Moist to wet",
  water: "Medium to high",
  height: "2–4 ft",
  spread: "2–3 ft",
  uses: [
    "Rain gardens",
    "Wetland edges",
    "Butterfly host plant gardens"
  ],
  pollinators: ["Bumblebees (primary)", "Native bees"],
  hostFor: ["Baltimore checkerspot butterfly (larval host plant)"],
  cautions: [],
  careNotes:
    "A true dual-value plant: nectar for bumblebees + host plant for Baltimore checkerspot. Perfect for wetter shaded edges.",
},


  // ----------------------
// Additional Shrubs & Trees
// ----------------------

"Chionanthus virginicus": {
  friendly: true,
  commonName: "Fringe tree",
  nativeRange: "Eastern United States",
  habitat: "Woodland edges, stream banks",
  bloomTime: "Late spring",
  sun: "Full sun to part shade",
  soil: "Moist, well-drained",
  water: "Medium",
  height: "12–20 ft",
  spread: "12–20 ft",
  uses: ["Native ornamental tree", "Wildlife garden"],
  pollinators: ["Native bees", "Small beneficial insects"],
  hostFor: [],
  cautions: [],
  careNotes: "Slow-growing small tree with fragrant blooms; excellent understory tree for pollinator gardens."
},

"Kalmia latifolia": {
  friendly: true,
  commonName: "Mountain laurel",
  nativeRange: "Eastern United States",
  habitat: "Woodlands, acidic forest soils",
  bloomTime: "Late spring",
  sun: "Part shade",
  soil: "Acidic, well-drained",
  water: "Medium",
  height: "5–15 ft",
  spread: "5–15 ft",
  uses: ["Evergreen native shrub", "Woodland habitat"],
  pollinators: ["Bees"],
  hostFor: [],
  cautions: ["All parts toxic if ingested"],
  careNotes: "Requires acidic soil; avoid alkaline conditions."
},

"Rosa carolina": {
  friendly: true,
  commonName: "Carolina rose",
  nativeRange: "Eastern North America",
  habitat: "Meadows, woodland edges",
  bloomTime: "Late spring to summer",
  sun: "Full sun",
  soil: "Well-drained",
  water: "Low to medium",
  height: "3–6 ft",
  spread: "3–6 ft",
  uses: ["Native hedge", "Wildlife shrub"],
  pollinators: ["Native bees", "Beetles"],
  hostFor: ["Various butterfly larvae"],
  cautions: [],
  careNotes: "Simple single-petal blooms provide accessible pollen."
},

// ----------------------
// Vines & Climbers
// ----------------------

"Lonicera sempervirens": {
  friendly: true,
  commonName: "Coral honeysuckle",
  nativeRange: "Eastern United States",
  habitat: "Woodland edges",
  bloomTime: "Spring to summer",
  sun: "Full sun to part shade",
  soil: "Well-drained",
  water: "Medium",
  height: "10–20 ft vine",
  spread: "Climbing",
  uses: ["Native trellis vine", "Hummingbird garden"],
  pollinators: ["Hummingbirds", "Bees"],
  hostFor: [],
  cautions: [],
  careNotes: "Native alternative to invasive Japanese honeysuckle."
},

"Campsis radicans": {
  friendly: true,
  commonName: "Trumpet creeper",
  nativeRange: "Eastern United States",
  habitat: "Forest edges, fences",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Adaptable",
  water: "Low to medium",
  height: "20–40 ft vine",
  spread: "Aggressive climber",
  uses: ["Hummingbird garden vine"],
  pollinators: ["Hummingbirds", "Large bees"],
  hostFor: [],
  cautions: ["Aggressive spreader"],
  careNotes: "Prune aggressively to control spread."
},

// ----------------------
// Non-Native but Highly Pollinator-Friendly Ornamentals
// ----------------------

"Buddleja davidii": {
  friendly: true,
  commonName: "Butterfly bush",
  nativeRange: "China (non-native)",
  habitat: "Garden ornamental",
  bloomTime: "Summer to fall",
  sun: "Full sun",
  soil: "Well-drained",
  water: "Low to medium",
  height: "6–10 ft",
  spread: "4–8 ft",
  uses: ["Butterfly garden shrub"],
  pollinators: ["Butterflies", "Bees"],
  hostFor: [],
  cautions: ["Can be invasive in some regions"],
  careNotes: "Deadhead to reduce reseeding in areas where invasive."
},

// ----------------------
// Umbellifers & Culinary Herbs
// ----------------------

"Foeniculum vulgare": {
  friendly: true,
  commonName: "Fennel",
  nativeRange: "Mediterranean (naturalized widely)",
  habitat: "Gardens, open fields",
  bloomTime: "Summer",
  sun: "Full sun",
  soil: "Well-drained",
  water: "Low",
  height: "3–6 ft",
  spread: "2–3 ft",
  uses: ["Herb garden", "Host plant"],
  pollinators: ["Bees", "Hoverflies", "Wasps"],
  hostFor: ["Black swallowtail caterpillars"],
  cautions: ["Can spread aggressively in some climates"],
  careNotes: "Allow to flower for pollinator value."
},

// ----------------------
// Host plants for butterflies
// ----------------------

"Lindera benzoin": {
  friendly: true,
  commonName: "Spicebush",
  nativeRange: "Eastern United States",
  habitat: "Moist woodlands",
  bloomTime: "Early spring",
  sun: "Part shade",
  soil: "Moist, rich",
  water: "Medium",
  height: "6–15 ft",
  spread: "6–15 ft",
  uses: ["Native understory shrub"],
  pollinators: ["Bees"],
  hostFor: ["Spicebush swallowtail"],
  cautions: [],
  careNotes: "High wildlife value; aromatic leaves."
},

"Asimina triloba": {
  friendly: true,
  commonName: "Pawpaw",
  nativeRange: "Eastern United States",
  habitat: "Moist woodlands",
  bloomTime: "Spring",
  sun: "Part shade",
  soil: "Moist, well-drained",
  water: "Medium",
  height: "15–30 ft",
  spread: "10–20 ft",
  uses: ["Native fruit tree", "Wildlife habitat"],
  pollinators: ["Flies", "Beetles"],
  hostFor: ["Zebra swallowtail"],
  cautions: [],
  careNotes: "Produces edible fruit; requires cross-pollination for best yield."
},

// ----------------------
// Hummingbird / long-tubed natives
// ----------------------

"Lobelia cardinalis": {
  friendly: true,
  commonName: "Cardinal flower",
  nativeRange: "Eastern North America",
  habitat: "Wetlands, stream banks",
  bloomTime: "Late summer",
  sun: "Full sun to part shade",
  soil: "Moist to wet",
  water: "High",
  height: "2–4 ft",
  spread: "1–2 ft",
  uses: ["Rain gardens", "Hummingbird gardens"],
  pollinators: ["Hummingbirds", "Some bees"],
  hostFor: [],
  cautions: [],
  careNotes: "Needs consistent moisture for best performance."
},

// ----------------------
// Prairie staples
// ----------------------

"Helianthus maximiliani": {
  friendly: true,
  commonName: "Maximilian sunflower",
  nativeRange: "Central North America",
  habitat: "Prairies",
  bloomTime: "Late summer to fall",
  sun: "Full sun",
  soil: "Well-drained",
  water: "Low to medium",
  height: "4–8 ft",
  spread: "2–3 ft",
  uses: ["Prairie restoration", "Late nectar source"],
  pollinators: ["Native bees", "Butterflies"],
  hostFor: [],
  cautions: [],
  careNotes: "Excellent late-season pollen source."
}
};
