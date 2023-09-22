/*
  Warnings:

  - Added the required column `name` to the `AlertWidgetsGroup` table without a default value. This is not possible if the table is not empty.
  - Made the column `donationAlertWidgetId` on table `DonationAlertWidgetTemplate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `DonationAlertWidgetTemplate` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `DonationAlertWidgetTemplate` DROP FOREIGN KEY `DonationAlertWidgetTemplate_donationAlertWidgetId_fkey`;

-- DropForeignKey
ALTER TABLE `DonationAlertWidgetTemplate` DROP FOREIGN KEY `DonationAlertWidgetTemplate_userId_fkey`;

-- AlterTable
ALTER TABLE `AlertWidgetsGroup` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `DonationAlertWidgetTemplate` MODIFY `donationAlertWidgetId` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `DonationAlertWidgetTemplate` ADD CONSTRAINT `DonationAlertWidgetTemplate_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DonationAlertWidgetTemplate` ADD CONSTRAINT `DonationAlertWidgetTemplate_donationAlertWidgetId_fkey` FOREIGN KEY (`donationAlertWidgetId`) REFERENCES `DonationAlertWidget`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
