/*
  Warnings:

  - You are about to drop the column `accountantId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_accountantId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "accountantId",
ADD COLUMN     "username" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_username_fkey" FOREIGN KEY ("username") REFERENCES "Accountant"("username") ON DELETE SET NULL ON UPDATE CASCADE;
