/*
  Warnings:

  - You are about to drop the `TAK` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TAK" DROP CONSTRAINT "TAK_mahasiswaNIM_fkey";

-- DropTable
DROP TABLE "TAK";

-- CreateTable
CREATE TABLE "tak" (
    "id" TEXT NOT NULL,
    "mahasiswaNIM" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "tingkatan" "Tingkatan",
    "point_TAK" INTEGER NOT NULL DEFAULT 0,
    "verifed_status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tak_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tak" ADD CONSTRAINT "tak_mahasiswaNIM_fkey" FOREIGN KEY ("mahasiswaNIM") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;
