/*
  Warnings:

  - You are about to drop the column `defaultTemplateName` on the `DonationAlertWidgetTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `isDefaultTemplate` on the `DonationAlertWidgetTemplate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `DonationAlertWidgetTemplate` DROP COLUMN `defaultTemplateName`,
    DROP COLUMN `isDefaultTemplate`,
    MODIFY `name` VARCHAR(191) NULL;
