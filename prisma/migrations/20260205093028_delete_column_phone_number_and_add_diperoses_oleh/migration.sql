/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DataMaster" ADD COLUMN     "diprosesOlehId" TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "phoneNumber";

-- AddForeignKey
ALTER TABLE "DataMaster" ADD CONSTRAINT "DataMaster_diprosesOlehId_fkey" FOREIGN KEY ("diprosesOlehId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
