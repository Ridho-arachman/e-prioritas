/*
  Warnings:

  - You are about to drop the column `lokasi_rtrw` on the `data_master` table. All the data in the column will be lost.
  - You are about to drop the column `lokasi_rtrw` on the `masukan_warga` table. All the data in the column will be lost.
  - Added the required column `lokasi_rt` to the `masukan_warga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasi_rw` to the `masukan_warga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "data_master" DROP COLUMN "lokasi_rtrw",
ADD COLUMN     "lokasi_rt" VARCHAR(3),
ADD COLUMN     "lokasi_rw" VARCHAR(3);

-- AlterTable
ALTER TABLE "masukan_warga" DROP COLUMN "lokasi_rtrw",
ADD COLUMN     "lokasi_rt" VARCHAR(3) NOT NULL,
ADD COLUMN     "lokasi_rw" VARCHAR(3) NOT NULL;
