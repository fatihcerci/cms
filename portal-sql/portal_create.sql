-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 08 Mar 2021, 19:28:36
-- Sunucu sürümü: 10.4.17-MariaDB
-- PHP Sürümü: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `cms`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8_turkish_ci DEFAULT NULL,
  `description` text COLLATE utf8_turkish_ci DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `description`, `rank`, `isActive`, `createdAt`, `user_id`, `project_id`) VALUES
(2, 'test', 'test', NULL, 1, '2021-02-21 18:29:37', 1, 0),
(3, 'ICAP Sürüm Planı hk.', '<ul><li style=\"text-align: center; \"><b>DUYURU</b></li><li style=\"text-align: center; \"><b><br></b></li><li style=\"text-align: center; \">Merhaba arkadaşlar, akşam ki sürümde side-menu ve side-json dosyalarını export almayı unutmayalım.</li><li style=\"text-align: center; \">Ek olarak: Çarşamba ve Perşembe günleri evde çalışacak arkadaşların listesini mailden gönderdim.</li></ul><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">İyi çalışmalar</p>', NULL, 1, '2021-02-21 19:50:28', 8, 0),
(4, 'Reasürans Ay Kapama İşlemleri', '<p style=\"text-align: center; \">Merhaba arkadaşlar,</p><p style=\"text-align: center; \"><br></p><p style=\"text-align: center; \">Ay kapama işlemleri ayın 28\'i Pazar günü başlayacaktır.</p><p style=\"text-align: center; \"><br></p><p style=\"text-align: center; \">İyi çalışmalar</p>', NULL, 1, '2021-02-27 02:41:49', 1, 9),
(5, 'Test', '<p>test</p>', NULL, 1, '2021-02-28 23:54:10', 1, 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) UNSIGNED NOT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `appointmentDate` datetime DEFAULT NULL,
  `patient_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `appointments`
--

INSERT INTO `appointments` (`id`, `isActive`, `createdAt`, `appointmentDate`, `patient_id`) VALUES
(7, 1, '2021-03-07 14:32:53', '2021-03-09 10:00:00', 7);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) UNSIGNED NOT NULL,
  `url` varchar(255) COLLATE utf8_turkish_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_turkish_ci DEFAULT NULL,
  `description` text COLLATE utf8_turkish_ci DEFAULT NULL,
  `img_url` varchar(255) COLLATE utf8_turkish_ci DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `publishDate` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `blogs`
--

INSERT INTO `blogs` (`id`, `url`, `title`, `description`, `img_url`, `rank`, `isActive`, `publishDate`, `createdAt`, `user_id`) VALUES
(3, 'test', 'Test', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br></p>', 'basliksiz-10.png', 0, 1, '2021-03-04 19:41:59', '2021-02-21 20:22:39', 1),
(4, 'aaaaaa', 'AAAAAA', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br></p>', 'basliksiz-8.png', 0, 0, NULL, '2021-02-21 21:08:56', 1),
(5, 'vue-js-ile-cms-yapimi', 'Vue.js ile CMS yapımı', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br></p>', 'basliksiz-10.png', 0, 0, NULL, '2021-02-23 22:22:25', 7),
(7, 'blog-2', 'Blog 2', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br></p>', 'basliksiz-12.png', 0, 1, '2021-02-28 19:17:41', '2021-02-24 19:41:38', 1),
(8, 'blog-1', 'Blog 1', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br></p>', 'basliksiz-11.png', 0, 1, '2021-03-04 19:42:21', '2021-02-24 20:55:14', 7),
(9, 'aa', 'aa', '<p>aaa</p>', 'basliksiz-10.png', 0, 0, NULL, '2021-03-01 00:12:56', 1),
(10, 'asdsadsa', 'asdsadsa', '<p>asdsadas</p>', 'basliksiz-11.png', 0, 1, '2021-03-04 19:42:25', '2021-03-01 00:13:21', 1),
(11, 'test', 'test', '<p>dsadsadsadsadasdas</p>', 'basliksiz-10.png', 0, 0, NULL, '2021-03-01 00:19:53', 7);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `email_settings`
--

CREATE TABLE `email_settings` (
  `id` int(11) UNSIGNED NOT NULL,
  `protocol` varchar(10) COLLATE utf8_turkish_ci DEFAULT NULL,
  `host` varchar(100) COLLATE utf8_turkish_ci DEFAULT NULL,
  `port` varchar(10) COLLATE utf8_turkish_ci DEFAULT '',
  `user` varchar(100) COLLATE utf8_turkish_ci DEFAULT '',
  `password` varchar(100) COLLATE utf8_turkish_ci DEFAULT '',
  `from` varchar(100) COLLATE utf8_turkish_ci DEFAULT '',
  `to` varchar(100) COLLATE utf8_turkish_ci DEFAULT '',
  `user_name` varchar(100) COLLATE utf8_turkish_ci DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `email_settings`
--

INSERT INTO `email_settings` (`id`, `protocol`, `host`, `port`, `user`, `password`, `from`, `to`, `user_name`, `isActive`, `createdAt`) VALUES
(1, 'smtp', 'ssl://smtp.gmail.com', '465', 'chercy.001@gmail.com', 'chercy_2233893', 'chercy.001@gmail.com', 'chercy.001@gmail.com', 'LENORA', 1, '2021-02-20 12:38:56');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) UNSIGNED NOT NULL,
  `description` text COLLATE utf8_turkish_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8_turkish_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `to_user_id` int(11) DEFAULT NULL,
  `about` varchar(25) COLLATE utf8_turkish_ci DEFAULT NULL,
  `about_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `notifications`
