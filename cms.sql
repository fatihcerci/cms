-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 24 Şub 2021, 21:48:02
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
(2, 'test', 'test', NULL, 1, '2021-02-21 18:29:37', 1),
(3, 'ICAP Sürüm Planı hk.', '<ul><li style=\"text-align: center; \"><b>DUYURU</b></li><li style=\"text-align: center; \"><b><br></b></li><li style=\"text-align: center; \">Merhaba arkadaşlar, akşam ki sürümde side-menu ve side-json dosyalarını export almayı unutmayalım.</li><li style=\"text-align: center; \">Ek olarak: Çarşamba ve Perşembe günleri evde çalışacak arkadaşların listesini mailden gönderdim.</li></ul><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">İyi çalışmalar,</p><p style=\"text-align: center;\">Fatih</p>', NULL, 1, '2021-02-21 19:50:28', 8);

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
(3, 'test', 'Test', '<p><br></p>', 'basliksiz-10.png', 0, 1, '2021-02-21 20:22:39', '2021-02-21 20:22:39', 1),
(4, 'aaaaaa', 'AAAAAA', '<p>AAAAAAAA</p>', 'basliksiz-8.png', 0, 1, '2021-02-24 23:46:50', '2021-02-21 21:08:56', 1),
(5, 'vue-js-ile-cms-yapimi', 'Vue.js ile CMS yapımı', '<p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>', 'basliksiz-10.png', 0, 0, NULL, '2021-02-23 22:22:25', 7),
(6, 'vue-js-ile-cms-yapimi', 'Vue.js ile CMS yapımı', '<p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>', 'basliksiz-10.png', 0, 0, NULL, '2021-02-23 22:22:44', 7),
(7, 'test-blog-testtttttt', 'test blog testtttttt', '<p>test blog testttt</p>', 'basliksiz-12.png', 0, 1, '2021-02-24 19:41:54', '2021-02-24 19:41:38', 1),
(8, 'aaaaaaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaaaa', '<p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>', 'basliksiz-11.png', 0, 0, NULL, '2021-02-24 20:55:14', 7);

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

--
-- Tablo döküm verisi `galleries`
--

INSERT INTO `galleries` (`id`, `url`, `title`, `gallery_type`, `folder_name`, `isActive`, `createdAt`, `rank`) VALUES
(1, 'aa', 'aa', 'image', 'aa', 1, '2021-02-24 22:48:46', 0),
(2, 'aaaaaaaa', 'aaaaaaaa', 'video', '', 1, '2021-02-24 22:55:01', 0);

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

--
-- Tablo döküm verisi `images`
--

INSERT INTO `images` (`id`, `gallery_id`, `url`, `rank`, `isActive`, `createdAt`) VALUES
(1, 1, 'basliksiz-10.png', 0, 1, '2021-02-24 22:49:10'),
(2, 1, 'basliksiz-11.png', 0, 1, '2021-02-24 22:49:18'),
(3, 1, 'basliksiz-12.png', 0, 1, '2021-02-24 22:54:21'),
(4, 1, 'basliksiz-11.png', 0, 1, '2021-02-24 23:00:11');

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
-- Tablo için tablo yapısı `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) UNSIGNED NOT NULL,
  `description` text COLLATE utf8_turkish_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8_turkish_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `to_user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `notifications`
--

