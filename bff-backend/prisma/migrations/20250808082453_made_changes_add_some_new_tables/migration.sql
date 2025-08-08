/*
  Warnings:

  - Added the required column `title` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Course" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Flashcard" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Page" ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "viewed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Quiz" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "score" INTEGER;

-- AlterTable
ALTER TABLE "public"."Summary" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Topic" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;
