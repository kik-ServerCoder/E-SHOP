-- CreateTable
CREATE TABLE "passwordResetToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "accountantId" INTEGER NOT NULL,

    CONSTRAINT "passwordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "passwordResetToken_token_key" ON "passwordResetToken"("token");

-- AddForeignKey
ALTER TABLE "passwordResetToken" ADD CONSTRAINT "passwordResetToken_accountantId_fkey" FOREIGN KEY ("accountantId") REFERENCES "Accountant"("acct_ID") ON DELETE RESTRICT ON UPDATE CASCADE;
