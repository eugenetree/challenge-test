/*
  Warnings:

  - You are about to drop the column `donationAlertWidgetId` on the `UserMedia` table. All the data in the column will be lost.
  - Added the required column `imageId` to the `DonationAlertWidget` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserMedia` DROP FOREIGN KEY `UserMedia_donationAlertWidgetId_fkey`;

-- AlterTable
ALTER TABLE `DonationAlertWidget` ADD COLUMN `imageId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UserMedia` DROP COLUMN `donationAlertWidgetId`;

-- AddForeignKey
ALTER TABLE `DonationAlertWidget` ADD CONSTRAINT `DonationAlertWidget_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `UserMedia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
