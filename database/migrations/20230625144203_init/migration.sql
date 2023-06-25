/*
  Warnings:

  - You are about to alter the column `paymentStatus` on the `Donation` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `Donation` MODIFY `paymentStatus` ENUM('notPaid', 'success', 'fail') NOT NULL DEFAULT 'notPaid';
