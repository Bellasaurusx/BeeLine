-- CreateTable
CREATE TABLE "Tip" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "insight" TEXT NOT NULL,
    "tip" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Tip_createdAt_idx" ON "Tip"("createdAt");
