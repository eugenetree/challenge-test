/*
  Warnings:

  - Added the required column `endDate` to the `DonationGoalWidget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isWidgetEnabled` to the `DonationGoalWidget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textWhenRaisingIsFinished` to the `DonationGoalWidget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textWhenRaisingIsInProgress` to the `DonationGoalWidget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DonationGoalWidget` ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `isWidgetEnabled` BOOLEAN NOT NULL,
    ADD COLUMN `textWhenRaisingIsFinished` VARCHAR(191) NOT NULL,
    ADD COLUMN `textWhenRaisingIsInProgress` VARCHAR(191) NOT NULL;
