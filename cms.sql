-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 21 Şub 2021, 17:29:49
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
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `description`, `rank`, `isActive`, `createdAt`, `user_id`) VALUES
(2, 'test', 'test', NULL, 1, '2021-02-21 18:29:37', 1);

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
(3, 'ironpunch', 'IRONPUNCH', '<p>asdasdasdasda</p>', 'basliksiz-10.png', 0, 1, '2021-02-20 20:22:39', '2021-02-20 20:22:39', 1),
(4, 'aaaaaa', 'AAAAAA', '<p>AAAAAAAA</p>', 'basliksiz-8.png', 0, 0, NULL, '2021-02-20 21:08:56', 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `brands`
--

CREATE TABLE `brands` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT '''',
  `img_url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT '''',
  `rank` int(255) DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `courses`
--

CREATE TABLE `courses` (
  `id` int(11) UNSIGNED NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `event_date` datetime DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

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
-- Tablo için tablo yapısı `files`
--

CREATE TABLE `files` (
  `id` int(11) UNSIGNED NOT NULL,
  `gallery_id` int(11) DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `rank` int(255) DEFAULT NULL,
  `isActive` tinyint(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `galleries`
--

CREATE TABLE `galleries` (
  `id` int(11) UNSIGNED NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `title` varchar(100) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `gallery_type` varchar(50) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `folder_name` varchar(50) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `rank` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `images`
--

CREATE TABLE `images` (
  `id` int(11) UNSIGNED NOT NULL,
  `gallery_id` int(11) DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `rank` int(255) DEFAULT NULL,
  `isActive` tinyint(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `members`
--

CREATE TABLE `members` (
  `id` int(11) UNSIGNED NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `isActive` tinyint(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `news`
--

CREATE TABLE `news` (
  `id` int(11) UNSIGNED NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `news_type` varchar(10) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `video_url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `popups`
--

CREATE TABLE `popups` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `page` varchar(50) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `portfolios`
--

CREATE TABLE `portfolios` (
  `id` int(11) UNSIGNED NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `finishedAt` datetime DEFAULT NULL,
  `client` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `place` varchar(100) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `portfolio_url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `portfolio_categories`
--

CREATE TABLE `portfolio_categories` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_turkish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `portfolio_images`
--

CREATE TABLE `portfolio_images` (
  `id` int(11) UNSIGNED NOT NULL,
  `portfolio_id` int(11) DEFAULT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `isActive` tinyint(11) DEFAULT NULL,
  `isCover` tinyint(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `products`
--

CREATE TABLE `products` (
  `id` int(11) UNSIGNED NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) UNSIGNED NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `isActive` tinyint(11) DEFAULT NULL,
  `isCover` tinyint(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `references`
--

CREATE TABLE `references` (
  `id` int(11) UNSIGNED NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `services`
--

CREATE TABLE `services` (
  `id` int(11) UNSIGNED NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

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
-- Tablo için tablo yapısı `slides`
--

CREATE TABLE `slides` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(50) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `allowButton` tinyint(4) DEFAULT NULL,
  `button_url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `button_caption` varchar(25) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `animation_type` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `animation_time` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `description` varchar(500) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `full_name` varchar(50) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `company` varchar(50) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `rank` tinyint(4) DEFAULT -99,
  `isActive` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

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
  `user_title_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `recruitmentDate`, `birthDate`, `birthPlace`, `isActive`, `createdAt`, `permissions`, `user_role_id`, `user_title_id`) VALUES
(1, 'Admin Kullanıcısı', 'fatihcerci001@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '2021-02-01 00:00:00', '1995-09-10 00:00:00', 'Sivas / Merkez', 1, '1996-03-03 00:00:00', NULL, 1, 5),
(7, 'Fatih Çerçi', 'chercycsgo@gmail.com', 'c9d5bc1fc95088126806248be0d460c6', '2021-02-01 00:00:00', '1995-02-21 00:00:00', 'SİVAS', 1, '2021-02-21 12:15:00', NULL, 2, 3);

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
(1, 'Yönetici', '{\"announcements\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"blogs\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"brands\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"courses\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"dashboard\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"emailsettings\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"galleries\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"news\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"popups\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"portfolio\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"portfolio_categories\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"product\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"references\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"services\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"settings\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"slides\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"testimonials\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"titles\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"userop\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"users\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"},\"user_roles\":{\"read\":\"on\",\"write\":\"on\",\"update\":\"on\",\"delete\":\"on\"}}', 1, '2021-02-20 12:42:45'),
(2, 'Çalışan', NULL, 1, '2021-02-20 12:42:47');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `videos`
--

CREATE TABLE `videos` (
  `id` int(11) UNSIGNED NOT NULL,
  `gallery_id` int(11) DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `rank` int(255) DEFAULT NULL,
  `isActive` tinyint(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `email_settings`
--
ALTER TABLE `email_settings`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `popups`
--
ALTER TABLE `popups`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `portfolios`
--
ALTER TABLE `portfolios`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `portfolio_categories`
--
ALTER TABLE `portfolio_categories`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `portfolio_images`
--
ALTER TABLE `portfolio_images`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `references`
--
ALTER TABLE `references`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `slides`
--
ALTER TABLE `slides`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `testimonials`
--
ALTER TABLE `testimonials`
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
-- Tablo için indeksler `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `email_settings`
--
ALTER TABLE `email_settings`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `galleries`
--
ALTER TABLE `galleries`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `popups`
--
ALTER TABLE `popups`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `portfolios`
--
ALTER TABLE `portfolios`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `portfolio_categories`
--
ALTER TABLE `portfolio_categories`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `portfolio_images`
--
ALTER TABLE `portfolio_images`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `references`
--
ALTER TABLE `references`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `slides`
--
ALTER TABLE `slides`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `titles`
--
ALTER TABLE `titles`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Tablo için AUTO_INCREMENT değeri `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
