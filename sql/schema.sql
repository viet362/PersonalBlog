-- Active: 1785914295113@@mysql-22176-buivietbacn01-1ff7.a.aivencloud.com@10055@personal-blog
-- =======================================================
-- Database Schema for Personal Blog (Aiven MySQL)
-- =======================================================

-- Tạo cơ sở dữ liệu nếu chưa tồn tại (chạy trên Aiven MySQL)
CREATE DATABASE IF NOT EXISTS `personal-blog` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `personal-blog`;

-- Xóa bảng cũ nếu tồn tại (theo thứ tự quan hệ khóa ngoại)
DROP TABLE IF EXISTS `blog`;

DROP TABLE IF EXISTS `users`;

-- 1. Bảng Users (Người dùng / Tác giả)
CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_users_username` (`username`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- 2. Bảng Blog (Bài viết)
CREATE TABLE `blog` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `user_id` BIGINT DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_blog_users_idx` (`user_id`),
    CONSTRAINT `fk_blog_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;