import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { prisma } from "./db";
import { POLLINATOR_SPECIES } from "./PollinatorSpecies";

function normalizeScientificName(name: string): string {
  if (!name) return name;
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0]} ${parts[1]}`;
  }
  return name.trim();
}

function normalizeName(s: string): string {
  return (s || "")
  .toLowerCase()
  .replace(/[^\p{L}\p{N}\s-]/gu, "")
  .replace(/\s+/g, " ")
  .trim();
}

function isPollinatorFriendlyName(scientificName?: string, commonName?: string) {
  const rawSci = (scientificName || "").trim();
  const sci2 = normalizeScientificName(rawSci);
  const sciNorm = normalizeName(rawSci);
  const sci2Norm = normalizeName(sci2);
  const commonNorm = normalizeName(commonName || "");

  const hit =
    POLLINATOR_SPECIES[rawSci] ||
    POLLINATOR_SPECIES[sci2] ||
    POLLINATOR_SPECIES[sciNorm] ||
    POLLINATOR_SPECIES[sci2Norm];

  if (hit?.friendly === true) return true;

  for (const [key, val] of Object.entries(POLLINATOR_SPECIES)) {
    if (val?.friendly !== true) continue;
    const k = normalizeName(key);

    if (k && (k === sciNorm || k === sci2Norm || (commonNorm && k === commonNorm))) {
      return true;
    }
  }

  return false;
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.get("/api/db-health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ db: "ok" });
  } catch (e: any) {
    res.status(500).json({ db: "fail", error: String(e?.message || e) });
   }
});


app.get("/api/plants", async (_req, res) => {
  const plants = await prisma.plant.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  res.json(plants);
});

app.post("/api/identifications", async (req, res) => {
  const { plantId, latitude, longitude } = req.body ?? {};
  if (!plantId) return res.status(400).json({ error: "plantId required" });
  const ident = await prisma.identification.create({
    data: { plantId, latitude, longitude },
  });
  res.status(201).json(ident);
});

app.get("/api/identifications", async (_req, res) => {
  const rows = await prisma.identification.findMany({
    select: {
      id: true,
      latitude: true,
      longitude: true,
      plant: { select: { common: true } },
    },
    orderBy: { identifiedAt: "desc" },
    take: 200,
  });
  res.json(rows);
});

app.post("/api/pollinator-check", (req, res) => {
  try {
    const items = Array.isArray(req.body?.items) ? req.body.items : [];

    const results = items.map((it: any) => {
      const scientificName =
        typeof it?.scientificName === "string" ? it.scientificName : "";
      const commonName = typeof it?.commonName === "string" ? it.commonName : "";

      return {
        scientificName,
        pollinatorFriendly: isPollinatorFriendlyName(scientificName, commonName),
      };
    });

    res.json({ results });
  } catch (e: any) {
    res.status(500).json({ error: String(e?.message || e) });
  }
});

app.post("/api/observations", async (req, res) => {
  try {
    const {
      commonName,
      scientificName,
      imageUrl,
      lat,
      lng,
      confidence,
    } = req.body ?? {};

    if (
      typeof lat !== "number" ||
      typeof lng !== "number" ||
      !scientificName
    ) {
      return res
        .status(400)
        .json({ error: "lat, lng, and scientificName are required" });
    }

    const rawSci = scientificName.trim();
    const simpleSci = normalizeScientificName(rawSci);

    const speciesInfo =
      POLLINATOR_SPECIES[rawSci] || POLLINATOR_SPECIES[simpleSci];

    const isPollinator = speciesInfo?.friendly ?? null;
    const pollinatorNotes = speciesInfo?.notes ?? null;

    const R = 0.0005;
    const existing = await prisma.observation.findFirst({
      where: {
        scientificName,
        lat: { gte: lat - R, lte: lat + R },
        lng: { gte: lng - R, lte: lng + R },
      },
    });

    if (existing) {
      return res.status(200).json({
        duplicate: true,
        observation: existing,
      });
    }

    const observation = await prisma.observation.create({
      data: {
        lat,
        lng,
        commonName: commonName || null,
        scientificName,
        imageUrl: imageUrl || null,
        confidence:
          typeof confidence === "number" ? confidence : null,
        pollinatorFriendly: isPollinator,
      },
    });

    let plant = await prisma.plant.findFirst({
      where: { scientific: scientificName },
    });

    if (!plant) {
      plant = await prisma.plant.create({
        data: {
          common: commonName || scientificName,
          scientific: scientificName,
          pollinatorFriendly: isPollinator,
          pollinatorNotes,
        },
      });
    } else if (plant.pollinatorFriendly === null) {
      plant = await prisma.plant.update({
        where: { id: plant.id },
        data: {
          pollinatorFriendly: isPollinator,
          pollinatorNotes,
        },
      });
    }

    const identification = await prisma.identification.create({
      data: {
        plantId: plant.id,
        latitude: lat,
        longitude: lng,
      },
    });

    return res.status(201).json({
      duplicate: false,
      observation,
      identification,
    });
  } catch (err: any) {
    console.error("POST /api/observations error", err);
    return res
      .status(500)
      .json({ error: "Failed to save observation/identification" });
  }
});

app.get("/api/observations", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 200, 500);

    const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
    const onlyWithPhotos = req.query.onlyWithPhotos === "true";
    const sort = req.query.sort === "oldest" ? "oldest" : "newest";

    const minLat = req.query.minLat ? Number(req.query.minLat) : null;
    const maxLat = req.query.maxLat ? Number(req.query.maxLat) : null;
    const minLng = req.query.minLng ? Number(req.query.minLng) : null;
    const maxLng = req.query.maxLng ? Number(req.query.maxLng) : null;

    const where: any = {};

    if (onlyWithPhotos) {
      where.imageUrl = { not: null };
    }

    if (q) {
      where.OR = [
        { commonName: { contains: q, mode: "insensitive" } },
        { scientificName: { contains: q, mode: "insensitive" } },
      ];
    }

    if (
      minLat !== null &&
      maxLat !== null &&
      minLng !== null &&
      maxLng !== null &&
      Number.isFinite(minLat) &&
      Number.isFinite(maxLat) &&
      Number.isFinite(minLng) &&
      Number.isFinite(maxLng)
    ) {
      where.lat = { gte: minLat, lte: maxLat };
      where.lng = { gte: minLng, lte: maxLng };
    }

    const observations = await prisma.observation.findMany({
      where,
      take: limit,
      orderBy: sort === "oldest" ? { createdAt: "asc" } : { createdAt: "desc" },
      select: {
        id: true,
        lat: true,
        lng: true,
        commonName: true,
        scientificName: true,
        imageUrl: true,
        confidence: true,
        pollinatorFriendly: true,
        createdAt: true,
      },
    });

    res.json(observations);
  } catch (err) {
    console.error("GET /api/observations error", err);
    res.status(500).json({ error: "Failed to fetch observations" });
  }
});

app.get("/api/tips", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 50);

    const tips = await prisma.tip.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        name: true,
        insight: true,
        tip: true,
        imageUrl: true,
        createdAt: true,
      },
    });

    res.json(tips);
  } catch (err) {
    console.error("GET /api/tips error", err);
    res.status(500).json({ error: "Failed to fetch tips" });
  }
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on http://0.0.0.0:${PORT}`);
});
