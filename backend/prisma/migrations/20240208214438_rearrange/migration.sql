/*
  Warnings:

  - You are about to drop the column `accountId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_accountId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "accountId";
