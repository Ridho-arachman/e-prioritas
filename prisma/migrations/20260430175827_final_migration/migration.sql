/*
  Warnings:

  - You are about to alter the column `fingerprint` on the `kegiatan_rapat` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `aiModel` on the `kegiatan_rapat` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `nama` on the `warga` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `noHp` on the `warga` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(64)`.

*/
-- AlterTable
ALTER TABLE "kegiatan_rapat" ALTER COLUMN "fingerprint" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "aiModel" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "warga" ALTER COLUMN "nama" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "noHp" SET DATA TYPE VARCHAR(64);
