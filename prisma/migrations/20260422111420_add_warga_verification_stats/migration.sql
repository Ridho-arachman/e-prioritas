/*
  Warnings:

  - You are about to drop the column `lokasiRt` on the `masukan_warga` table. All the data in the column will be lost.
  - You are about to drop the column `lokasiRw` on the `masukan_warga` table. All the data in the column will be lost.
  - You are about to drop the column `namaPengirim` on the `masukan_warga` table. All the data in the column will be lost.
  - You are about to drop the column `nomorHp` on the `masukan_warga` table. All the data in the column will be lost.
  - You are about to drop the column `lokasiRt` on the `program_kelurahan` table. All the data in the column will be lost.
  - You are about to drop the column `lokasiRw` on the `program_kelurahan` table. All the data in the column will be lost.
  - Added the required column `lokasi` to the `masukan_warga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wargaId` to the `masukan_warga` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusNoHPWarga" AS ENUM ('TERVERIFIKASI', 'BELUM_TERVERIFIKASI');

-- AlterTable
ALTER TABLE "masukan_warga" DROP COLUMN "lokasiRt",
DROP COLUMN "lokasiRw",
DROP COLUMN "namaPengirim",
DROP COLUMN "nomorHp",
ADD COLUMN     "lokasi" TEXT NOT NULL,
ADD COLUMN     "wargaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "program_kelurahan" DROP COLUMN "lokasiRt",
DROP COLUMN "lokasiRw",
ADD COLUMN     "lokasi" TEXT;

-- CreateTable
CREATE TABLE "warga" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "noHp" VARCHAR(20) NOT NULL,
    "alamat" TEXT,
    "statusNoHp" "StatusNoHPWarga" NOT NULL DEFAULT 'BELUM_TERVERIFIKASI',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "warga_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "warga_noHp_key" ON "warga"("noHp");

-- CreateIndex
CREATE INDEX "warga_noHp_idx" ON "warga"("noHp");

-- AddForeignKey
ALTER TABLE "masukan_warga" ADD CONSTRAINT "masukan_warga_wargaId_fkey" FOREIGN KEY ("wargaId") REFERENCES "warga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
