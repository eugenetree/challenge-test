/*
  Warnings:

  - Added the required column `isDefaultTemplate` to the `DonationAlertWidgetTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `DonationAlertWidgetTemplate` DROP FOREIGN KEY `DonationAlertWidgetTemplate_donationAlertWidgetId_fkey`;

-- DropForeignKey
ALTER TABLE `DonationAlertWidgetTemplate` DROP FOREIGN KEY `DonationAlertWidgetTemplate_userId_fkey`;

-- AlterTable
ALTER TABLE `DonationAlertWidgetTemplate` ADD COLUMN `isDefaultTemplate` BOOLEAN NOT NULL,
    MODIFY `donationAlertWidgetId` VARCHAR(191) NULL,
    MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `DonationAlertWidgetTemplate` ADD CONSTRAINT `DonationAlertWidgetTemplate_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DonationAlertWidgetTemplate` ADD CONSTRAINT `DonationAlertWidgetTemplate_donationAlertWidgetId_fkey` FOREIGN KEY (`donationAlertWidgetId`) REFERENCES `DonationAlertWidget`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
