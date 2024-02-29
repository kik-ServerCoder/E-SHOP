-- CreateTable
CREATE TABLE "BuyPriceHistory" (
    "id" SERIAL NOT NULL,
    "prod_code" TEXT NOT NULL,
    "prod_name" TEXT NOT NULL,
    "prod_buysku" TEXT NOT NULL,
    "prod_buyprice" TEXT NOT NULL,
    "prod_totalBP" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountantId" INTEGER NOT NULL,

    CONSTRAINT "BuyPriceHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BuyPriceHistory" ADD CONSTRAINT "BuyPriceHistory_accountantId_fkey" FOREIGN KEY ("accountantId") REFERENCES "Accountant"("acct_ID") ON DELETE RESTRICT ON UPDATE CASCADE;
