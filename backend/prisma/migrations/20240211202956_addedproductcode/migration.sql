/*
  Warnings:

  - A unique constraint covering the columns `[prod_code]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `prod_code` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "prod_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_prod_code_key" ON "Product"("prod_code");
