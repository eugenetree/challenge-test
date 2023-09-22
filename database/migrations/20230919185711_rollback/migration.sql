/*
  Warnings:

  - Made the column `donationAlertWidgetTemplateId` on table `WidgetTemplateText` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `WidgetTemplateText` DROP FOREIGN KEY `WidgetTemplateText_donationAlertWidgetTemplateId_fkey`;

-- AlterTable
ALTER TABLE `WidgetTemplateText` MODIFY `donationAlertWidgetTemplateId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `WidgetTemplateText` ADD CONSTRAINT `WidgetTemplateText_donationAlertWidgetTemplateId_fkey` FOREIGN KEY (`donationAlertWidgetTemplateId`) REFERENCES `DonationAlertWidgetTemplate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
