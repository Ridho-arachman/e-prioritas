/*
  Warnings:

  - Changed the type of `jenis_data` on the `data_master` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "JenisDataMaster" AS ENUM ('KEPENDUDUKAN', 'INFRASTRUKTUR', 'EKONOMI', 'KESEHATAN', 'PENDIDIKAN', 'KEAMANAN', 'LINGKUNGAN', 'SOSIAL_BUDAYA', 'PEMERINTAHAN', 'TEKNOLOGI');

-- AlterTable
ALTER TABLE "data_master" DROP COLUMN "jenis_data",
ADD COLUMN     "jenis_data" "JenisDataMaster" NOT NULL;

-- CreateIndex
CREATE INDEX "data_master_jenis_data_idx" ON "data_master"("jenis_data");

-- CreateIndex
CREATE UNIQUE INDEX "data_master_jenis_data_nama_atribut_lokasi_rt_lokasi_rw_key" ON "data_master"("jenis_data", "nama_atribut", "lokasi_rt", "lokasi_rw");
