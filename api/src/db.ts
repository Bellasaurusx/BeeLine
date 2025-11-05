import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ?? new PrismaClient({ log: ["warn", "error"] });
  
  prisma
  .$connect()
  .then(() => console.log("✅ Connected to PostgreSQL via Prisma"))
  .catch((err) =>
    console.error("❌ PostgreSQL connection error:", err.message)
  );

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
