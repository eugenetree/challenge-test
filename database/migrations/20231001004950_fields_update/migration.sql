/*
  Warnings:

  - Added the required column `isEnabled` to the `AlertWidget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `DonationAlert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isEnabled` to the `DonationAlert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AlertWidget` ADD COLUMN `isEnabled` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `DonationAlert` ADD COLUMN `duration` INTEGER NOT NULL,
    ADD COLUMN `isEnabled` BOOLEAN NOT NULL;
