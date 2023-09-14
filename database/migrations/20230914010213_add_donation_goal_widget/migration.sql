-- AlterTable
ALTER TABLE `Donation` ADD COLUMN `donationGoalWidgetId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `DonationGoalWidget` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_donationGoalWidgetId_fkey` FOREIGN KEY (`donationGoalWidgetId`) REFERENCES `DonationGoalWidget`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DonationGoalWidget` ADD CONSTRAINT `DonationGoalWidget_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
