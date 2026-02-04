/*
  Warnings:

  - You are about to drop the `data_master` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kategori` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `masukan_warga` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rekomendasi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rekomendasi_masukan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "StatusMasukan" AS ENUM ('MENUNGGU', 'DIVERIFIKASI', 'DITOLAK');

-- CreateEnum
CREATE TYPE "StatusRekomendasi" AS ENUM ('DRAFT', 'DIAJUKAN', 'DISETUJUI', 'DITOLAK');

-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "data_master" DROP CONSTRAINT "data_master_updated_by_user_id_fkey";

-- DropForeignKey
ALTER TABLE "masukan_warga" DROP CONSTRAINT "masukan_warga_kategori_id_fkey";

-- DropForeignKey
ALTER TABLE "masukan_warga" DROP CONSTRAINT "masukan_warga_verified_by_user_id_fkey";

-- DropForeignKey
ALTER TABLE "rekomendasi" DROP CONSTRAINT "rekomendasi_processed_by_user_id_fkey";

-- DropForeignKey
ALTER TABLE "rekomendasi_masukan" DROP CONSTRAINT "rekomendasi_masukan_masukan_id_fkey";

-- DropForeignKey
ALTER TABLE "rekomendasi_masukan" DROP CONSTRAINT "rekomendasi_masukan_rekomendasi_id_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";

-- AlterTable
ALTER TABLE "session" ADD COLUMN     "isActive" BOOLEAN,
ADD COLUMN     "jabatan" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- DropTable
DROP TABLE "data_master";

-- DropTable
DROP TABLE "kategori";

-- DropTable
DROP TABLE "masukan_warga";

-- DropTable
DROP TABLE "rekomendasi";

-- DropTable
DROP TABLE "rekomendasi_masukan";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "JenisDataMaster";

-- DropEnum
DROP TYPE "MasukanStatus";

-- DropEnum
DROP TYPE "StatusKategori";

-- CreateTable
CREATE TABLE "DomainIsu" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "deskripsi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DomainIsu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "jabatan" VARCHAR(100),
    "role" "Role" NOT NULL DEFAULT 'PERANGKAT_DESA',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "phoneNumber" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasukanWarga" (
    "id" TEXT NOT NULL,
    "judul" VARCHAR(255) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "lokasiRt" INTEGER NOT NULL,
    "lokasiRw" INTEGER NOT NULL,
    "domainIsuId" TEXT NOT NULL,
    "status" "StatusMasukan" NOT NULL DEFAULT 'MENUNGGU',
    "diverifikasiOlehId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MasukanWarga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataMaster" (
    "id" TEXT NOT NULL,
    "domainIsuId" TEXT NOT NULL,
    "namaAtribut" VARCHAR(100) NOT NULL,
    "nilai" VARCHAR(255) NOT NULL,
    "jumlah" INTEGER,
    "lokasiRt" INTEGER,
    "lokasiRw" INTEGER,
    "sumberData" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DataMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rekomendasi" (
    "id" TEXT NOT NULL,
    "kegiatanRapatId" TEXT NOT NULL,
    "domainIsuId" TEXT NOT NULL,
    "judul" VARCHAR(255) NOT NULL,
    "ringkasan" VARCHAR(500) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "skorPrioritas" DOUBLE PRECISION NOT NULL,
    "status" "StatusRekomendasi" NOT NULL DEFAULT 'DRAFT',
    "laporanLengkap" JSONB NOT NULL,
    "diprosesOlehId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rekomendasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RekomendasiMasukan" (
    "rekomendasiId" TEXT NOT NULL,
    "masukanId" TEXT NOT NULL,

    CONSTRAINT "RekomendasiMasukan_pkey" PRIMARY KEY ("rekomendasiId","masukanId")
);

-- CreateTable
CREATE TABLE "KegiatanRapat" (
    "id" TEXT NOT NULL,
    "judul" VARCHAR(255) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "lokasi" VARCHAR(100),
    "domainIsuId" TEXT,
    "dibuatOlehId" TEXT NOT NULL,
    "aiModel" TEXT,
    "aiPromptHash" TEXT,
    "aiProcessedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KegiatanRapat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DomainIsu_code_key" ON "DomainIsu"("code");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DataMaster_domainIsuId_namaAtribut_lokasiRt_lokasiRw_key" ON "DataMaster"("domainIsuId", "namaAtribut", "lokasiRt", "lokasiRw");

-- AddForeignKey
ALTER TABLE "MasukanWarga" ADD CONSTRAINT "MasukanWarga_domainIsuId_fkey" FOREIGN KEY ("domainIsuId") REFERENCES "DomainIsu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasukanWarga" ADD CONSTRAINT "MasukanWarga_diverifikasiOlehId_fkey" FOREIGN KEY ("diverifikasiOlehId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataMaster" ADD CONSTRAINT "DataMaster_domainIsuId_fkey" FOREIGN KEY ("domainIsuId") REFERENCES "DomainIsu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rekomendasi" ADD CONSTRAINT "Rekomendasi_kegiatanRapatId_fkey" FOREIGN KEY ("kegiatanRapatId") REFERENCES "KegiatanRapat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rekomendasi" ADD CONSTRAINT "Rekomendasi_domainIsuId_fkey" FOREIGN KEY ("domainIsuId") REFERENCES "DomainIsu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rekomendasi" ADD CONSTRAINT "Rekomendasi_diprosesOlehId_fkey" FOREIGN KEY ("diprosesOlehId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RekomendasiMasukan" ADD CONSTRAINT "RekomendasiMasukan_rekomendasiId_fkey" FOREIGN KEY ("rekomendasiId") REFERENCES "Rekomendasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RekomendasiMasukan" ADD CONSTRAINT "RekomendasiMasukan_masukanId_fkey" FOREIGN KEY ("masukanId") REFERENCES "MasukanWarga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KegiatanRapat" ADD CONSTRAINT "KegiatanRapat_domainIsuId_fkey" FOREIGN KEY ("domainIsuId") REFERENCES "DomainIsu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KegiatanRapat" ADD CONSTRAINT "KegiatanRapat_dibuatOlehId_fkey" FOREIGN KEY ("dibuatOlehId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
