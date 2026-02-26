/*
  Warnings:

  - You are about to drop the column `itemPrioritasId` on the `kegiatan_rapat_masukan` table. All the data in the column will be lost.
  - You are about to drop the column `tipeRelasi` on the `kegiatan_rapat_masukan` table. All the data in the column will be lost.
  - You are about to drop the `item_prioritas` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[kegiatanRapatId,masukanId]` on the table `kegiatan_rapat_masukan` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "item_prioritas" DROP CONSTRAINT "item_prioritas_diprosesOlehId_fkey";

-- DropForeignKey
ALTER TABLE "item_prioritas" DROP CONSTRAINT "item_prioritas_domainIsuId_fkey";

-- DropForeignKey
ALTER TABLE "item_prioritas" DROP CONSTRAINT "item_prioritas_kegiatanRapatId_fkey";

-- DropForeignKey
ALTER TABLE "kegiatan_rapat_masukan" DROP CONSTRAINT "kegiatan_rapat_masukan_itemPrioritasId_fkey";

-- DropIndex
DROP INDEX "kegiatan_rapat_masukan_itemPrioritasId_idx";

-- DropIndex
DROP INDEX "kegiatan_rapat_masukan_kegiatanRapatId_masukanId_itemPriori_key";

-- AlterTable
ALTER TABLE "kegiatan_rapat_masukan" DROP COLUMN "itemPrioritasId",
DROP COLUMN "tipeRelasi";

-- DropTable
DROP TABLE "item_prioritas";

-- DropEnum
DROP TYPE "TipeRelasiMasukan";

-- CreateIndex
CREATE UNIQUE INDEX "kegiatan_rapat_masukan_kegiatanRapatId_masukanId_key" ON "kegiatan_rapat_masukan"("kegiatanRapatId", "masukanId");
