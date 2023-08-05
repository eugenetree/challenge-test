/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `File` DROP FOREIGN KEY `File_donationAlertWidgetId_fkey`;

-- DropForeignKey
ALTER TABLE `File` DROP FOREIGN KEY `File_userId_fkey`;

-- DropTable
DROP TABLE `File`;

-- CreateTable
CREATE TABLE `UserMedia` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `donationAlertWidgetId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserMedia` ADD CONSTRAINT `UserMedia_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMedia` ADD CONSTRAINT `UserMedia_donationAlertWidgetId_fkey` FOREIGN KEY (`donationAlertWidgetId`) REFERENCES `DonationAlertWidget`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
