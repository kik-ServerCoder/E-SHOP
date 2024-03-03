/*
  Warnings:

  - You are about to drop the column `accountantId` on the `passwordResetToken` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "passwordResetToken" DROP CONSTRAINT "passwordResetToken_accountantId_fkey";

-- AlterTable
ALTER TABLE "passwordResetToken" DROP COLUMN "accountantId",
ADD COLUMN     "username" TEXT;

-- AddForeignKey
ALTER TABLE "passwordResetToken" ADD CONSTRAINT "passwordResetToken_username_fkey" FOREIGN KEY ("username") REFERENCES "Accountant"("username") ON DELETE SET NULL ON UPDATE CASCADE;
