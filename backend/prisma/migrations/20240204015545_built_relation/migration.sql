-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "accountId" INTEGER;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accountant"("acct_ID") ON DELETE SET NULL ON UPDATE CASCADE;
