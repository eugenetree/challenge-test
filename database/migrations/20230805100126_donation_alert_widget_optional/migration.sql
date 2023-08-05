-- DropForeignKey
ALTER TABLE `UserMedia` DROP FOREIGN KEY `UserMedia_donationAlertWidgetId_fkey`;

-- AlterTable
ALTER TABLE `UserMedia` MODIFY `donationAlertWidgetId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `UserMedia` ADD CONSTRAINT `UserMedia_donationAlertWidgetId_fkey` FOREIGN KEY (`donationAlertWidgetId`) REFERENCES `DonationAlertWidget`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
