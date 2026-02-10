import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { prisma } from "./db";
import { Prisma } from "@prisma/client";
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
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getPollinatorSpeciesInfo(scientificName?: string, commonName?: string) {
  const rawSci = (scientificName || "").trim();
  const sci2 = normalizeScientificName(rawSci);

  const rawSciNorm = normalizeName(rawSci);
  const sci2Norm = normalizeName(sci2);

  const info =
    POLLINATOR_SPECIES[rawSci] ||
    POLLINATOR_SPECIES[sci2] ||
    POLLINATOR_SPECIES[rawSciNorm] ||
    POLLINATOR_SPECIES[sci2Norm];

  if (info) return info;

  const commonNorm = normalizeName(commonName || "");
  if (commonNorm) {
    for (const [key, val] of Object.entries(POLLINATOR_SPECIES)) {
      if (normalizeName(key) === commonNorm) return val;
    }
  }

  return null;
}

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (_req, res) => {
  res.send("BeeLine API is running");
});

app.post("/api/pollinator-check", (req, res) => {
  try {
    const { scientificName, commonName } = req.body ?? {};
    const info = getPollinatorSpeciesInfo(scientificName, commonName);

    return res.json({
      pollinatorFriendly: info ? info.friendly : null,
      pollinatorNotes: info ? info.notes : null,
      pollinatorData: info ? info : null,
    });
  } catch (err) {
    console.error("pollinator-check error", err);
    return res.status(500).json({ error: "pollinator-check failed" });
  }
});

app.post("/api/observations", async (req, res) => {
  try {
    const { commonName, scientificName, imageUrl, lat, lng, confidence } = req.body ?? {};

    if (typeof lat !== "number" || typeof lng !== "number" || !scientificName) {
      return res.status(400).json({ error: "lat, lng, and scientificName are required" });
    }

    const rawSci = scientificName.trim();
    const simpleSci = normalizeScientificName(rawSci);

    const speciesInfo =
      getPollinatorSpeciesInfo(rawSci, commonName) || getPollinatorSpeciesInfo(simpleSci, commonName);

    const isPollinator = speciesInfo?.friendly ?? null;
    const pollinatorNotes = speciesInfo?.notes ?? null;

    const pollinatorData =
      speciesInfo
        ? (speciesInfo as unknown as Prisma.InputJsonValue)
        : Prisma.DbNull;



    const R = 0.0005;
    const existing = await prisma.observation.findFirst({
      where: {
        scientificName: rawSci,
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
        scientificName: rawSci,
        imageUrl: imageUrl || null,
        confidence: typeof confidence === "number" ? confidence : null,
        pollinatorFriendly: isPollinator,
      },
    });

    let plant = await prisma.plant.findFirst({
      where: { scientific: rawSci },
    });

    if (!plant) {
      plant = await prisma.plant.create({
        data: {
          common: commonName || rawSci,
          scientific: rawSci,
          pollinatorFriendly: isPollinator,
          pollinatorNotes,
          pollinatorData,
        },
      });
    } else {
      plant = await prisma.plant.update({
        where: { id: plant.id },
        data: {
          common: plant.common || commonName || rawSci,
          pollinatorFriendly: plant.pollinatorFriendly ?? isPollinator,
          pollinatorNotes: plant.pollinatorNotes ?? pollinatorNotes,
          pollinatorData:
            (plant.pollinatorData as any) ?? (pollinatorData == null ? undefined : pollinatorData),
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
      plant,
    });
  } catch (err: any) {
    console.error("POST /api/observations error", err);
    return res.status(500).json({ error: "Failed to save observation/identification" });
  }
});

app.get("/api/observations", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 200, 500);

    const sort = typeof req.query.sort === "string" ? req.query.sort : "newest";
    const orderBy =
      sort === "oldest" ? ({ createdAt: "asc" } as const) : ({ createdAt: "desc" } as const);

    const q = typeof req.query.q === "string" ? req.query.q.trim() : "";

    const args: Prisma.ObservationFindManyArgs = {
      orderBy,
      take: limit,
      ...(q
        ? {
            where: {
              OR: [
                { commonName: { contains: q, mode: "insensitive" } },
                { scientificName: { contains: q, mode: "insensitive" } },
              ],
            },
          }
        : {}),
    };

    const rows = await prisma.observation.findMany(args);

    const scientificList = Array.from(
      new Set(rows.map((r) => (r.scientificName || "").trim()).filter(Boolean))
    );

    const plants = scientificList.length
      ? await prisma.plant.findMany({
          where: { scientific: { in: scientificList } },
          select: {
            scientific: true,
            pollinatorFriendly: true,
            pollinatorNotes: true,
            pollinatorData: true,
          },
        })
      : [];

    const plantBySci = new Map(plants.map((p) => [p.scientific, p]));

    const merged = rows.map((r) => {
      const p = plantBySci.get((r.scientificName || "").trim());
      return {
        ...r,
        pollinatorFriendly: r.pollinatorFriendly ?? p?.pollinatorFriendly ?? null,
        pollinatorNotes: p?.pollinatorNotes ?? null,
        pollinatorData: p?.pollinatorData ?? null,
      };
    });

    return res.json(merged);
  } catch (err) {
    console.error("GET /api/observations error", err);
    return res.status(500).json({ error: "Failed to load observations" });
  }
});

app.get("/api/plants/by-scientific", async (req, res) => {
  try {
    const name = typeof req.query.name === "string" ? req.query.name.trim() : "";
    if (!name) return res.status(400).json({ error: "name is required" });

    const raw = name;
    const simple = normalizeScientificName(raw);

    const plant =
      (await prisma.plant.findFirst({ where: { scientific: raw } })) ||
      (await prisma.plant.findFirst({ where: { scientific: simple } }));

    if (!plant) return res.status(404).json({ error: "Plant not found" });

    return res.json(plant);
  } catch (err) {
    console.error("GET /api/plants/by-scientific error", err);
    return res.status(500).json({ error: "Failed to load plant" });
  }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`BeeLine API listening on port ${PORT}`);
});

