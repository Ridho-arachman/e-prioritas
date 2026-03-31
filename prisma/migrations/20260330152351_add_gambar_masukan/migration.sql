-- CreateTable
CREATE TABLE "gambar_masukan" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "masukanId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gambar_masukan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gambar_masukan" ADD CONSTRAINT "gambar_masukan_masukanId_fkey" FOREIGN KEY ("masukanId") REFERENCES "masukan_warga"("id") ON DELETE CASCADE ON UPDATE CASCADE;
