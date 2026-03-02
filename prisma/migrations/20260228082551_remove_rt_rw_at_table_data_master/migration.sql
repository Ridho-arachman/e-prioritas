/*
  Warnings:

  - You are about to drop the column `lokasiRt` on the `data_master` table. All the data in the column will be lost.
  - You are about to drop the column `lokasiRw` on the `data_master` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[domainIsuId,namaAtribut]` on the table `data_master` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "data_master_domainIsuId_namaAtribut_lokasiRt_lokasiRw_key";

-- AlterTable
ALTER TABLE "data_master" DROP COLUMN "lokasiRt",
DROP COLUMN "lokasiRw";

-- CreateIndex
CREATE UNIQUE INDEX "data_master_domainIsuId_namaAtribut_key" ON "data_master"("domainIsuId", "namaAtribut");