INSERT INTO `notifications` (`id`, `description`, `url`, `createdAt`, `user_id`, `to_user_id`) VALUES
(4, '<b>Vue.js ile CMS yapımı</b> başlıklı bir blog paylaştı', 'vue-js-ile-cms-yapimi', '2021-02-23 22:22:44', 7, NULL),
(12, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 19:40:34', 1, 7),
(13, '<b>test blog testtttttt</b> başlıklı bir blog paylaştı', 'test-blog-testtttttt', '2021-02-24 19:41:38', 1, NULL),
(14, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 19:42:01', 1, 7),
(15, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 19:42:02', 1, 7),
(16, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı bir blog paylaştı', 'aaaaaaaaaaaaaaaaaaa', '2021-02-24 20:55:14', 7, NULL),
(17, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 20:55:36', 1, 7),
(18, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 20:56:09', 1, 7),
(19, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 20:56:54', 1, 7),
(20, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 20:56:54', 1, 7),
(21, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 20:57:08', 1, 7),
(22, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 20:57:29', 1, 7),
(23, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 20:57:30', 1, 7),
(24, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:00:18', 1, 7),
(25, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:00:19', 1, 7),
(26, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:00:33', 1, 7),
(27, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:00:39', 1, 7),
(28, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:16:55', 1, 7),
(29, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:16:55', 1, 7),
(30, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:16:56', 1, 7),
(31, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:16:57', 1, 7),
(32, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:16:57', 1, 7),
(33, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:17:39', 1, 7),
(34, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:17:39', 1, 7),
(35, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:19:25', 1, 7),
(36, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:19:27', 1, 7),
(37, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:19:27', 1, 7),
(38, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:19:29', 1, 7),
(39, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:19:52', 1, 7),
(40, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:19:54', 1, 7),
(41, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:19:54', 1, 7),
(42, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:20:38', 1, 7),
(43, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:20:39', 1, 7),
(44, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:20:40', 1, 7),
(45, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:20:47', 1, 7),
(46, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:25:59', 1, 7),
(47, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:26:02', 1, 7),
(48, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:26:03', 1, 7),
(49, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:27:03', 1, 7),
(50, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:27:05', 1, 7),
(51, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:27:30', 1, 7),
(52, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:27:31', 1, 7),
(53, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:28:13', 1, 7),
(54, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:29:08', 1, 7),
(55, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:31:05', 1, 7),
(56, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:35:31', 1, 7),
(57, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:35:33', 1, 7),
(58, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:36:03', 1, 7),
(59, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:37:38', 1, 7),
(60, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:37:39', 1, 7),
(61, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:38:45', 1, 7),
(62, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:38:46', 1, 7),
(63, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:41:48', 1, 7),
(64, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:41:51', 1, 7),
(65, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:42:56', 1, 7),
(66, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:43:04', 1, 7),
(67, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:43:05', 1, 7),
(68, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:43:06', 1, 7),
(69, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:43:08', 1, 7),
(70, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:43:20', 1, 7),
(71, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:44:37', 1, 7),
(72, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:44:39', 1, 7),
(73, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:45:35', 1, 7),
(74, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:45:36', 1, 7),
(75, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:46:35', 1, 7),
(76, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:46:37', 1, 7),
(77, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:46:47', 1, 7),
(78, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:47:12', 1, 7),
(79, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:47:14', 1, 7),
(80, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:47:53', 1, 7),
(81, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:48:22', 1, 7),
(82, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:50:10', 1, 7),
(83, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:51:20', 1, 7),
(84, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:51:23', 1, 7),
(85, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:51:36', 1, 7),
(86, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:51:56', 1, 7),
(87, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:51:56', 1, 7),
(88, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:51:58', 1, 7),
(89, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:52:30', 1, 7),
(90, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:52:30', 1, 7),
(91, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:53:44', 1, 7),
(92, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:53:45', 1, 7),
(93, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:53:47', 1, 7),
(94, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:55:11', 1, 7),
(95, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:55:12', 1, 7),
(96, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:55:13', 1, 7),
(97, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:55:24', 1, 7),
(98, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:55:24', 1, 7),
(99, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:55:32', 1, 7),
(100, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:55:33', 1, 7),
(101, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:55:34', 1, 7),
(102, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:55:34', 1, 7),
(103, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:55:49', 1, 7),
(104, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:56:05', 1, 7),
(105, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:56:09', 1, 7),
(106, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:56:11', 1, 7),
(107, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:56:23', 1, 7),
(108, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:56:29', 1, 7),
(109, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:56:30', 1, 7),
(110, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:56:49', 1, 7),
(111, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:56:51', 1, 7),
(112, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:56:53', 1, 7),
(113, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:57:08', 1, 7),
(114, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:57:37', 1, 7),
(115, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:57:39', 1, 7),
(116, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:58:11', 1, 7),
(117, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:58:12', 1, 7),
(118, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:58:13', 1, 7),
(119, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:58:16', 1, 7),
(120, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:58:22', 1, 7),
(121, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 21:58:31', 1, 7),
(122, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:59:00', 1, 7),
(123, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 21:59:20', 1, 7),
(124, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 22:13:52', 1, 7),
(125, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 22:14:49', 1, 7),
(126, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 22:34:46', 1, 7),
(127, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 22:38:22', 1, 7),
(128, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 22:38:24', 1, 7),
(129, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:15:50', 1, 7),
(130, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:15:51', 1, 7),
(131, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:15:51', 1, 7),
(132, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:16:30', 1, 7),
(133, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:16:36', 1, 7),
(134, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:16:37', 1, 7),
(135, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:17:06', 1, 7),
(136, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:17:21', 1, 7),
(137, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:17:24', 1, 7),
(138, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:20:06', 1, 7),
(139, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:20:19', 1, 7),
(140, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:21:05', 1, 7),
(141, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:21:11', 1, 7),
(142, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:21:16', 1, 7),
(143, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:21:21', 1, 7),
(144, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:21:25', 1, 7),
(145, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:21:34', 1, 7),
(146, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:21:51', 1, 7),
(147, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:21:55', 1, 7),
(148, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:22:05', 1, 7),
(149, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:22:06', 1, 7),
(150, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:40:32', 1, 7),
(151, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:42:19', 1, 7),
(152, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:43:03', 1, 7),
(153, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:43:25', 1, 7),
(154, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:44:25', 1, 7),
(155, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:45:45', 1, 7),
(156, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:45:46', 1, 7),
(157, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:45:50', 1, 7),
(158, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:45:56', 1, 7),
(159, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:45:56', 1, 7),
(160, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:46:05', 1, 7),
(161, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:46:09', 1, 7),
(162, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:46:10', 1, 7),
(163, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:46:51', 1, 7),
(164, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayına alındı', '', '2021-02-24 23:46:52', 1, 7),
(165, '<b>aaaaaaaaaaaaaaaaaaa</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:47:07', 1, 7),
(166, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:47:08', 1, 7),
(167, '<b>Vue.js ile CMS yapımı</b> başlıklı blogunuz yayından kaldırıldı', '', '2021-02-24 23:47:08', 1, 7);

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

--
-- Tablo döküm verisi `testimonials`
--

INSERT INTO `testimonials` (`id`, `title`, `description`, `full_name`, `company`, `img_url`, `rank`, `isActive`, `createdAt`) VALUES
(1, 'Test', 'Başarılı', 'Uğur Çerçi', 'LENORA', 'basliksiz-12.png', -99, 1, '2021-02-21 19:58:09');

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
(7, 'Fatih Çerçi', 'chercycsgo@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '2021-02-01 00:00:00', '1995-02-21 00:00:00', 'SİVAS', 1, '2021-02-21 12:15:00', NULL, 2, 3),
(8, 'Uğur Çerçi', 'chercy.001@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '2021-02-01 00:00:00', '1990-07-18 00:00:00', 'Erzincan / Merkez', 1, '2021-02-21 19:44:01', NULL, 2, 4);

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
(4, 1, '2021-02-24 21:35:13'),
(12, 7, '2021-02-24 21:35:22'),
(13, 7, '2021-02-24 21:35:22'),
(14, 7, '2021-02-24 21:35:22'),
(15, 7, '2021-02-24 21:35:22'),
(16, 1, '2021-02-24 21:35:13'),
(17, 7, '2021-02-24 21:35:22'),
(18, 7, '2021-02-24 21:35:22'),
(19, 7, '2021-02-24 21:35:22'),
(20, 7, '2021-02-24 21:35:22'),
(21, 7, '2021-02-24 21:35:22'),
(22, 7, '2021-02-24 21:35:22'),
(23, 7, '2021-02-24 21:35:22'),
(24, 7, '2021-02-24 21:35:22'),
(25, 7, '2021-02-24 21:35:22'),
(26, 7, '2021-02-24 21:35:22'),
(27, 7, '2021-02-24 21:35:22'),
(28, 7, '2021-02-24 21:35:22'),
(29, 7, '2021-02-24 21:35:22'),
(30, 7, '2021-02-24 21:35:22'),
(31, 7, '2021-02-24 21:35:22'),
(32, 7, '2021-02-24 21:35:22'),
(33, 7, '2021-02-24 21:35:22'),
(34, 7, '2021-02-24 21:35:22'),
(35, 7, '2021-02-24 21:35:22'),
(36, 7, '2021-02-24 21:35:22'),
(37, 7, '2021-02-24 21:35:22'),
(38, 7, '2021-02-24 21:35:22'),
(39, 7, '2021-02-24 21:35:22'),
(40, 7, '2021-02-24 21:35:22'),
(41, 7, '2021-02-24 21:35:22'),
(42, 7, '2021-02-24 21:35:22'),
(43, 7, '2021-02-24 21:35:22'),
(44, 7, '2021-02-24 21:35:22'),
(45, 7, '2021-02-24 21:35:22'),
(46, 7, '2021-02-24 21:35:22'),
(47, 7, '2021-02-24 21:35:22'),
(48, 7, '2021-02-24 21:35:22'),
(49, 7, '2021-02-24 21:35:22'),
(50, 7, '2021-02-24 21:35:22'),
(51, 7, '2021-02-24 21:35:22'),
(52, 7, '2021-02-24 21:35:22'),
(53, 7, '2021-02-24 21:35:22'),
(54, 7, '2021-02-24 21:35:22'),
(55, 7, '2021-02-24 21:35:22'),
(56, 7, '2021-02-24 21:35:56'),
(57, 7, '2021-02-24 21:35:56'),
(58, 7, '2021-02-24 21:37:30'),
(59, 7, '2021-02-24 21:38:18'),
(60, 7, '2021-02-24 21:38:18'),
(61, 7, '2021-02-24 21:41:41'),
(62, 7, '2021-02-24 21:41:41'),
(63, 7, '2021-02-24 21:42:50'),
(64, 7, '2021-02-24 21:42:50'),
(65, 7, '2021-02-24 21:43:33'),
(66, 7, '2021-02-24 21:43:33'),
(67, 7, '2021-02-24 21:43:33'),
(68, 7, '2021-02-24 21:43:33'),
(69, 7, '2021-02-24 21:43:33'),
(70, 7, '2021-02-24 21:43:33'),
(71, 7, '2021-02-24 21:44:43'),
(72, 7, '2021-02-24 21:44:43'),
(73, 7, '2021-02-24 21:46:11'),
(74, 7, '2021-02-24 21:46:11'),
(75, 7, '2021-02-24 21:46:42'),
(76, 7, '2021-02-24 21:46:42'),
(77, 7, '2021-02-24 21:47:47'),
(78, 7, '2021-02-24 21:47:47'),
(79, 7, '2021-02-24 21:47:47'),
(80, 7, '2021-02-24 21:47:58'),
(81, 7, '2021-02-24 21:50:04'),
(82, 7, '2021-02-24 21:50:43'),
(83, 7, '2021-02-24 21:51:29'),
(84, 7, '2021-02-24 21:51:29'),
(85, 7, '2021-02-24 21:51:44'),
(86, 7, '2021-02-24 21:52:01'),
(87, 7, '2021-02-24 21:52:01'),
(88, 7, '2021-02-24 21:52:01'),
(89, 7, '2021-02-24 21:52:36'),
(90, 7, '2021-02-24 21:52:36'),
(91, 7, '2021-02-24 21:53:50'),
(92, 7, '2021-02-24 21:53:50'),
(93, 7, '2021-02-24 21:53:50'),
(94, 7, '2021-02-24 21:55:18'),
(95, 7, '2021-02-24 21:55:18'),
(96, 7, '2021-02-24 21:55:18'),
(97, 7, '2021-02-24 21:55:28'),
(98, 7, '2021-02-24 21:55:28'),
(99, 7, '2021-02-24 21:56:01'),
(100, 7, '2021-02-24 21:56:01'),
(101, 7, '2021-02-24 21:56:01'),
(102, 7, '2021-02-24 21:56:01'),
(103, 7, '2021-02-24 21:56:01'),
(104, 7, '2021-02-24 21:56:07'),
(105, 7, '2021-02-24 21:56:37'),
(106, 7, '2021-02-24 21:56:37'),
(107, 7, '2021-02-24 21:56:37'),
(108, 7, '2021-02-24 21:56:37'),
(109, 7, '2021-02-24 21:56:37'),
(110, 7, '2021-02-24 21:57:02'),
(111, 7, '2021-02-24 21:57:02'),
(112, 7, '2021-02-24 21:57:02'),
(113, 7, '2021-02-24 21:57:10'),
(114, 7, '2021-02-24 21:58:04'),
(115, 7, '2021-02-24 21:58:04'),
(116, 7, '2021-02-24 21:59:10'),
(117, 7, '2021-02-24 21:59:10'),
(118, 7, '2021-02-24 21:59:10'),
(119, 7, '2021-02-24 21:59:10'),
(120, 7, '2021-02-24 21:59:10'),
(121, 7, '2021-02-24 21:59:10'),
(122, 7, '2021-02-24 21:59:10'),
(123, 7, '2021-02-24 22:00:45'),
(124, 7, '2021-02-24 22:14:46'),
(125, 7, '2021-02-24 22:34:28'),
(126, 7, '2021-02-24 22:38:16'),
(127, 7, '2021-02-24 22:38:31'),
(128, 7, '2021-02-24 22:38:31'),
(129, 7, '2021-02-24 23:16:15'),
(130, 7, '2021-02-24 23:16:15'),
(131, 7, '2021-02-24 23:16:15'),
(132, 7, '2021-02-24 23:16:42'),
(133, 7, '2021-02-24 23:16:42'),
(134, 7, '2021-02-24 23:16:42'),
(135, 7, '2021-02-24 23:17:12'),
(136, 7, '2021-02-24 23:17:27'),
(137, 7, '2021-02-24 23:17:27'),
(138, 7, '2021-02-24 23:20:10'),
(139, 7, '2021-02-24 23:20:29'),
(140, 7, '2021-02-24 23:21:30'),
(141, 7, '2021-02-24 23:21:30'),
(142, 7, '2021-02-24 23:21:30'),
(143, 7, '2021-02-24 23:21:30'),
(144, 7, '2021-02-24 23:21:30'),
(145, 7, '2021-02-24 23:21:45'),
(146, 7, '2021-02-24 23:22:00'),
(147, 7, '2021-02-24 23:22:00'),
(148, 7, '2021-02-24 23:22:13'),
(149, 7, '2021-02-24 23:22:13'),
(150, 7, '2021-02-24 23:41:20'),
(151, 7, '2021-02-24 23:42:56'),
(152, 7, '2021-02-24 23:43:18'),
(153, 7, '2021-02-24 23:44:20'),
(154, 7, '2021-02-24 23:44:35'),
(155, 7, '2021-02-24 23:45:48'),
(156, 7, '2021-02-24 23:45:48'),
(157, 7, '2021-02-24 23:46:16'),
(158, 7, '2021-02-24 23:46:16'),
(159, 7, '2021-02-24 23:46:16'),
(160, 7, '2021-02-24 23:46:16'),
(161, 7, '2021-02-24 23:46:16'),
(162, 7, '2021-02-24 23:46:16'),
(163, 7, '2021-02-24 23:46:59'),
(164, 7, '2021-02-24 23:46:59'),
(165, 7, '2021-02-24 23:47:14'),
(166, 7, '2021-02-24 23:47:14'),
(167, 7, '2021-02-24 23:47:14');

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
-- Tablo döküm verisi `videos`
--

INSERT INTO `videos` (`id`, `gallery_id`, `url`, `rank`, `isActive`, `createdAt`) VALUES
(1, 2, 'https://www.youtube.com/watch?v=F1oPP9hGdkI', 0, 1, '2021-02-24 22:55:08');

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
-- Tablo için indeksler `notifications`
--
ALTER TABLE `notifications`
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
-- Tablo için indeksler `user_seen_notifications`
--
ALTER TABLE `user_seen_notifications`
  ADD PRIMARY KEY (`notification_id`,`user_id`);

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
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
-- Tablo için AUTO_INCREMENT değeri `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;

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
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `titles`
--
ALTER TABLE `titles`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tablo için AUTO_INCREMENT değeri `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
