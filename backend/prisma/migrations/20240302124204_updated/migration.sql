/*
  Warnings:

  - A unique constraint covering the columns `[prod_sku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_prod_sku_key" ON "Product"("prod_sku");

-- AddForeignKey
ALTER TABLE "BuyPriceHistory" ADD CONSTRAINT "BuyPriceHistory_prod_buysku_fkey" FOREIGN KEY ("prod_buysku") REFERENCES "Product"("prod_sku") ON DELETE RESTRICT ON UPDATE CASCADE;
