-- CreateTable
CREATE TABLE "SellPriceHistory" (
    "id" SERIAL NOT NULL,
    "prod_code" TEXT NOT NULL,
    "prod_name" TEXT NOT NULL,
    "prod_sellsku" TEXT NOT NULL,
    "prod_sellprice" TEXT NOT NULL,
    "prod_totalSP" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountantId" INTEGER NOT NULL,

    CONSTRAINT "SellPriceHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SellPriceHistory" ADD CONSTRAINT "SellPriceHistory_accountantId_fkey" FOREIGN KEY ("accountantId") REFERENCES "Accountant"("acct_ID") ON DELETE RESTRICT ON UPDATE CASCADE;
