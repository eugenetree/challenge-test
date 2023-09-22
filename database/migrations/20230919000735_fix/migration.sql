/*
  Warnings:

  - Added the required column `userId` to the `DonationAlertWidgetTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DonationAlertWidget` ADD COLUMN `donationAlertWidgetTemplateId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `DonationAlertWidgetTemplate` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `DonationAlertWidgetTemplate` ADD CONSTRAINT `DonationAlertWidgetTemplate_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
