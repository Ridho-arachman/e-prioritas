-- CreateEnum
CREATE TYPE "StatusKategori" AS ENUM ('AKTIF', 'NON_AKTIF');

-- AlterTable
ALTER TABLE "kategori" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "StatusKategori" NOT NULL DEFAULT 'AKTIF';

-- CreateIndex
CREATE INDEX "kategori_status_idx" ON "kategori"("status");
