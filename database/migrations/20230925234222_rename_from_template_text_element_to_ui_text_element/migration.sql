/*
  Warnings:

  - You are about to drop the `TemplateTextElement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TemplateTextElement` DROP FOREIGN KEY `TemplateTextElement_donationAlertTemplateId_fkey`;

-- DropTable
DROP TABLE `TemplateTextElement`;

-- CreateTable
CREATE TABLE `UiTextElement` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `styleConfig` TEXT NOT NULL,
    `animationConfig` TEXT NOT NULL,
    `positionConfig` TEXT NOT NULL,
    `donationAlertTemplateId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UiTextElement` ADD CONSTRAINT `UiTextElement_donationAlertTemplateId_fkey` FOREIGN KEY (`donationAlertTemplateId`) REFERENCES `DonationAlertTemplate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