--

INSERT INTO `notifications` (`id`, `description`, `url`, `createdAt`, `user_id`, `to_user_id`, `about`, `about_id`) VALUES
(194, '<b>Blog 1</b> başlıklı blogunuz yayına alındı', '', '2021-03-04 19:42:21', 1, 7, 'blogs', 8);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `patient`
--

CREATE TABLE `patient` (
  `id` int(11) UNSIGNED NOT NULL,
  `tckn` varchar(11) COLLATE utf8_turkish_ci DEFAULT NULL,
  `name` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `surname` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `gender` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `birthDate` datetime DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `province` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `district` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8_turkish_ci DEFAULT NULL,
  `height` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `weight` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `job` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `patient`
--

INSERT INTO `patient` (`id`, `tckn`, `name`, `surname`, `gender`, `birthDate`, `email`, `phone`, `province`, `district`, `address`, `height`, `weight`, `job`, `isActive`, `createdAt`) VALUES
(7, '37927282684', 'Fatih', 'Çerçi', 'E', '1995-09-10 00:00:00', 'fatihcerci001@gmail.com', '05544092278', 'Ankara', 'Altındağ', 'Baraj Mah. Beylerbeyi Sk. No:2G', '173', '112', 'Yazılım Uzmanı', 1, '2021-03-07 14:32:53');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `patient_complaint`
--

CREATE TABLE `patient_complaint` (
  `id` int(11) UNSIGNED NOT NULL,
  `description` varchar(255) COLLATE utf8_turkish_ci DEFAULT NULL,
  `violence` varchar(255) COLLATE utf8_turkish_ci DEFAULT NULL,
  `treatment_applied` varchar(255) COLLATE utf8_turkish_ci DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `patient_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `patient_complaint`
--

INSERT INTO `patient_complaint` (`id`, `description`, `violence`, `treatment_applied`, `isActive`, `createdAt`, `patient_id`) VALUES
(19, 'Baş Ağrısı', '0', 'Ağrı kesici ilaç', 1, '2021-03-07 22:48:25', 7),
(20, 'Mide ağrısı', '2', 'Ağrı kesici ilaç', 1, '2021-03-07 22:48:39', 7);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `patient_pills`
--

CREATE TABLE `patient_pills` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_turkish_ci DEFAULT NULL,
  `dose` varchar(255) COLLATE utf8_turkish_ci DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `reason` varchar(255) COLLATE utf8_turkish_ci DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `patient_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `patient_pills`
--

INSERT INTO `patient_pills` (`id`, `name`, `dose`, `startDate`, `reason`, `isActive`, `createdAt`, `patient_id`) VALUES
(7, 'Parol', 'Günde 2 defa', '2021-03-07 00:00:00', 'Baş ağrısı', 1, '2021-03-07 20:45:38', 7),
(11, 'Majezik', 'Günde 1 defa', '2021-03-01 00:00:00', 'Mide ağrısı', 1, '2021-03-07 22:51:04', 7),
(12, 'Gaviscon', 'Günde 2 defa', '2021-02-01 00:00:00', 'Mide ağrısı', 1, '2021-03-07 22:54:07', 7);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `settings`
--

CREATE TABLE `settings` (
  `id` int(11) UNSIGNED NOT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `slogan` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `about_us` longtext COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `mission` longtext COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `vision` longtext COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `phone_1` varchar(15) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `phone_2` varchar(15) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `fax_1` varchar(15) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `fax_2` varchar(15) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `facebook` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `twitter` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `instagram` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `linkedin` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `lat` varchar(20) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `long` varchar(20) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `homepage_references_description` text COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `version` varchar(20) COLLATE utf8mb4_turkish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `settings`
--

INSERT INTO `settings` (`id`, `company_name`, `slogan`, `address`, `about_us`, `mission`, `vision`, `logo`, `phone_1`, `phone_2`, `fax_1`, `fax_2`, `email`, `facebook`, `twitter`, `instagram`, `linkedin`, `lat`, `long`, `createdAt`, `updatedAt`, `homepage_references_description`, `version`) VALUES
(3, 'LENORA', NULL, '                                                                                                                                                                                                                                                <p>Ostim Osb Mah. Cevat Dündar Cad. No:1/1/85 </p><p>Yenimahalle / Ankara</p>                                                                                                                                                                                                                        ', '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ', '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ', '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ', 'companyLogo.png', '05544092278', '05544092278', '', '', 'fatihcerci001@gmail.com', '', '', '', '', NULL, NULL, '2021-02-20 19:22:11', '2021-02-20 20:51:17', NULL, NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `titles`
--

CREATE TABLE `titles` (
  `id` int(11) UNSIGNED NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `titles`
--

INSERT INTO `titles` (`id`, `url`, `title`, `description`, `rank`, `isActive`, `createdAt`) VALUES
(1, 'yonetici', 'Yönetici', 'Yönetici', 0, 1, '2021-02-21 14:29:55'),
(2, 'yazilim-uzmani', 'Yazılım Uzmanı', 'Yazılım Uzmanı', 2, 1, '2021-02-21 14:30:47'),
(3, 'ekip-lideri', 'Ekip Lideri', 'Ekip Lideri', 1, 1, '2021-02-21 14:30:58'),
(4, 'yazilim-muhendisi', 'Yazılım Mühendisi', 'Yazılım Mühendisi', 3, 1, '2021-02-21 14:31:13'),
(5, 'kidemli-yazilim-muhendisi', 'Kıdemli Yazılım Mühendisi', 'Kıdemli Yazılım Mühendisi', 4, 1, '2021-02-21 14:31:24'),
(6, 'lider-yazilim-muhendisi', 'Lider Yazılım Mühendisi', 'Lider Yazılım Mühendisi', 5, 1, '2021-02-21 14:31:32');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `full_name` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8_turkish_ci DEFAULT NULL,
  `recruitmentDate` datetime DEFAULT NULL,
  `birthDate` datetime DEFAULT NULL,
  `birthPlace` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `permissions` varchar(1000) COLLATE utf8_turkish_ci DEFAULT NULL,
  `user_role_id` int(11) DEFAULT 2,
  `user_title_id` int(11) DEFAULT NULL,
  `user_project_id` int(11) DEFAULT NULL,
  `tckn` varchar(11) COLLATE utf8_turkish_ci DEFAULT NULL,
  `phone` varchar(11) COLLATE utf8_turkish_ci DEFAULT NULL,
  `gender` varchar(1) COLLATE utf8_turkish_ci DEFAULT NULL,
  `user_account_approve_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `recruitmentDate`, `birthDate`, `birthPlace`, `isActive`, `createdAt`, `permissions`, `user_role_id`, `user_title_id`, `user_project_id`, `tckn`, `phone`, `gender`, `user_account_approve_date`) VALUES
(1, 'Admin Kullanıcısı', 'fatihcerci001@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '2021-02-01 00:00:00', '1995-09-10 00:00:00', 'Sivas / Merkez', 1, '1996-03-03 00:00:00', NULL, 1, 5, 7, NULL, NULL, NULL, NULL),
(7, 'Fatih Çerçi', 'chercycsgo@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '2021-02-01 00:00:00', '1995-02-21 00:00:00', 'SİVAS', 1, '2021-02-21 12:15:00', NULL, 2, 3, 9, NULL, NULL, NULL, NULL),
(8, 'Uğur Çerçi', 'chercy.001@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '2021-02-01 00:00:00', '1990-07-18 00:00:00', 'Erzincan / Merkez', 1, '2021-02-21 19:44:01', NULL, 2, 4, 7, NULL, NULL, NULL, NULL),
(9, 'Meryem Çerçi', 'melike.sbp@gmail.com', 'c9dce2fe8c183fc594767f3b40f94195', '2021-03-02 00:00:00', '1996-03-03 00:00:00', 'Sivas / Merkez', 1, '2021-03-02 22:23:16', NULL, 2, 2, 10, NULL, NULL, NULL, NULL),
(13, 'Uğur Çerçi', 'cerciugur@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', NULL, '1990-07-18 00:00:00', 'Erzincan / Merkez', 0, '2021-03-04 23:32:43', NULL, 2, NULL, NULL, '37927282684', '5061257885', NULL, NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `user_roles`
--

CREATE TABLE `user_roles` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(50) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `permissions` text COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `user_roles`
--

INSERT INTO `user_roles` (`id`, `title`, `permissions`, `isActive`, `createdAt`) VALUES
(1, 'Yönetici', '{\"announcements\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"blogs\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"brands\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"courses\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"dashboard\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"emailsettings\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"galleries\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"news\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"popups\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"portfolio\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"portfolio_categories\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"product\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"projects\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"references\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"services\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"settings\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"slides\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"testimonials\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"titles\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"userop\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"users\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"user_roles\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"}}', 1, '2021-02-20 12:42:45'),
(2, 'Çalışan', '{\"announcements\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"blogs\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"dashboard\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"settings\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"testimonials\":{\"read\":\"on\"},\"users\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"}}', 1, '2021-02-20 12:42:47');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `user_seen_notifications`
--

CREATE TABLE `user_seen_notifications` (
  `notification_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `timeToSee` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `user_seen_notifications`
--

INSERT INTO `user_seen_notifications` (`notification_id`, `user_id`, `timeToSee`) VALUES
(179, 7, '2021-02-28 19:17:47'),
(180, 7, '2021-02-28 19:17:47'),
(181, 7, '2021-02-28 19:17:47'),
(182, 7, '2021-02-28 19:17:47'),
(183, 7, '2021-02-28 19:21:48'),
(184, 7, '2021-02-28 19:21:48'),
(185, 7, '2021-02-28 19:23:22'),
(186, 7, '2021-02-28 19:23:22'),
(187, 7, '2021-02-28 20:25:27'),
(188, 7, '2021-02-28 20:25:44'),
(189, 7, '2021-03-01 00:16:58'),
(190, 7, '2021-03-01 00:16:58'),
(191, 1, '2021-03-01 00:20:05'),
(192, 7, '2021-03-02 23:06:27'),
(193, 7, '2021-03-02 23:06:27'),
(194, 10, '2021-03-04 22:29:05');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `email_settings`
--
ALTER TABLE `email_settings`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `patient_complaint`
--
ALTER TABLE `patient_complaint`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `patient_pills`
--
ALTER TABLE `patient_pills`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `titles`
--
ALTER TABLE `titles`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `user_seen_notifications`
--
ALTER TABLE `user_seen_notifications`
  ADD PRIMARY KEY (`notification_id`,`user_id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Tablo için AUTO_INCREMENT değeri `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Tablo için AUTO_INCREMENT değeri `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Tablo için AUTO_INCREMENT değeri `email_settings`
--
ALTER TABLE `email_settings`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- Tablo için AUTO_INCREMENT değeri `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Tablo için AUTO_INCREMENT değeri `patient_complaint`
--
ALTER TABLE `patient_complaint`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Tablo için AUTO_INCREMENT değeri `patient_pills`
--
ALTER TABLE `patient_pills`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Tablo için AUTO_INCREMENT değeri `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `titles`
--
ALTER TABLE `titles`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Tablo için AUTO_INCREMENT değeri `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
