/*
  Warnings:

  - You are about to drop the column `donationAlertTemplateId` on the `UiTextElement` table. All the data in the column will be lost.
  - Added the required column `elements` to the `DonationAlertTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UiTextElement` DROP FOREIGN KEY `UiTextElement_donationAlertTemplateId_fkey`;

-- AlterTable
ALTER TABLE `DonationAlertTemplate` ADD COLUMN `elements` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `UiTextElement` DROP COLUMN `donationAlertTemplateId`;
