import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { prisma } from "./db";

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

app.get("/api/observations", async (_req, res) => {
  try {
    const observations = await prisma.observation.findMany({
      orderBy: { createdAt: "desc" },
      take: 500,
    });
    res.json(observations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch observations" });
  }
});


const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on http://0.0.0.0:${PORT}`);
});
