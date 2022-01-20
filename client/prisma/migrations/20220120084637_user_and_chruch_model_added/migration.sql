/*
  Warnings:

  - You are about to drop the column `MangekyoSharingan` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Artist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Playlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Song` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlaylistToSong` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[churchInfoChrchName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,forename,username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `churchInfoChrchName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forename` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_userId_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_artistId_fkey";

-- DropForeignKey
ALTER TABLE "_PlaylistToSong" DROP CONSTRAINT "_PlaylistToSong_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlaylistToSong" DROP CONSTRAINT "_PlaylistToSong_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "MangekyoSharingan",
DROP COLUMN "createdAt",
DROP COLUMN "password",
ADD COLUMN     "churchInfoChrchName" TEXT NOT NULL,
ADD COLUMN     "forename" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "Artist";

-- DropTable
DROP TABLE "Playlist";

-- DropTable
DROP TABLE "Song";

-- DropTable
DROP TABLE "_PlaylistToSong";

-- CreateTable
CREATE TABLE "ChurchInfo" (
    "chrchName" TEXT NOT NULL,
    "churchType" TEXT NOT NULL,
    "churchDescription" TEXT NOT NULL,
    "userId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "ChurchInfo_chrchName_key" ON "ChurchInfo"("chrchName");

-- CreateIndex
CREATE UNIQUE INDEX "User_churchInfoChrchName_key" ON "User"("churchInfoChrchName");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_forename_username_key" ON "User"("name", "forename", "username");

-- AddForeignKey
ALTER TABLE "ChurchInfo" ADD CONSTRAINT "ChurchInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
