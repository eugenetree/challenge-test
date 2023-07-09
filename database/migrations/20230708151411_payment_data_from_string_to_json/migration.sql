/*
  Warnings:

  - You are about to alter the column `paymentData` on the `Donation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Donation` MODIFY `paymentData` JSON NULL;
