const { PrismaClient } = require("@prisma/client");
const tips = require("./tips.seed.json");

const prisma = new PrismaClient();

async function main() {
  if (!Array.isArray(tips) || tips.length === 0) {
    throw new Error("tips.seed.json is empty or not an array");
  }

  const result = await prisma.tip.createMany({
    data: tips.map((t) => ({
      name: t.name,
      insight: t.insight,
      tip: t.tip,
      imageUrl: t.imageUrl ?? null,
    })),
    skipDuplicates: true,
  });

  console.log(`Inserted ${result.count} tips (skipped duplicates).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
