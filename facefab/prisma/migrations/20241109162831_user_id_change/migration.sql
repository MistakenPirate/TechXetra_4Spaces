-- DropForeignKey
ALTER TABLE "StudentSubject" DROP CONSTRAINT "StudentSubject_userId_fkey";

-- AlterTable
ALTER TABLE "StudentSubject" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "StudentSubject" ADD CONSTRAINT "StudentSubject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
