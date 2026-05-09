/*
  Warnings:

  - You are about to drop the column `mode` on the `kegiatan_rapat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "kegiatan_rapat" DROP COLUMN "mode";

-- DropEnum
DROP TYPE "ModeRekomendasi";
