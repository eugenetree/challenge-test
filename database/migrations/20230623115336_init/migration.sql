/*
  Warnings:

  - The primary key for the `AlertWidgetsGroup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Donation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DonationAlertWidget` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OauthProvider` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Donation` DROP FOREIGN KEY `Donation_recipientId_fkey`;

-- DropForeignKey
ALTER TABLE `DonationAlertWidget` DROP FOREIGN KEY `DonationAlertWidget_alertWidgetsGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `DonationAlertWidget` DROP FOREIGN KEY `DonationAlertWidget_userId_fkey`;

-- DropForeignKey
ALTER TABLE `OauthProvider` DROP FOREIGN KEY `OauthProvider_userId_fkey`;

-- AlterTable
ALTER TABLE `AlertWidgetsGroup` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Donation` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `paymentData` VARCHAR(191) NULL,
    MODIFY `recipientId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `DonationAlertWidget` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `alertWidgetsGroupId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `OauthProvider` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `OauthProvider` ADD CONSTRAINT `OauthProvider_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_recipientId_fkey` FOREIGN KEY (`recipientId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DonationAlertWidget` ADD CONSTRAINT `DonationAlertWidget_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DonationAlertWidget` ADD CONSTRAINT `DonationAlertWidget_alertWidgetsGroupId_fkey` FOREIGN KEY (`alertWidgetsGroupId`) REFERENCES `AlertWidgetsGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
