-- CreateEnum
CREATE TYPE "StatusProgram" AS ENUM ('BERJALAN', 'SELESAI', 'DITUNDA');

-- CreateTable
CREATE TABLE "program_kelurahan" (
    "id" TEXT NOT NULL,
    "judul" VARCHAR(255) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "status" "StatusProgram" NOT NULL DEFAULT 'BERJALAN',
    "tanggalMulai" TIMESTAMP(3),
    "tanggalSelesai" TIMESTAMP(3),
    "domainIsuId" TEXT,
    "pic" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "program_kelurahan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "program_kelurahan_status_idx" ON "program_kelurahan"("status");

-- AddForeignKey
ALTER TABLE "program_kelurahan" ADD CONSTRAINT "program_kelurahan_domainIsuId_fkey" FOREIGN KEY ("domainIsuId") REFERENCES "domain_isu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
