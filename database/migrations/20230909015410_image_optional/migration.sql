-- DropForeignKey
ALTER TABLE `DonationAlertWidget` DROP FOREIGN KEY `DonationAlertWidget_imageId_fkey`;

-- AlterTable
ALTER TABLE `DonationAlertWidget` MODIFY `imageId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `DonationAlertWidget` ADD CONSTRAINT `DonationAlertWidget_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `UserMedia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
