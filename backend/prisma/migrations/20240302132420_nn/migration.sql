/*
  Warnings:

  - The `prod_sku` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "prod_sku",
ADD COLUMN     "prod_sku" INTEGER NOT NULL DEFAULT 0;
