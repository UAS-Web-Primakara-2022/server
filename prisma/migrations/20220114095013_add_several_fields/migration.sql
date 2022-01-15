/*
  Warnings:

  - The `gender` column on the `Mahasiswa` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Prodi" AS ENUM ('SI', 'IF', 'SIA');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('PRIA', 'WANITA');

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Mahasiswa" ADD COLUMN     "birth_date" TIMESTAMP(3),
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "prodi" "Prodi",
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender";

-- AlterTable
ALTER TABLE "Tak" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
