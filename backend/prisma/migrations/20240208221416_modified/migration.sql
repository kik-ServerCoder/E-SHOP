/*
  Warnings:

  - You are about to drop the column `accountId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_accountId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "accountId",
ADD COLUMN     "accountantId" INTEGER;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_accountantId_fkey" FOREIGN KEY ("accountantId") REFERENCES "Accountant"("acct_ID") ON DELETE SET NULL ON UPDATE CASCADE;
