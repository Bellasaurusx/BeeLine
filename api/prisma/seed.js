const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.observation.createMany({
    data: [
      { lat: 41.6218, lng: -87.0589, commonName: "Milkweed", scientificName: "Asclepias syriaca" },
      { lat: 41.6262, lng: -87.0535, commonName: "Purple Coneflower", scientificName: "Echinacea purpurea" },
      { lat: 41.6189, lng: -87.0641, commonName: "Bee Balm", scientificName: "Monarda didyma" }
    ],
    skipDuplicates: true,
  });
  console.log("Seeded observations ✅");
}

main().catch(console.error).finally(() => prisma.$disconnect());
