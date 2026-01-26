/*
  Warnings:

  - Made the column `phoneNumber` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "phoneNumber" SET NOT NULL;

-- RenameIndex
ALTER INDEX "users_phoneNumber_key" RENAME TO "users_phone_number_unique";
