/*
  Warnings:

  - Added the required column `prod_price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "prod_price" TEXT NOT NULL,
ADD COLUMN     "prod_totalPrice" TEXT;
