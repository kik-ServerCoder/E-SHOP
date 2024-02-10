/*
  Warnings:

  - Made the column `pass` on table `Accountant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Accountant" ALTER COLUMN "pass" SET NOT NULL;
