/*
  Warnings:

  - The values [manual] on the enum `Donation_paymentSystem` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Donation` MODIFY `paymentSystem` ENUM('fondy', 'test') NOT NULL;
