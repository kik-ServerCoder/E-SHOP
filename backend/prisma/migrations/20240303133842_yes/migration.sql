/*
  Warnings:

  - You are about to drop the column `prod_buysku` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `prod_sellsku` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_prod_buysku_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_prod_sellsku_fkey";

-- DropIndex
DROP INDEX "BuyPriceHistory_prod_buysku_key";

-- DropIndex
DROP INDEX "SellPriceHistory_prod_sellsku_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "prod_buysku",
DROP COLUMN "prod_sellsku";
