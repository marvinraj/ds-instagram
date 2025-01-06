CREATE SCHEMA IF NOT EXISTS `ds_instagram`;

USE `ds_instagram`;

-- USERS TABLE
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username`),
  UNIQUE INDEX `email_UNIQUE` (`email`)
);

-- POSTS TABLE
CREATE TABLE IF NOT EXISTS `posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `caption` TEXT NOT NULL,
  PRIMARY KEY (`id`)
);

-- LIKES TABLE
CREATE TABLE IF NOT EXISTS `likes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  PRIMARY KEY (`id`)
);

-- COMMENTS TABLE
CREATE TABLE IF NOT EXISTS `comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  `content` TEXT NOT NULL,
  PRIMARY KEY (`id`)
);
