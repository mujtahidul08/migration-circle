-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_replyId_fkey";

-- AlterTable
ALTER TABLE "Like" ALTER COLUMN "replyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
