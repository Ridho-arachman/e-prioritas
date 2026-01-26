/*
  Warnings:

  - Added the required column `jumlah` to the `data_master` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "data_master" ADD COLUMN     "jumlah" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "rekomendasi" ALTER COLUMN "tanggal_proses" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "tanggal_proses" SET DATA TYPE TIMESTAMP(3);
