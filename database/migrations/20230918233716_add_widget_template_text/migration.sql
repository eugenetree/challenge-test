/*
  Warnings:

  - You are about to drop the column `imageId` on the `DonationAlertWidget` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `DonationAlertWidget` DROP FOREIGN KEY `DonationAlertWidget_imageId_fkey`;

-- AlterTable
ALTER TABLE `DonationAlertWidget` DROP COLUMN `imageId`;

-- CreateTable
CREATE TABLE `DonationAlertWidgetTemplate` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `donationAlertWidgetId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `DonationAlertWidgetTemplate_donationAlertWidgetId_key`(`donationAlertWidgetId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WidgetTemplateText` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `styleConfig` TEXT NOT NULL,
    `animationConfig` TEXT NOT NULL,
    `positionConfig` TEXT NOT NULL,
    `donationAlertWidgetTemplateId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DonationAlertWidgetTemplate` ADD CONSTRAINT `DonationAlertWidgetTemplate_donationAlertWidgetId_fkey` FOREIGN KEY (`donationAlertWidgetId`) REFERENCES `DonationAlertWidget`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WidgetTemplateText` ADD CONSTRAINT `WidgetTemplateText_donationAlertWidgetTemplateId_fkey` FOREIGN KEY (`donationAlertWidgetTemplateId`) REFERENCES `DonationAlertWidgetTemplate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
