-- CreateEnum
CREATE TYPE "Role" AS ENUM ('LURAH', 'PERANGKAT_DESA', 'ADMIN');

-- CreateEnum
CREATE TYPE "StatusMasukan" AS ENUM ('MENUNGGU', 'DIVERIFIKASI', 'DITOLAK', 'DIPROSES', 'DISELESAIKAN');

-- CreateEnum
CREATE TYPE "StatusRekomendasi" AS ENUM ('DRAFT', 'DIAJUKAN', 'DISETUJUI', 'DITOLAK');

-- CreateEnum
CREATE TYPE "NilaiKritikalitas" AS ENUM ('KRITIS', 'TINGGI', 'SEDANG', 'RENDAH');

-- CreateEnum
CREATE TYPE "ModeRekomendasi" AS ENUM ('FUSI_DATA', 'DATA_MASTER_SAJA');

-- CreateEnum
CREATE TYPE "TipeRelasiMasukan" AS ENUM ('LANGSUNG', 'PENDUKUNG');

-- CreateTable
CREATE TABLE "domain_isu" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "deskripsi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "domain_isu_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "masukan_warga" (
    "id" TEXT NOT NULL,
    "namaPengirim" VARCHAR(255),
    "nomorHp" VARCHAR(15),
    "judul" VARCHAR(255) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "lokasiRt" VARCHAR(3) NOT NULL,
    "lokasiRw" VARCHAR(3) NOT NULL,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "lockedAt" TIMESTAMP(3),
    "domainIsuId" TEXT NOT NULL,
    "status" "StatusMasukan" NOT NULL DEFAULT 'MENUNGGU',
    "alasanPenolakan" TEXT,
    "diverifikasiOlehId" TEXT,
    "isRelevant" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "masukan_warga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_master" (
    "id" TEXT NOT NULL,
    "domainIsuId" TEXT NOT NULL,
    "namaAtribut" VARCHAR(100) NOT NULL,
    "kritikalitas" "NilaiKritikalitas" NOT NULL,
    "jumlah" INTEGER,
    "lokasiRt" VARCHAR(3),
    "lokasiRw" VARCHAR(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "tahunData" INTEGER,
    "sumberData" VARCHAR(100),
    "diprosesOlehId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "data_master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kegiatan_rapat" (
    "id" TEXT NOT NULL,
    "judul" VARCHAR(255) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "lokasi" VARCHAR(100),
    "domainIsuId" TEXT NOT NULL,
    "dibuatOlehId" TEXT NOT NULL,
    "mode" "ModeRekomendasi" NOT NULL,
    "judulLaporan" VARCHAR(255) NOT NULL,
    "rekomendasiItems" JSONB NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "statusRekomendasi" "StatusRekomendasi" NOT NULL DEFAULT 'DRAFT',
    "aiModel" TEXT,
    "aiProcessedAt" TIMESTAMP(3),
    "diprosesOlehId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kegiatan_rapat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_prioritas" (
    "id" TEXT NOT NULL,
    "kegiatanRapatId" TEXT NOT NULL,
    "prioritasKe" INTEGER NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "skorPrioritas" DOUBLE PRECISION NOT NULL,
    "alasanAnalisis" TEXT NOT NULL,
    "domainIsuId" TEXT NOT NULL,
    "lokasiRt" VARCHAR(3),
    "lokasiRw" VARCHAR(3),
    "fingerprint" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DIAJUKAN',
    "diprosesOlehId" TEXT,
    "catatanImplementasi" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_prioritas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kegiatan_rapat_masukan" (
    "id" TEXT NOT NULL,
    "kegiatanRapatId" TEXT NOT NULL,
    "masukanId" TEXT NOT NULL,
    "itemPrioritasId" TEXT,
    "tipeRelasi" "TipeRelasiMasukan" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "kegiatan_rapat_masukan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "role" TEXT,
    "phoneNumber" TEXT,
    "jabatan" TEXT,
    "isActive" BOOLEAN,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "domain_isu_code_key" ON "domain_isu"("code");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "masukan_warga_status_idx" ON "masukan_warga"("status");

-- CreateIndex
CREATE INDEX "masukan_warga_isRelevant_idx" ON "masukan_warga"("isRelevant");

-- CreateIndex
CREATE INDEX "masukan_warga_domainIsuId_idx" ON "masukan_warga"("domainIsuId");

-- CreateIndex
CREATE INDEX "data_master_isActive_idx" ON "data_master"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "data_master_domainIsuId_namaAtribut_lokasiRt_lokasiRw_key" ON "data_master"("domainIsuId", "namaAtribut", "lokasiRt", "lokasiRw");

-- CreateIndex
CREATE UNIQUE INDEX "kegiatan_rapat_fingerprint_key" ON "kegiatan_rapat"("fingerprint");

-- CreateIndex
CREATE INDEX "kegiatan_rapat_statusRekomendasi_idx" ON "kegiatan_rapat"("statusRekomendasi");

-- CreateIndex
CREATE INDEX "kegiatan_rapat_fingerprint_idx" ON "kegiatan_rapat"("fingerprint");

-- CreateIndex
CREATE INDEX "kegiatan_rapat_domainIsuId_idx" ON "kegiatan_rapat"("domainIsuId");

-- CreateIndex
CREATE UNIQUE INDEX "item_prioritas_fingerprint_key" ON "item_prioritas"("fingerprint");

-- CreateIndex
CREATE INDEX "item_prioritas_fingerprint_idx" ON "item_prioritas"("fingerprint");

-- CreateIndex
CREATE INDEX "item_prioritas_status_idx" ON "item_prioritas"("status");

-- CreateIndex
CREATE INDEX "item_prioritas_kegiatanRapatId_idx" ON "item_prioritas"("kegiatanRapatId");

-- CreateIndex
CREATE INDEX "kegiatan_rapat_masukan_kegiatanRapatId_idx" ON "kegiatan_rapat_masukan"("kegiatanRapatId");

-- CreateIndex
CREATE INDEX "kegiatan_rapat_masukan_masukanId_idx" ON "kegiatan_rapat_masukan"("masukanId");

-- CreateIndex
CREATE INDEX "kegiatan_rapat_masukan_itemPrioritasId_idx" ON "kegiatan_rapat_masukan"("itemPrioritasId");

-- CreateIndex
CREATE UNIQUE INDEX "kegiatan_rapat_masukan_kegiatanRapatId_masukanId_itemPriori_key" ON "kegiatan_rapat_masukan"("kegiatanRapatId", "masukanId", "itemPrioritasId");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- AddForeignKey
ALTER TABLE "masukan_warga" ADD CONSTRAINT "masukan_warga_domainIsuId_fkey" FOREIGN KEY ("domainIsuId") REFERENCES "domain_isu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "masukan_warga" ADD CONSTRAINT "masukan_warga_diverifikasiOlehId_fkey" FOREIGN KEY ("diverifikasiOlehId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_master" ADD CONSTRAINT "data_master_domainIsuId_fkey" FOREIGN KEY ("domainIsuId") REFERENCES "domain_isu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_master" ADD CONSTRAINT "data_master_diprosesOlehId_fkey" FOREIGN KEY ("diprosesOlehId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_rapat" ADD CONSTRAINT "kegiatan_rapat_domainIsuId_fkey" FOREIGN KEY ("domainIsuId") REFERENCES "domain_isu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_rapat" ADD CONSTRAINT "kegiatan_rapat_dibuatOlehId_fkey" FOREIGN KEY ("dibuatOlehId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_rapat" ADD CONSTRAINT "kegiatan_rapat_diprosesOlehId_fkey" FOREIGN KEY ("diprosesOlehId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_prioritas" ADD CONSTRAINT "item_prioritas_kegiatanRapatId_fkey" FOREIGN KEY ("kegiatanRapatId") REFERENCES "kegiatan_rapat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_prioritas" ADD CONSTRAINT "item_prioritas_domainIsuId_fkey" FOREIGN KEY ("domainIsuId") REFERENCES "domain_isu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_prioritas" ADD CONSTRAINT "item_prioritas_diprosesOlehId_fkey" FOREIGN KEY ("diprosesOlehId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_rapat_masukan" ADD CONSTRAINT "kegiatan_rapat_masukan_kegiatanRapatId_fkey" FOREIGN KEY ("kegiatanRapatId") REFERENCES "kegiatan_rapat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_rapat_masukan" ADD CONSTRAINT "kegiatan_rapat_masukan_masukanId_fkey" FOREIGN KEY ("masukanId") REFERENCES "masukan_warga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_rapat_masukan" ADD CONSTRAINT "kegiatan_rapat_masukan_itemPrioritasId_fkey" FOREIGN KEY ("itemPrioritasId") REFERENCES "item_prioritas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
