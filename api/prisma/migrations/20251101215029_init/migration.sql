-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "common" TEXT NOT NULL,
    "scientific" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Identification" (
    "id" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "identifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Identification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Identification_identifiedAt_idx" ON "Identification"("identifiedAt");

-- AddForeignKey
ALTER TABLE "Identification" ADD CONSTRAINT "Identification_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
