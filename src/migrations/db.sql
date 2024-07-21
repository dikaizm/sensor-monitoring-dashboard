-- -------------------------------------------------------------
-- TablePlus 5.3.8(500)
--
-- https://tableplus.com/
--
-- Database: sensor_monitor
-- Generation Time: 2024-07-21 20:44:53.7680
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `productions`;
CREATE TABLE `productions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `productions_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_code` varchar(20) NOT NULL,
  `product_name` varchar(20) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `register_requests`;
CREATE TABLE `register_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `register_requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `register_requests_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `user_roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `sensor_active_times`;
CREATE TABLE `sensor_active_times` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sensor_id` bigint unsigned DEFAULT NULL,
  `client_id` varchar(255) DEFAULT NULL,
  `start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` timestamp NULL DEFAULT NULL,
  `running_sec` bigint DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `sensor_id` (`sensor_id`),
  KEY `idx_client_id` (`client_id`),
  CONSTRAINT `sensor_active_times_ibfk_1` FOREIGN KEY (`sensor_id`) REFERENCES `sensors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `sensors`;
CREATE TABLE `sensors` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `is_active` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `sensor_name` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `SequelizeMeta`;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  `granted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `users_role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `user_roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `productions` (`id`, `product_id`, `quantity`, `createdAt`, `updatedAt`) VALUES
(1, 1, 346, '2024-07-21 08:16:44', '2024-07-21 13:44:39'),
(2, 1, 11, '2024-07-20 08:16:44', '2024-07-21 12:41:58');

INSERT INTO `products` (`id`, `product_code`, `product_name`, `createdAt`, `updatedAt`) VALUES
(1, 'GNTG_0012', 'Genteng', '2024-07-20 12:56:34', '2024-07-20 12:56:34');

INSERT INTO `register_requests` (`id`, `user_id`, `role_id`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, '2024-05-18 05:34:10', '2024-05-18 05:34:10'),
(2, 2, 2, '2024-07-07 03:42:00', '2024-07-07 03:42:00'),
(3, 3, 2, '2024-07-18 06:29:03', '2024-07-18 06:29:03'),
(4, 4, 2, '2024-07-21 11:26:25', '2024-07-21 11:26:25'),
(5, 5, 4, '2024-07-21 11:58:22', '2024-07-21 11:58:22'),
(6, 6, 3, '2024-07-21 13:24:13', '2024-07-21 13:24:13');

INSERT INTO `sensor_active_times` (`id`, `sensor_id`, `client_id`, `start_time`, `end_time`, `running_sec`, `createdAt`, `updatedAt`) VALUES
(1, 1, NULL, '2024-07-20 02:36:36', '2024-07-20 02:36:56', 20, '2024-07-19 19:36:36', '2024-07-19 19:36:56'),
(2, 1, NULL, '2024-07-20 02:37:17', '2024-07-20 02:37:25', 8, '2024-07-19 19:37:17', '2024-07-19 19:37:25'),
(3, 1, NULL, '2024-07-20 02:37:30', '2024-07-20 02:38:06', 36, '2024-07-19 19:37:30', '2024-07-19 19:38:06'),
(4, 1, NULL, '2024-07-20 02:40:49', '2024-07-20 03:17:28', 2199, '2024-07-19 19:40:49', '2024-07-19 20:17:28'),
(5, 1, '::1', '2024-07-20 02:43:03', '2024-07-20 02:43:13', 10, '2024-07-19 19:43:03', '2024-07-19 19:43:13'),
(6, 1, '::1', '2024-07-20 12:25:35', '2024-07-20 12:25:54', 19, '2024-07-20 05:25:35', '2024-07-20 05:25:54'),
(7, 1, '::1', '2024-07-20 12:25:58', '2024-07-20 12:26:21', 23, '2024-07-20 05:25:58', '2024-07-20 05:26:21'),
(8, 1, '::1', '2024-07-20 12:26:25', '2024-07-20 12:49:55', 1410, '2024-07-20 05:26:25', '2024-07-20 05:49:55'),
(9, 1, '::1', '2024-07-21 14:47:36', '2024-07-21 14:48:31', 55, '2024-07-21 07:47:36', '2024-07-21 07:48:31'),
(10, 1, '::1', '2024-07-21 14:48:32', '2024-07-21 14:48:38', 6, '2024-07-21 07:48:32', '2024-07-21 07:48:38'),
(11, 1, '::1', '2024-07-21 14:48:46', '2024-07-21 14:49:09', 23, '2024-07-21 07:48:46', '2024-07-21 07:49:09'),
(12, 1, '::1', '2024-07-21 14:49:28', '2024-07-21 14:51:39', 131, '2024-07-21 07:49:28', '2024-07-21 07:51:39'),
(13, 1, '::1', '2024-07-21 15:38:17', '2024-07-21 15:38:23', 6, '2024-07-21 08:38:17', '2024-07-21 08:38:23'),
(14, 1, '::1', '2024-07-21 15:38:26', '2024-07-21 15:38:31', 5, '2024-07-21 08:38:26', '2024-07-21 08:38:31'),
(15, 1, '::1', '2024-07-21 19:09:40', '2024-07-21 19:32:22', 1362, '2024-07-21 12:09:40', '2024-07-21 12:32:22'),
(16, 1, '::1', '2024-07-21 20:22:26', '2024-07-21 20:22:30', 4, '2024-07-21 13:22:26', '2024-07-21 13:22:30'),
(17, 1, '::1', '2024-07-21 20:22:35', '2024-07-21 20:22:39', 4, '2024-07-21 13:22:35', '2024-07-21 13:22:39');

