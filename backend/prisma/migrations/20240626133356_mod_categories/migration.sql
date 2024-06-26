/*
  Warnings:

  - You are about to drop the column `categoryId` on the `photo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `photo` DROP FOREIGN KEY `Photo_categoryId_fkey`;

-- AlterTable
ALTER TABLE `photo` DROP COLUMN `categoryId`;

-- CreateTable
CREATE TABLE `_CategoryToPhoto` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryToPhoto_AB_unique`(`A`, `B`),
    INDEX `_CategoryToPhoto_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CategoryToPhoto` ADD CONSTRAINT `_CategoryToPhoto_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToPhoto` ADD CONSTRAINT `_CategoryToPhoto_B_fkey` FOREIGN KEY (`B`) REFERENCES `Photo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
