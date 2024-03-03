/*
  Warnings:

  - A unique constraint covering the columns `[prod_sellsku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[prod_buysku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_prod_sellsku_key" ON "Product"("prod_sellsku");

-- CreateIndex
CREATE UNIQUE INDEX "Product_prod_buysku_key" ON "Product"("prod_buysku");