INSERT INTO `sensors` (`id`, `name`, `is_active`, `createdAt`, `updatedAt`) VALUES
(1, 'conveyor', 0, '2024-07-19 06:54:48', '2024-07-21 13:22:39');

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20240514.1110-create-user-role.js'),
('20240514.1120-create-user.js'),
('20240514.1244-create-register-request.js'),
('20240518.1219-create-product.js');

INSERT INTO `user_roles` (`id`, `role_name`, `createdAt`, `updatedAt`) VALUES
(1, 'guest', '2024-05-18 05:33:43', '2024-05-18 05:33:43'),
(2, 'admin', '2024-05-18 05:33:43', '2024-05-18 05:33:43'),
(3, 'operator', '2024-05-18 05:33:43', '2024-05-18 05:33:43'),
(4, 'marketing', '2024-05-18 05:33:43', '2024-05-18 05:33:43');

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role_id`, `granted`, `createdAt`, `updatedAt`) VALUES
(1, 'Test Admin', 'test@mail.com', '$2b$10$qgjy42QcZnI2S6SbJMJAruTmgMReWjxZptxUMF7cjFTek3khvGbIK', 1, 1, '2024-05-18 05:34:10', '2024-05-18 05:34:10'),
(2, 'Admin', 'admin@example.com', '$2b$10$tfFzVv6ZrdhXMlMAlkKGS.E0o36B4V1Bq8o.1SPUxNfnK68JMBkfC', 2, 1, '2024-07-07 03:42:00', '2024-07-07 03:42:00'),
(3, 'Yusuf', 'yusuf@gmail.com', '$2a$10$ptGqLd5bfhcvxYD1T9.haOmozvNoer4hkfbF.Dj24UO/TvTV4j45m', 2, 1, '2024-07-18 06:29:03', '2024-07-18 06:29:03'),
(4, 'Tiara Sabrina', 'tiara@mail.com', '$2a$10$8cyuMigAd6rY.CVnlwARM.c8qD83i1IsOvjH5IX/zyitblpVsf2xW', 3, 0, '2024-07-21 11:26:25', '2024-07-21 11:26:25'),
(5, 'Izzulhaq Mahardika', 'dikamaah@gmail.com', '$2a$10$cbjNu9aXO.cVjDTr5uWr9OZWg.76bNKXmLOj3KpoCi8jIiqO/G9w.', 4, 1, '2024-07-21 11:58:22', '2024-07-21 11:58:22'),
(6, 'Izzulhaq Mahardika', 'dikaizm@gmail.com', '$2a$10$EqqivHS6LeIqPjhPoJQg4.lNVbpti7SAaHOfdmtmVVJ78aEwRxdai', 3, 1, '2024-07-21 13:24:13', '2024-07-21 13:24:13');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;