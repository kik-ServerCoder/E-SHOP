/*
  Warnings:

  - You are about to drop the column `accountantId` on the `BuyPriceHistory` table. All the data in the column will be lost.
  - You are about to drop the column `accountantId` on the `SellPriceHistory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BuyPriceHistory" DROP CONSTRAINT "BuyPriceHistory_accountantId_fkey";

-- DropForeignKey
ALTER TABLE "SellPriceHistory" DROP CONSTRAINT "SellPriceHistory_accountantId_fkey";

-- AlterTable
ALTER TABLE "BuyPriceHistory" DROP COLUMN "accountantId",
ADD COLUMN     "username" TEXT;

-- AlterTable
ALTER TABLE "SellPriceHistory" DROP COLUMN "accountantId",
ADD COLUMN     "username" TEXT;

-- AddForeignKey
ALTER TABLE "SellPriceHistory" ADD CONSTRAINT "SellPriceHistory_username_fkey" FOREIGN KEY ("username") REFERENCES "Accountant"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyPriceHistory" ADD CONSTRAINT "BuyPriceHistory_username_fkey" FOREIGN KEY ("username") REFERENCES "Accountant"("username") ON DELETE SET NULL ON UPDATE CASCADE;
