-- CreateTable
CREATE TABLE "Product" (
    "prod_ID" SERIAL NOT NULL,
    "prod_name" TEXT NOT NULL,
    "prod_price" TEXT NOT NULL,
    "prod_sku" TEXT NOT NULL,
    "prod_sellprice" TEXT,
    "prod_buyprice" TEXT,
    "prod_totalSP" TEXT,
    "prod_totalBP" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("prod_ID")
);
