/*
  Warnings:

  - You are about to drop the column `isMarried` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `MangekyoSharingan` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isMarried",
DROP COLUMN "updatedAt",
ADD COLUMN     "MangekyoSharingan" BOOLEAN NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TEXT;
