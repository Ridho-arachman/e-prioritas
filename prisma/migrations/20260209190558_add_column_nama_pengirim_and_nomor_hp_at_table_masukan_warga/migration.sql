/*
  Warnings:

  - You are about to alter the column `lokasiRt` on the `MasukanWarga` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(3)`.
  - You are about to alter the column `lokasiRw` on the `MasukanWarga` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(3)`.

*/
-- AlterTable
ALTER TABLE "MasukanWarga" ADD COLUMN     "namaPengirim" VARCHAR(255),
ADD COLUMN     "nomorHp" VARCHAR(15),
ALTER COLUMN "lokasiRt" SET DATA TYPE VARCHAR(3),
ALTER COLUMN "lokasiRw" SET DATA TYPE VARCHAR(3);
