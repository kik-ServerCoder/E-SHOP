/*
  Warnings:

  - A unique constraint covering the columns `[prod_buysku]` on the table `BuyPriceHistory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[prod_sellsku]` on the table `SellPriceHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "prod_buysku" TEXT,
ADD COLUMN     "prod_sellsku" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "BuyPriceHistory_prod_buysku_key" ON "BuyPriceHistory"("prod_buysku");

-- CreateIndex
CREATE UNIQUE INDEX "SellPriceHistory_prod_sellsku_key" ON "SellPriceHistory"("prod_sellsku");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_prod_sellsku_fkey" FOREIGN KEY ("prod_sellsku") REFERENCES "SellPriceHistory"("prod_sellsku") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_prod_buysku_fkey" FOREIGN KEY ("prod_buysku") REFERENCES "BuyPriceHistory"("prod_buysku") ON DELETE SET NULL ON UPDATE CASCADE;
