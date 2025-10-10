/*
  Warnings:

  - You are about to drop the column `kode_unik` on the `masukan_warga` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."masukan_warga_kode_unik_key";

-- AlterTable
ALTER TABLE "masukan_warga" DROP COLUMN "kode_unik";
