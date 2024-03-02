/*
  Warnings:

  - You are about to drop the column `prod_price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `prod_totalPrice` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "prod_price",
DROP COLUMN "prod_totalPrice";
