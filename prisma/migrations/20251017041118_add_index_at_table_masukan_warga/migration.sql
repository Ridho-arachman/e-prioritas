/*
  Warnings:

  - Added the required column `updated_at` to the `masukan_warga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "masukan_warga" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "masukan_warga_email_pengirim_idx" ON "masukan_warga"("email_pengirim");

-- CreateIndex
CREATE INDEX "masukan_warga_created_at_idx" ON "masukan_warga"("created_at");

-- CreateIndex
CREATE INDEX "masukan_warga_nama_pengirim_idx" ON "masukan_warga"("nama_pengirim");

-- CreateIndex
CREATE INDEX "masukan_warga_status_idx" ON "masukan_warga"("status");

-- CreateIndex
CREATE INDEX "masukan_warga_kategori_id_idx" ON "masukan_warga"("kategori_id");
