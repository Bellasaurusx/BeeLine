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
