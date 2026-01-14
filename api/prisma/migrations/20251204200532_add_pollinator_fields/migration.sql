-- AlterTable
ALTER TABLE "Observation" ADD COLUMN     "pollinatorFriendly" BOOLEAN;

-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "pollinatorFriendly" BOOLEAN,
ADD COLUMN     "pollinatorNotes" TEXT;
