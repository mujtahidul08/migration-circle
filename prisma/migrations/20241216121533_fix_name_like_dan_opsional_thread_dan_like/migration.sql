-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_threadId_fkey";

-- AlterTable
ALTER TABLE "Like" ALTER COLUMN "threadId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE SET NULL ON UPDATE CASCADE;
