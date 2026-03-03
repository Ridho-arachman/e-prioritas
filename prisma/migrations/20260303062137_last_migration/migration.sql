-- DropForeignKey
ALTER TABLE "kegiatan_rapat_masukan" DROP CONSTRAINT "kegiatan_rapat_masukan_kegiatanRapatId_fkey";

-- AddForeignKey
ALTER TABLE "kegiatan_rapat_masukan" ADD CONSTRAINT "kegiatan_rapat_masukan_kegiatanRapatId_fkey" FOREIGN KEY ("kegiatanRapatId") REFERENCES "kegiatan_rapat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
