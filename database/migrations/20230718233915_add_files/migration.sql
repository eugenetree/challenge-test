-- CreateTable
CREATE TABLE `File` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `mimeType` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `donationAlertWidgetId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_donationAlertWidgetId_fkey` FOREIGN KEY (`donationAlertWidgetId`) REFERENCES `DonationAlertWidget`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
