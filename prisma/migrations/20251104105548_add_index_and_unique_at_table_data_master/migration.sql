/*
  Warnings:

  - A unique constraint covering the columns `[jenis_data,nama_atribut,lokasi_rt,lokasi_rw]` on the table `data_master` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "data_master_jenis_data_idx" ON "data_master"("jenis_data");

-- CreateIndex
CREATE INDEX "data_master_lokasi_rt_lokasi_rw_idx" ON "data_master"("lokasi_rt", "lokasi_rw");

-- CreateIndex
CREATE UNIQUE INDEX "data_master_jenis_data_nama_atribut_lokasi_rt_lokasi_rw_key" ON "data_master"("jenis_data", "nama_atribut", "lokasi_rt", "lokasi_rw");
