-- CreateEnum
CREATE TYPE "Tingkatan" AS ENUM ('KAMPUS', 'KOTA', 'KABUPATEN', 'PROVINSI', 'NASIONAL', 'INTERNASIONAL');

-- CreateTable
CREATE TABLE "Mahasiswa" (
    "nim" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "angkatan" INTEGER,
    "gender" TEXT,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("nim")
);

-- CreateTable
CREATE TABLE "TAK" (
    "id" TEXT NOT NULL,
    "mahasiswaNIM" INTEGER NOT NULL,
    "image" TEXT,
    "tingkatan" "Tingkatan",
    "point_TAK" INTEGER NOT NULL DEFAULT 0,
    "verifed_status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TAK_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_email_key" ON "Mahasiswa"("email");

-- AddForeignKey
ALTER TABLE "TAK" ADD CONSTRAINT "TAK_mahasiswaNIM_fkey" FOREIGN KEY ("mahasiswaNIM") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;
