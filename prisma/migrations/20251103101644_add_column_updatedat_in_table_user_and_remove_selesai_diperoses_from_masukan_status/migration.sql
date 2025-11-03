/*
  Warnings:

  - The values [SELESAI_DIPROSES] on the enum `MasukanStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `nama_pengirim` on the `masukan_warga` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `jabatan` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `email_verification_tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MasukanStatus_new" AS ENUM ('MENUNGGU_VERIFIKASI', 'DITERIMA', 'DITOLAK');
ALTER TABLE "public"."masukan_warga" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "masukan_warga" ALTER COLUMN "status" TYPE "MasukanStatus_new" USING ("status"::text::"MasukanStatus_new");
ALTER TYPE "MasukanStatus" RENAME TO "MasukanStatus_old";
ALTER TYPE "MasukanStatus_new" RENAME TO "MasukanStatus";
DROP TYPE "public"."MasukanStatus_old";
ALTER TABLE "masukan_warga" ALTER COLUMN "status" SET DEFAULT 'MENUNGGU_VERIFIKASI';
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."email_verification_tokens" DROP CONSTRAINT "email_verification_tokens_user_id_fkey";

-- AlterTable
ALTER TABLE "masukan_warga" ALTER COLUMN "nama_pengirim" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "jabatan" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "public"."email_verification_tokens";
