-- CreateIndex
CREATE INDEX "Observation_createdAt_idx" ON "Observation"("createdAt");

-- CreateIndex
CREATE INDEX "Observation_scientificName_idx" ON "Observation"("scientificName");

-- CreateIndex
CREATE INDEX "Observation_lat_lng_idx" ON "Observation"("lat", "lng");
