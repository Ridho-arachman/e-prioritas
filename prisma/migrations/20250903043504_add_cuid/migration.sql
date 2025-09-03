/*
  Warnings:

  - The primary key for the `Alternative` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Criterion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Score` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Weight` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."Result" DROP CONSTRAINT "Result_alternativeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Score" DROP CONSTRAINT "Score_alternativeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Score" DROP CONSTRAINT "Score_criterionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Score" DROP CONSTRAINT "Score_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Weight" DROP CONSTRAINT "Weight_criterionId_fkey";

-- AlterTable
ALTER TABLE "public"."Alternative" DROP CONSTRAINT "Alternative_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Alternative_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Alternative_id_seq";

-- AlterTable
ALTER TABLE "public"."Criterion" DROP CONSTRAINT "Criterion_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Criterion_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Criterion_id_seq";

-- AlterTable
ALTER TABLE "public"."Result" ALTER COLUMN "alternativeId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Score" DROP CONSTRAINT "Score_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "alternativeId" SET DATA TYPE TEXT,
ALTER COLUMN "criterionId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Score_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Score_id_seq";

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "public"."Weight" DROP CONSTRAINT "Weight_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "criterionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Weight_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Weight_id_seq";

-- AddForeignKey
ALTER TABLE "public"."Score" ADD CONSTRAINT "Score_alternativeId_fkey" FOREIGN KEY ("alternativeId") REFERENCES "public"."Alternative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Score" ADD CONSTRAINT "Score_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "public"."Criterion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Score" ADD CONSTRAINT "Score_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Weight" ADD CONSTRAINT "Weight_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "public"."Criterion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Result" ADD CONSTRAINT "Result_alternativeId_fkey" FOREIGN KEY ("alternativeId") REFERENCES "public"."Alternative"("id") ON DELETE CASCADE ON UPDATE CASCADE;
