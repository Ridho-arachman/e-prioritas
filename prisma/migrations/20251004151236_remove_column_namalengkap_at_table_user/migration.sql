/*
  Warnings:

  - You are about to drop the column `nama_lengkap` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "nama_lengkap",
ALTER COLUMN "role" SET DEFAULT 'PERANGKAT_DESA';
