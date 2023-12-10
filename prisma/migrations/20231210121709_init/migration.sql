-- CreateTable
CREATE TABLE `Category` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Jenis` TEXT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Database_32` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `jenis` TEXT NULL,
    `judul` TEXT NULL,
    `publish` TEXT NULL,
    `sumber` TEXT NULL,
    `content` TEXT NULL,
    `gambar` TEXT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
