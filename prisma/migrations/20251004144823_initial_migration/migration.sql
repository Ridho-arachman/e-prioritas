-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'PERANGKAT_DESA');

-- CreateEnum
CREATE TYPE "MasukanStatus" AS ENUM ('MENUNGGU_VERIFIKASI', 'DITERIMA', 'DITOLAK', 'SELESAI_DIPROSES');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategori" (
    "id" TEXT NOT NULL,
    "nama_kategori" TEXT NOT NULL,
    "deskripsi" TEXT,

    CONSTRAINT "kategori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "masukan_warga" (
    "id" TEXT NOT NULL,
    "kode_unik" TEXT NOT NULL,
    "nama_pengirim" TEXT,
    "email_pengirim" TEXT,
    "lokasi_rtrw" TEXT NOT NULL,
    "deskripsi_masukan" TEXT NOT NULL,
    "status" "MasukanStatus" NOT NULL DEFAULT 'MENUNGGU_VERIFIKASI',
    "alasan_penolakan" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kategori_id" TEXT NOT NULL,
    "verified_by_user_id" TEXT,

    CONSTRAINT "masukan_warga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_master" (
    "id" TEXT NOT NULL,
    "jenis_data" TEXT NOT NULL,
    "nama_atribut" TEXT NOT NULL,
    "nilai" TEXT NOT NULL,
    "lokasi_rtrw" TEXT,
    "updated_by_user_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "data_master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rekomendasi" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "tanggal_proses" DATE NOT NULL,
    "prioritas_1_deskripsi" TEXT NOT NULL,
    "prioritas_1_skor" DOUBLE PRECISION NOT NULL,
    "laporan_lengkap" JSONB,
    "processed_by_user_id" TEXT NOT NULL,

    CONSTRAINT "rekomendasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rekomendasi_masukan" (
    "rekomendasi_id" TEXT NOT NULL,
    "masukan_id" TEXT NOT NULL,

    CONSTRAINT "rekomendasi_masukan_pkey" PRIMARY KEY ("rekomendasi_id","masukan_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "kategori_nama_kategori_key" ON "kategori"("nama_kategori");

-- CreateIndex
CREATE UNIQUE INDEX "masukan_warga_kode_unik_key" ON "masukan_warga"("kode_unik");

-- AddForeignKey
ALTER TABLE "masukan_warga" ADD CONSTRAINT "masukan_warga_kategori_id_fkey" FOREIGN KEY ("kategori_id") REFERENCES "kategori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "masukan_warga" ADD CONSTRAINT "masukan_warga_verified_by_user_id_fkey" FOREIGN KEY ("verified_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_master" ADD CONSTRAINT "data_master_updated_by_user_id_fkey" FOREIGN KEY ("updated_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rekomendasi" ADD CONSTRAINT "rekomendasi_processed_by_user_id_fkey" FOREIGN KEY ("processed_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rekomendasi_masukan" ADD CONSTRAINT "rekomendasi_masukan_rekomendasi_id_fkey" FOREIGN KEY ("rekomendasi_id") REFERENCES "rekomendasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rekomendasi_masukan" ADD CONSTRAINT "rekomendasi_masukan_masukan_id_fkey" FOREIGN KEY ("masukan_id") REFERENCES "masukan_warga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
