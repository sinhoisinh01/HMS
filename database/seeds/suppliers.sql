-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 31, 2016 at 05:24 AM
-- Server version: 5.6.26
-- PHP Version: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `du_toan`
--

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE IF NOT EXISTS `suppliers` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `address`) VALUES
(1, 'An Giang', ''),
(2, 'Bà Rịa- Vũng Tàu', ''),
(3, 'Bạc Liêu', ''),
(4, 'Bắc Kạn', ''),
(5, 'Bắc Giang', ''),
(6, 'Bắc Ninh', ''),
(7, 'Bến Tre', ''),
(8, 'Bình Dương', ''),
(9, 'Bình Định', ''),
(10, 'Bình Phước', ''),
(11, 'Bình Thuận', ''),
(12, 'Cà Mau', ''),
(13, 'Cao Bằng', ''),
(14, 'Cần Thơ', ''),
(15, 'Đà Nẵng', ''),
(16, 'ĐắK LắK', ''),
(17, 'ĐắK Nông', ''),
(18, 'Đồng Nai', ''),
(19, 'Đồng Tháp', ''),
(20, 'Điện Biên', ''),
(21, 'Gia Lai', ''),
(22, 'Hà Giang', ''),
(23, 'Hà Nam', ''),
(24, 'Hà Nội', ''),
(25, 'Hà Tĩnh', ''),
(26, 'Hải Dương', ''),
(27, 'Hải Phòng', ''),
(28, 'Hòa Bình', ''),
(29, 'Hậu Giang', ''),
(30, 'Hưng Yên', ''),
(31, 'TP. Hồ Chí Minh', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `suppliers_name_unique` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=32;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
