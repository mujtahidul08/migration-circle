-- AlterTable
ALTER TABLE "Thread" ADD COLUMN     "isDeleted" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isDeleted" INTEGER NOT NULL DEFAULT 0;