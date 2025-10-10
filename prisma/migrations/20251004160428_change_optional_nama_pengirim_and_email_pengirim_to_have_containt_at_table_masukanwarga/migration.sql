/*
  Warnings:

  - Made the column `nama_pengirim` on table `masukan_warga` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email_pengirim` on table `masukan_warga` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "masukan_warga" ALTER COLUMN "nama_pengirim" SET NOT NULL,
ALTER COLUMN "email_pengirim" SET NOT NULL;
