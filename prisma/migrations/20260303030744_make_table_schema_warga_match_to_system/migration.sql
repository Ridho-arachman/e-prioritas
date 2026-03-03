/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `masukan_warga` table. All the data in the column will be lost.
  - You are about to drop the column `isLocked` on the `masukan_warga` table. All the data in the column will be lost.
  - You are about to drop the column `isRelevant` on the `masukan_warga` table. All the data in the column will be lost.
  - You are about to drop the column `lockedAt` on the `masukan_warga` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "masukan_warga_isRelevant_idx";

-- AlterTable
ALTER TABLE "masukan_warga" DROP COLUMN "expiresAt",
DROP COLUMN "isLocked",
DROP COLUMN "isRelevant",
DROP COLUMN "lockedAt";
