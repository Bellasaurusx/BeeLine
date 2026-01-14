/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Tip` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tip_name_key" ON "Tip"("name");
