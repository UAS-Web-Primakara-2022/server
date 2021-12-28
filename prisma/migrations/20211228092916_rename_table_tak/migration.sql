/*
  Warnings:

  - You are about to drop the `tak` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tak" DROP CONSTRAINT "tak_mahasiswaNIM_fkey";

-- DropTable
DROP TABLE "tak";

-- CreateTable
CREATE TABLE "Tak" (
    "id" TEXT NOT NULL,
    "mahasiswaNIM" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "tingkatan" "Tingkatan",
    "point_TAK" INTEGER NOT NULL DEFAULT 0,
    "verifed_status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Tak_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tak" ADD CONSTRAINT "Tak_mahasiswaNIM_fkey" FOREIGN KEY ("mahasiswaNIM") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;
