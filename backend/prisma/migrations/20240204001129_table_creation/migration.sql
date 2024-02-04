-- CreateTable
CREATE TABLE "Accountant" (
    "acct_ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Accountant_pkey" PRIMARY KEY ("acct_ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accountant_username_key" ON "Accountant"("username");
