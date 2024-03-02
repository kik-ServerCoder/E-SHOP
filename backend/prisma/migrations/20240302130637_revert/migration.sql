-- DropForeignKey
ALTER TABLE "BuyPriceHistory" DROP CONSTRAINT "BuyPriceHistory_prod_buysku_fkey";

-- DropIndex
DROP INDEX "Product_prod_sku_key";
