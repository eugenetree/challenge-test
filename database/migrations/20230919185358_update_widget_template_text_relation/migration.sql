-- DropForeignKey
ALTER TABLE `WidgetTemplateText` DROP FOREIGN KEY `WidgetTemplateText_donationAlertWidgetTemplateId_fkey`;

-- AlterTable
ALTER TABLE `WidgetTemplateText` MODIFY `donationAlertWidgetTemplateId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `WidgetTemplateText` ADD CONSTRAINT `WidgetTemplateText_donationAlertWidgetTemplateId_fkey` FOREIGN KEY (`donationAlertWidgetTemplateId`) REFERENCES `DonationAlertWidgetTemplate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
