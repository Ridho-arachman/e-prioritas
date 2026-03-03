-- CreateTable
CREATE TABLE "kegiatan_rapat_data_master" (
    "id" TEXT NOT NULL,
    "kegiatanRapatId" TEXT NOT NULL,
    "dataMasterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "kegiatan_rapat_data_master_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "kegiatan_rapat_data_master_kegiatanRapatId_idx" ON "kegiatan_rapat_data_master"("kegiatanRapatId");

-- CreateIndex
CREATE INDEX "kegiatan_rapat_data_master_dataMasterId_idx" ON "kegiatan_rapat_data_master"("dataMasterId");

-- CreateIndex
CREATE UNIQUE INDEX "kegiatan_rapat_data_master_kegiatanRapatId_dataMasterId_key" ON "kegiatan_rapat_data_master"("kegiatanRapatId", "dataMasterId");

-- AddForeignKey
ALTER TABLE "kegiatan_rapat_data_master" ADD CONSTRAINT "kegiatan_rapat_data_master_kegiatanRapatId_fkey" FOREIGN KEY ("kegiatanRapatId") REFERENCES "kegiatan_rapat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_rapat_data_master" ADD CONSTRAINT "kegiatan_rapat_data_master_dataMasterId_fkey" FOREIGN KEY ("dataMasterId") REFERENCES "data_master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
