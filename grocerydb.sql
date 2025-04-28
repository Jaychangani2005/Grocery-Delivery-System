-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2025 at 10:27 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grocerydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Super Admin','Manager','Support','Finance') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `email`, `password`, `role`) VALUES
(1, 'admin1@example.com', 'admin1pass', 'Super Admin'),
(2, 'manager1@example.com', 'manager1pass', 'Manager'),
(3, 'support1@example.com', 'support1pass', 'Support'),
(4, 'finance1@example.com', 'finance1pass', 'Finance'),
(5, 'admin2@example.com', 'admin2pass', 'Super Admin'),
(6, 'manager2@example.com', 'manager2pass', 'Manager'),
(7, 'support2@example.com', 'support2pass', 'Support'),
(8, 'finance2@example.com', 'finance2pass', 'Finance'),
(9, 'admin3@example.com', 'admin3pass', 'Super Admin'),
(10, 'manager3@example.com', 'manager3pass', 'Manager');

-- --------------------------------------------------------

--
-- Table structure for table `admin_actions`
--

CREATE TABLE `admin_actions` (
  `action_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `target_type` enum('user','seller','product') DEFAULT NULL,
  `target_id` int(11) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_actions`
--

INSERT INTO `admin_actions` (`action_id`, `admin_id`, `description`, `target_type`, `target_id`, `timestamp`) VALUES
(1, 1, 'Approved seller FreshFarms', 'seller', 1, '2025-04-01 19:07:18'),
(2, 2, 'Rejected product Organic Apples', 'product', 2, '2025-04-01 19:07:18'),
(3, 3, 'Suspended user JohnDoe', 'user', 1, '2025-04-01 19:07:18'),
(4, 4, 'Updated commission rates', NULL, NULL, '2025-04-01 19:07:18'),
(5, 5, 'Approved discount code SUMMER20', 'product', 3, '2025-04-01 19:07:18'),
(6, 6, 'Edited category Dairy', 'product', 4, '2025-04-01 19:07:18'),
(7, 7, 'Blocked user Spammer123', 'user', 2, '2025-04-01 19:07:18'),
(8, 8, 'Processed settlement for Seller5', 'seller', 5, '2025-04-01 19:07:18'),
(9, 9, 'Updated delivery agent status', 'user', 3, '2025-04-01 19:07:18'),
(10, 10, 'Archived old products', 'product', 5, '2025-04-01 19:07:18'),
(11, 1, 'Delivery agent rejected: Kabir Khan', 'user', 9, '2025-04-02 06:53:35'),
(12, 1, 'Delivery agent rejected: Isha Choudhary', 'user', 8, '2025-04-02 06:53:36'),
(13, 1, 'Delivery agent approveed: Arjun Malhotra', 'user', 7, '2025-04-02 06:53:39'),
(14, 1, 'Delivery agent approveed: Ananya Reddy', 'user', 6, '2025-04-02 06:53:39'),
(15, 1, 'Seller rejected: SpiceWorld', 'seller', 5, '2025-04-02 06:54:35'),
(16, 1, 'Seller rejected: GrainsHub', 'seller', 3, '2025-04-02 06:54:35'),
(17, 1, 'Delivery agent approveed: Vikram Joshi', 'user', 5, '2025-04-02 06:54:50'),
(18, 1, 'Delivery agent approveed: Neha Gupta', 'user', 4, '2025-04-02 06:54:51'),
(19, 1, 'Delivery agent approveed: Rohan Singh', 'user', 3, '2025-04-02 06:54:51'),
(20, 1, 'Delivery agent approveed: Priya Sharma', 'user', 2, '2025-04-02 06:54:51'),
(21, 1, 'Delivery agent approveed: Aarav Patel', 'user', 1, '2025-04-02 06:54:51'),
(22, 1, 'Seller approveed: SaltMasters', 'seller', 10, '2025-04-02 06:59:16'),
(23, 1, 'Seller rejected: SaltMasters', 'seller', 10, '2025-04-02 06:59:34'),
(24, 1, 'Delivery agent approveed: Zoya Ansari', 'user', 10, '2025-04-02 07:01:50'),
(25, 1, 'Shopkeeper rejected: ID 1', 'seller', 1, '2025-04-02 07:02:23'),
(26, 1, 'Shopkeeper rejected: ID 3', 'seller', 3, '2025-04-02 07:02:28'),
(27, 1, 'Shopkeeper rejected: ID 1', 'seller', 1, '2025-04-02 07:02:40'),
(28, 1, 'Shopkeeper rejected: ID 3', 'seller', 3, '2025-04-02 07:02:41'),
(29, 1, 'Shopkeeper rejected: ID 4', 'seller', 4, '2025-04-02 07:02:42'),
(30, 1, 'Shopkeeper rejected: ID 5', 'seller', 5, '2025-04-02 07:02:43'),
(31, 1, 'Shopkeeper rejected: ID 6', 'seller', 6, '2025-04-02 07:02:44'),
(32, 1, 'Shopkeeper rejected: ID 7', 'seller', 7, '2025-04-02 07:02:44'),
(33, 1, 'Shopkeeper rejected: ID 8', 'seller', 8, '2025-04-02 07:02:45'),
(34, 1, 'Shopkeeper rejected: ID 9', 'seller', 9, '2025-04-02 07:02:46'),
(35, 1, 'Shopkeeper rejected: ID 10', 'seller', 10, '2025-04-02 07:02:47'),
(36, 1, 'Delivery agent approveed: Kabir Khan', 'user', 9, '2025-04-02 07:03:00'),
(37, 1, 'Delivery agent approveed: Isha Choudhary', 'user', 8, '2025-04-02 07:03:02'),
(38, 1, 'Shopkeeper approved: ID 1', 'seller', 1, '2025-04-02 07:03:12'),
(39, 1, 'Shopkeeper approved: ID 3', 'seller', 3, '2025-04-02 07:03:13'),
(40, 1, 'Shopkeeper approved: ID 4', 'seller', 4, '2025-04-02 07:03:14'),
(41, 1, 'Shopkeeper rejected: ID 3', 'seller', 3, '2025-04-02 07:03:15'),
(42, 1, 'Shopkeeper rejected: ID 1', 'seller', 1, '2025-04-02 07:12:29'),
(43, 1, 'Shopkeeper approved: ID 1', 'seller', 1, '2025-04-02 07:12:32'),
(44, 1, 'Delivery agent approveed: Arjun Malhotra', 'user', 7, '2025-04-02 08:26:42'),
(45, 1, 'Delivery agent rejected: Ananya Reddy', 'user', 6, '2025-04-02 08:26:49'),
(46, 1, 'Shopkeeper approved: ID 3', 'seller', 3, '2025-04-02 08:27:26'),
(47, 1, 'Shopkeeper approved: ID 6', 'seller', 6, '2025-04-02 08:33:55'),
(48, 1, 'Shopkeeper approved: ID 8', 'seller', 8, '2025-04-02 08:33:56'),
(49, 1, 'Shopkeeper rejected: ID 1', 'seller', 1, '2025-04-02 11:27:45'),
(50, 1, 'Shopkeeper approved: ID 1', 'seller', 1, '2025-04-02 11:27:51'),
(51, 1, 'Shopkeeper approved: ID 5', 'seller', 5, '2025-04-02 11:27:53'),
(52, 1, 'Shopkeeper rejected: ID 5', 'seller', 5, '2025-04-02 11:27:54'),
(53, 1, 'Delivery agent approveed: Vikram Joshi', 'user', 5, '2025-04-02 11:27:59'),
(54, 1, 'Delivery agent rejected: ID 5', 'user', 5, '2025-04-02 11:28:08'),
(55, 1, 'Delivery agent rejected: Aarav Patel', 'user', 1, '2025-04-02 11:28:18'),
(56, 1, 'Delivery agent rejected: Priya Sharma', 'user', 2, '2025-04-02 11:28:19'),
(57, 1, 'Delivery agent approved: ID 2', 'user', 2, '2025-04-02 11:28:25'),
(58, 1, 'Delivery agent approved: ID 1', 'user', 1, '2025-04-02 11:28:28'),
(59, 1, 'Shopkeeper approved: ID 5', 'seller', 5, '2025-04-02 12:09:26'),
(60, 1, 'Shopkeeper rejected: ID 5', 'seller', 5, '2025-04-02 12:09:26');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `user_id`, `created_at`) VALUES
(11, 1, '2025-04-05 15:33:27'),
(12, 11, '2025-04-23 17:25:54'),
(13, 12, '2025-04-24 12:22:20');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_item_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`cart_item_id`, `cart_id`, `product_id`, `quantity`, `added_at`) VALUES
(108, 13, 3, 2, '2025-04-25 08:49:11'),
(122, 12, 71, 2, '2025-04-27 08:23:32');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_agents`
--

CREATE TABLE `delivery_agents` (
  `agent_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobilenumber` bigint(10) NOT NULL,
  `Aadharnumber` bigint(12) NOT NULL,
  `pancard` varchar(10) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `pincode` int(6) NOT NULL,
  `vehicle_type` enum('Bike','Scooter','car') NOT NULL,
  `license_number` varchar(20) NOT NULL,
  `status` enum('available','busy','offline') DEFAULT 'available',
  `is_approved` tinyint(1) DEFAULT 0,
  `is_rejected` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `delivery_agents`
--

INSERT INTO `delivery_agents` (`agent_id`, `name`, `email`, `password`, `mobilenumber`, `Aadharnumber`, `pancard`, `Address`, `city`, `state`, `pincode`, `vehicle_type`, `license_number`, `status`, `is_approved`, `is_rejected`) VALUES
(11, 'Samarth ', 'samarth@gmail.com', '$2b$10$sy/GRBKsvjIwWuB7aAG1fuHySG74EgR77U0cgjrTgITTY6QdMDZkG', 9484400500, 867696116499, 'AKBPJ1122D', 'bhavnagar bahvnagar', 'bhavnafar', 'gujarat ', 364001, 'Bike', '123456780', 'available', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `delivery_earnings`
--

CREATE TABLE `delivery_earnings` (
  `earning_id` int(11) NOT NULL,
  `agent_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paid_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `delivery_locations`
--

CREATE TABLE `delivery_locations` (
  `location_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `accuracy` decimal(5,2) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `discounts`
--

CREATE TABLE `discounts` (
  `discount_id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `type` enum('percentage','fixed') NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `max_uses` int(11) DEFAULT NULL,
  `valid_from` datetime DEFAULT NULL,
  `valid_to` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discounts`
--

INSERT INTO `discounts` (`discount_id`, `code`, `type`, `value`, `max_uses`, `valid_from`, `valid_to`) VALUES
(1, 'WELCOME10', 'percentage', 10.00, 100, '2025-01-01 00:00:00', '2025-12-31 00:00:00'),
(2, 'SUMMER20', 'fixed', 20.00, 50, '2025-06-01 00:00:00', '2025-08-31 00:00:00'),
(3, 'DAIRY15', 'percentage', 15.00, 200, '2025-01-01 00:00:00', '2025-12-31 00:00:00'),
(4, 'EXPIRED5', 'fixed', 5.00, 10, '2023-01-01 00:00:00', '2023-01-31 00:00:00'),
(5, 'NUTS10', 'percentage', 10.00, 75, '2025-03-01 00:00:00', '2025-05-31 00:00:00'),
(6, 'OIL25', 'fixed', 25.00, 30, '2025-04-01 00:00:00', '2025-06-30 00:00:00'),
(7, 'TEA30', 'percentage', 30.00, 40, '2025-07-01 00:00:00', '2025-09-30 00:00:00'),
(8, 'CHOCO50', 'fixed', 50.00, 20, '2025-12-01 00:00:00', '2025-12-31 00:00:00'),
(9, 'SALT5', 'percentage', 5.00, 100, '2025-01-01 00:00:00', '2025-12-31 00:00:00'),
(10, 'FRESH12', 'fixed', 12.00, 60, '2025-02-01 00:00:00', '2025-04-30 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `discount_usage`
--

CREATE TABLE `discount_usage` (
  `usage_id` int(11) NOT NULL,
  `discount_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `subtotal` int(255) NOT NULL,
  `deliveryfee` int(255) NOT NULL,
  `codfee` int(255) NOT NULL,
  `tax` int(255) NOT NULL,
  `status` enum('new','pending','confirmed','preparing','ready','delivered','cancelled','Out For delivery') DEFAULT 'new',
  `payment_method` enum('cod','online') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `address_id`, `total`, `subtotal`, `deliveryfee`, `codfee`, `tax`, `status`, `payment_method`, `created_at`) VALUES
(62, 11, 15, 25.00, 0, 0, 0, 0, 'delivered', 'cod', '2025-04-24 11:28:43'),
(63, 11, 15, 620.00, 0, 0, 0, 0, 'delivered', 'cod', '2025-04-24 11:29:53'),
(64, 11, 15, 180.00, 0, 0, 0, 0, 'delivered', 'cod', '2025-04-24 11:31:56'),
(65, 11, 15, 40.00, 0, 0, 0, 0, 'pending', 'cod', '2025-04-24 19:26:56'),
(69, 11, 15, 40.00, 0, 0, 0, 0, 'cancelled', 'cod', '2025-04-24 19:37:22'),
(70, 11, 15, 35.00, 0, 0, 0, 0, 'Out For delivery', 'cod', '2025-04-24 19:39:17'),
(71, 11, 15, 600.00, 0, 0, 0, 0, 'pending', 'cod', '2025-04-24 19:41:36'),
(72, 11, 15, 600.00, 0, 0, 0, 0, 'new', 'cod', '2025-04-24 19:43:41'),
(73, 11, 15, 170.00, 0, 0, 0, 0, 'new', 'online', '2025-04-24 20:26:02'),
(74, 11, 15, 1240.00, 0, 0, 0, 0, 'cancelled', 'online', '2025-04-25 07:06:45'),
(75, 11, 15, 1290.00, 0, 0, 0, 0, 'new', 'cod', '2025-04-27 08:23:13');

-- --------------------------------------------------------

--
-- Table structure for table `order_delivery`
--

CREATE TABLE `order_delivery` (
  `delivery_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `agent_id` int(11) DEFAULT NULL,
  `pickup_time` datetime DEFAULT NULL,
  `delivery_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_delivery`
--

INSERT INTO `order_delivery` (`delivery_id`, `order_id`, `agent_id`, `pickup_time`, `delivery_time`) VALUES
(11, 62, 11, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`order_item_id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(69, 62, 71, 1, 25.00),
(70, 63, 24, 1, 620.00),
(71, 64, 47, 1, 180.00),
(72, 65, 79, 1, 40.00),
(76, 69, 79, 1, 40.00),
(77, 70, 30, 1, 35.00),
(78, 71, 3, 1, 600.00),
(79, 72, 3, 1, 600.00),
(80, 73, 38, 2, 50.00),
(81, 73, 45, 2, 35.00),
(82, 74, 24, 2, 620.00),
(83, 75, 15, 2, 45.00),
(84, 75, 3, 2, 600.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_ratings`
--

CREATE TABLE `order_ratings` (
  `rating_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `stars` int(11) DEFAULT NULL CHECK (`stars` between 1 and 5),
  `comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_status_history`
--

CREATE TABLE `order_status_history` (
  `history_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `old_status` varchar(50) DEFAULT NULL,
  `new_status` varchar(50) NOT NULL,
  `changed_by` enum('system','seller','user','admin') DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_status_history`
--

INSERT INTO `order_status_history` (`history_id`, `order_id`, `old_status`, `new_status`, `changed_by`, `timestamp`) VALUES
(69, 62, NULL, 'new', 'system', '2025-04-24 11:28:43'),
(70, 63, NULL, 'new', 'system', '2025-04-24 11:29:53'),
(71, 64, NULL, 'new', 'system', '2025-04-24 11:31:56'),
(72, 65, NULL, 'new', 'system', '2025-04-24 19:26:56'),
(73, 69, NULL, 'new', 'system', '2025-04-24 19:37:22'),
(74, 70, NULL, 'new', 'system', '2025-04-24 19:39:17'),
(75, 71, NULL, 'new', 'system', '2025-04-24 19:41:36'),
(76, 72, NULL, 'new', 'system', '2025-04-24 19:43:41'),
(77, 73, NULL, 'new', 'system', '2025-04-24 20:26:02'),
(78, 74, NULL, 'new', 'system', '2025-04-25 07:06:45'),
(79, 63, 'ready', 'ready', '', '2025-04-26 07:41:37'),
(80, 63, 'ready', 'Out For delivery', '', '2025-04-26 07:41:42'),
(81, 63, 'Out For delivery', 'delivered', '', '2025-04-26 07:41:50'),
(82, 62, 'ready', 'ready', '', '2025-04-26 07:42:04'),
(83, 62, 'ready', 'Out For delivery', '', '2025-04-26 07:42:05'),
(84, 62, 'Out For delivery', 'delivered', '', '2025-04-26 07:42:09'),
(85, 62, 'confirmed', 'ready', '', '2025-04-26 07:43:24'),
(86, 62, 'ready', 'Out For delivery', '', '2025-04-26 07:43:25'),
(87, 64, 'ready', 'ready', '', '2025-04-26 09:11:20'),
(88, 64, 'ready', 'Out For delivery', '', '2025-04-26 09:11:22'),
(89, 64, 'Out For delivery', 'delivered', '', '2025-04-26 09:11:27'),
(90, 62, 'Out For delivery', 'delivered', '', '2025-04-26 09:11:30'),
(91, 75, NULL, 'new', 'system', '2025-04-27 08:23:13');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `razorpay_id` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('success','failed') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `order_id`, `razorpay_id`, `amount`, `status`, `created_at`) VALUES
(62, 62, 'rzp_0xkw0ohup', 25.00, '', '2025-04-24 11:28:43'),
(63, 63, 'rzp_l4c3oajp4', 620.00, '', '2025-04-24 11:29:53'),
(64, 64, 'rzp_4697jkfgy', 180.00, '', '2025-04-24 11:31:56'),
(65, 65, 'rzp_by61ka0bo', 40.00, '', '2025-04-24 19:26:56'),
(66, 69, 'rzp_tj6it5jj5', 40.00, '', '2025-04-24 19:37:22'),
(67, 70, 'rzp_d7mvmz0lo', 35.00, '', '2025-04-24 19:39:17'),
(68, 71, 'rzp_o4vba2y7b', 600.00, '', '2025-04-24 19:41:36'),
(69, 72, 'rzp_unxlwpwhi', 600.00, '', '2025-04-24 19:43:41'),
(70, 73, 'rzp_sw5ndnivl', 170.00, 'success', '2025-04-24 20:26:02'),
(71, 74, 'rzp_ukse4yya3', 1240.00, 'success', '2025-04-25 07:06:45'),
(72, 75, 'rzp_zn9o7jkfu', 1290.00, '', '2025-04-27 08:23:13');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL DEFAULT 1,
  `name` varchar(255) NOT NULL,
  `product_detail` varchar(500) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `mrp` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `shelflife` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `subcategory_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `seller_id`, `name`, `product_detail`, `unit`, `price`, `mrp`, `stock`, `shelflife`, `category_id`, `subcategory_id`) VALUES
(1, 1, 'Aashirvaad Whole Wheat Atta', 'Stone-ground atta', '5kg', 250.00, 275.00, 100, '6 months', 1, NULL),
(2, 1, 'Fortune Chakki Fresh Atta', 'Freshly milled atta', '10kg', 480.00, 500.00, 75, '8 months', 1, NULL),
(3, 1, 'Daawat Basmati Rice', 'Premium long grain', '5kg', 600.00, 650.00, 43, '12 months', 1, NULL),
(4, 1, 'India Gate Basmati Rice', 'Classic basmati', '5kg', 550.00, 600.00, 60, '12 months', 1, NULL),
(5, 1, 'Kohinoor Super Basmati', 'Aged basmati', '5kg', 700.00, 750.00, 40, '12 months', 1, NULL),
(6, 1, 'Tata Sampann Toor Dal', 'High protein dal', '1kg', 120.00, 135.00, 200, '6 months', 1, NULL),
(7, 1, 'Tata Sampann Moong Dal', 'Split green gram', '1kg', 110.00, 125.00, 180, '6 months', 1, NULL),
(8, 1, 'Fortune Everyday Basmati', 'Daily use rice', '5kg', 450.00, 490.00, 90, '12 months', 1, NULL),
(9, 1, 'Rajdhani Chana Dal', 'Premium chana dal', '1kg', 95.00, 110.00, 150, '6 months', 1, NULL),
(10, 1, 'Kohinoor Brown Rice', 'Unpolished rice', '2kg', 180.00, 200.00, 80, '12 months', 1, NULL),
(11, 1, '24 Mantra Organic Dal', 'Certified organic', '1kg', 150.00, 170.00, 119, '6 months', 1, NULL),
(12, 1, 'Patanjali Atta', 'Whole wheat flour', '5kg', 220.00, 240.00, 110, '6 months', 1, NULL),
(13, 1, 'Natureland Organic Moong Dal', 'Chemical-free', '1kg', 130.00, 145.00, 70, '6 months', 1, NULL),
(14, 1, 'Everest Red Chilli Powder', 'Hot & spicy', '200g', 55.00, 60.00, 150, '12 months', 2, NULL),
(15, 1, 'MDH Garam Masala', 'Traditional blend', '100g', 45.00, 50.00, 198, '12 months', 2, NULL),
(16, 1, 'Catch Coriander Powder', 'Aromatic powder', '100g', 30.00, 35.00, 180, '12 months', 2, NULL),
(17, 1, 'Tata Sampann Turmeric Powder', 'Pure haldi', '200g', 65.00, 70.00, 160, '12 months', 2, NULL),
(18, 1, 'Fortune Sunflower Oil', 'Refined oil', '5L', 650.00, 700.00, 40, '18 months', 2, NULL),
(19, 1, 'Saffola Gold Cooking Oil', 'Heart-healthy oil', '5L', 750.00, 800.00, 35, '18 months', 2, NULL),
(20, 1, 'Dhara Mustard Oil', 'Kachi ghani', '1L', 180.00, 200.00, 90, '18 months', 2, NULL),
(21, 1, 'Patanjali Desi Ghee', 'Pure cow ghee', '1L', 450.00, 500.00, 60, '12 months', 2, NULL),
(22, 1, 'Amul Pure Ghee', 'Premium quality', '1L', 480.00, 520.00, 50, '12 months', 2, NULL),
(23, 1, 'Everest Kitchen King Masala', 'All-purpose masala', '100g', 50.00, 55.00, 170, '12 months', 2, NULL),
(24, 1, 'Gold Winner Sunflower Oil', 'Zero cholesterol', '5L', 620.00, 670.00, 42, '18 months', 2, NULL),
(25, 1, 'Lays Classic Salted', 'Potato chips', '50g', 20.00, 25.00, 500, '3 months', 3, NULL),
(26, 1, 'Kurkure Masala Munch', 'Corn snacks', '60g', 25.00, 30.00, 400, '4 months', 3, NULL),
(27, 1, 'Haldiram`s Aloo Bhujia', 'Traditional snack', '200g', 45.00, 50.00, 300, '3 months', 3, NULL),
(28, 1, 'Bingo! Mad Angles', 'Tangy triangles', '70g', 15.00, 20.00, 350, '4 months', 3, NULL),
(29, 1, 'Pringles Original', 'Stackable chips', '110g', 100.00, 110.00, 200, '6 months', 3, NULL),
(30, 1, 'Cornitos Nacho Chips', 'Mexican style', '75g', 35.00, 40.00, 249, '5 months', 3, NULL),
(31, 1, 'Too Yumm Multigrain Chips', 'Healthy snacks', '60g', 30.00, 35.00, 180, '4 months', 3, NULL),
(32, 1, 'Haldiram\`s Moong Dal', 'Crispy lentils', '150g', 40.00, 45.00, 220, '3 months', 3, NULL),
(33, 1, 'Sunfeast Yippee Noodles', 'Instant noodles', '70g', 15.00, 20.00, 300, '6 months', 3, NULL),
(34, 1, 'Maggi 2-Minute Noodles', 'Masala flavor', '70g', 12.00, 15.00, 400, '6 months', 3, NULL),
(35, 1, 'Coca-Cola', '750ml PET bottle', '750ml', 50.00, 60.00, 200, '9 months', 4, NULL),
(36, 1, 'Pepsi', '750ml PET bottle', '750ml', 50.00, 60.00, 180, '9 months', 4, NULL),
(37, 1, 'Sprite', '750ml PET bottle', '750ml', 50.00, 60.00, 150, '9 months', 4, NULL),
(38, 1, 'Fanta', '750ml PET bottle', '750ml', 50.00, 60.00, 118, '9 months', 4, NULL),
(39, 1, 'Thums Up', '750ml PET bottle', '750ml', 50.00, 60.00, 170, '9 months', 4, NULL),
(40, 1, 'Slice Mango', '1L tetra pack', '1L', 65.00, 70.00, 100, '3 months', 4, NULL),
(41, 1, 'Maaza', '1.2L PET bottle', '1.2L', 80.00, 90.00, 90, '2 months', 4, NULL),
(42, 1, 'Real Mixed Fruit Juice', '1L tetra pack', '1L', 110.00, 120.00, 79, '1 month', 4, NULL),
(43, 1, 'Tropicana Orange Juice', '1L tetra pack', '1L', 120.00, 135.00, 70, '15 days', 4, NULL),
(44, 1, 'Paper Boat Aam Panna', '250ml pouch', '250ml', 25.00, 30.00, 150, '3 months', 4, NULL),
(45, 1, 'Appy Fizz', '250ml can', '250ml', 35.00, 40.00, 198, '6 months', 4, NULL),
(46, 1, 'Red Bull Energy Drink', '250ml can', '250ml', 115.00, 125.00, 100, '12 months', 4, NULL),
(47, 1, 'Tata Tea Gold', '500g pack', '500g', 180.00, 200.00, 119, '8 months', 5, NULL),
(48, 1, 'Red Label Tea', '500g pack', '500g', 150.00, 170.00, 150, '8 months', 5, NULL),
(49, 1, 'Taj Mahal Tea', '250g pack', '250g', 120.00, 135.00, 100, '8 months', 5, NULL),
(50, 1, 'Lipton Green Tea', '25 bags', '25ct', 85.00, 95.00, 200, '12 months', 5, NULL),
(51, 1, 'Tetley Green Tea', '25 bags', '25ct', 80.00, 90.00, 180, '12 months', 5, NULL),
(52, 1, 'Bru Instant Coffee', '100g jar', '100g', 90.00, 100.00, 150, '12 months', 5, NULL),
(53, 1, 'Nescafe Classic', '50g jar', '50g', 110.00, 120.00, 200, '12 months', 5, NULL),
(54, 1, 'Nescafe Gold', '100g jar', '100g', 250.00, 275.00, 100, '12 months', 5, NULL),
(55, 1, 'Davidoff Instant Coffee', '100g jar', '100g', 400.00, 450.00, 80, '12 months', 5, NULL),
(56, 1, 'Continental Coffee', '200g pack', '200g', 150.00, 170.00, 120, '12 months', 5, NULL),
(57, 1, 'Wagh Bakri Tea', '500g pack', '500g', 160.00, 180.00, 110, '8 months', 5, NULL),
(58, 1, 'Britannia Bread', '400g loaf', '400g', 35.00, 40.00, 200, '3 days', 6, NULL),
(59, 1, 'Parle-G Biscuits', '100g pack', '100g', 10.00, 12.00, 500, '3 months', 6, NULL),
(60, 1, 'Bourbon Chocolate Cream', '150g pack', '150g', 25.00, 30.00, 300, '2 months', 6, NULL),
(61, 1, 'Good Day Cashew Cookies', '200g pack', '200g', 30.00, 35.00, 250, '2 months', 6, NULL),
(62, 1, 'Oreo Cookies', '150g pack', '150g', 30.00, 35.00, 400, '3 months', 6, NULL),
(63, 1, 'Hide & Seek Fab', '100g pack', '100g', 20.00, 25.00, 350, '3 months', 6, NULL),
(64, 1, 'Little Debbie Swiss Rolls', '6pc pack', '6pc', 50.00, 60.00, 150, '15 days', 6, NULL),
(65, 1, 'Dairy Milk Silk', '150g bar', '150g', 90.00, 100.00, 200, '6 months', 7, NULL),
(66, 1, '5 Star', '50g bar', '50g', 15.00, 20.00, 290, '8 months', 7, NULL),
(67, 1, 'KitKat 4-Finger', '41.5g bar', '41.5g', 20.00, 25.00, 400, '8 months', 7, NULL),
(68, 1, 'Munch', '30g bar', '30g', 10.00, 12.00, 500, '6 months', 7, NULL),
(69, 1, 'Ferrero Rocher', '3pc box', '3pc', 75.00, 85.00, 150, '10 months', 7, NULL),
(70, 1, 'Amul Dark Chocolate', '150g bar', '150g', 80.00, 90.00, 180, '6 months', 7, NULL),
(71, 1, 'Nestle Milkybar', '40g bar', '40g', 25.00, 30.00, 217, '8 months', 7, NULL),
(72, 1, 'Surf Excel Detergent', '1kg pack', '1kg', 120.00, 135.00, 150, '24 months', 8, NULL),
(73, 1, 'Ariel Matic Powder', '2kg pack', '2kg', 200.00, 220.00, 120, '24 months', 8, NULL),
(74, 1, 'Vim Dishwash Bar', '500g', '500g', 25.00, 30.00, 300, '12 months', 8, NULL),
(75, 1, 'Lizol Floor Cleaner', '1L bottle', '1L', 150.00, 165.00, 100, '18 months', 8, NULL),
(76, 1, 'Harpic Toilet Cleaner', '1L bottle', '1L', 65.00, 75.00, 200, '18 months', 8, NULL),
(77, 1, 'Dettol Antiseptic Liquid', '500ml', '500ml', 85.00, 95.00, 180, '36 months', 8, NULL),
(78, 1, 'Odonil Room Freshener', '200g', '200g', 35.00, 40.00, 250, '24 months', 8, NULL),
(79, 1, 'balalji simply salted potato waffer', 'Made from choicest potatoes.\r\nWith the classic salty flavour.\r\nLight and crunchy crisps.\r\nPerfect to snack to binge on any time or anywhere.', '1', 40.00, 40.00, 8, '3 month', 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`category_id`, `name`, `image_url`, `admin_id`) VALUES
(1, 'Atta, Rice & Dal', '/images/category/atta_rice_dal.jpg', 1),
(2, 'Masala, Oil & More', '/images/category/masala_oil.jpg', 1),
(3, 'Snacks', '/images/category/snacks.jpg', 1),
(4, 'Cold Drinks & Juices', '/images/category/cold_drinks.jpg', 1),
(5, 'Tea, Coffee & More', '/images/category/tea_coffee.jpg', 1),
(6, 'Bakery & Biscuit', '/images/category/bakery_biscuit.jpg', 1),
(7, 'Chocolates', '/images/category/chocolates.jpg', 1),
(8, 'Home Essentials', '/images/category/home_essentials.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `image_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_primary` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`image_id`, `product_id`, `image_url`, `is_primary`) VALUES
(1, 1, '/images/atta_rice_dal/aashirvaad_whole_wheat_atta.jpg', 1),
(2, 2, '/images/atta_rice_dal/fortune_chakki_atta.jpg', 1),
(3, 3, '/images/atta_rice_dal/daawat_basmati_rice.jpg', 1),
(4, 4, '/images/atta_rice_dal/India_Gate_Basmati_Rice.jpg', 1),
(5, 5, '/images/atta_rice_dal/kohinoor_super_basmati.jpg', 1),
(6, 6, '/images/atta_rice_dal/tata_toor_dal.jpg', 1),
(7, 7, '/images/atta_rice_dal/tata_moong_dal.jpg', 1),
(8, 8, '/images/atta_rice_dal/fortune_everyday_basmati.jpg', 1),
(9, 9, '/images/atta_rice_dal/rajdhani_chana_dal.jpg', 1),
(10, 10, '/images/atta_rice_dal/kohinoor_brown_rice.jpg', 1),
(11, 11, '/images/atta_rice_dal/24mantra_organic_dal.jpg', 1),
(12, 12, '/images/atta_rice_dal/patanjali_atta.jpg', 1),
(13, 13, '/images/atta_rice_dal/natureland_moong_dal.jpg', 1),
(14, 14, '/images/masala_oil/everest_red_chilli.jpg', 1),
(15, 15, '/images/masala_oil/mdh_garam_masala.jpg', 1),
(16, 16, '/images/masala_oil/catch_coriander.jpg', 1),
(17, 17, '/images/masala_oil/tata_turmeric.jpg', 1),
(18, 18, '/images/masala_oil/fortune_sunflower_oil.jpg', 1),
(19, 19, '/images/masala_oil/saffola_gold.jpg', 1),
(20, 20, '/images/masala_oil/dhara_mustard_oil.jpg', 1),
(21, 21, '/images/masala_oil/patanjali_ghee.jpg', 1),
(22, 22, '/images/masala_oil/amul_ghee.jpg', 1),
(23, 23, '/images/masala_oil/everest_kitchen_king.jpg', 1),
(24, 24, '/images/masala_oil/gold_winner_sunflower.jpg', 1),
(25, 25, '/images/snacks/lays_classic.jpg', 1),
(26, 26, '/images/snacks/kurkure_masala.jpg', 1),
(27, 27, '/images/snacks/haldirams_aloo_bhujia.jpg', 1),
(28, 28, '/images/snacks/bingo_mad_angles.jpg', 1),
(29, 29, '/images/snacks/pringles_original.jpg', 1),
(30, 30, '/images/snacks/cornitos_nacho.jpg', 1),
(31, 31, '/images/snacks/too_yumm_multigrain.jpg', 1),
(32, 32, '/images/snacks/haldirams_moong_dal.jpg', 1),
(33, 33, '/images/snacks/sunfeast_yippee.jpg', 1),
(34, 34, '/images/snacks/maggi_noodles.jpg', 1),
(35, 35, '/images/cold_drinks/coca_cola.jpg', 1),
(36, 36, '/images/cold_drinks/pepsi.jpg', 1),
(37, 37, '/images/cold_drinks/sprite.jpg', 1),
(38, 38, '/images/cold_drinks/fanta.jpg', 1),
(39, 39, '/images/cold_drinks/thums_up.jpg', 1),
(40, 40, '/images/cold_drinks/slice_mango.jpg', 1),
(41, 41, '/images/cold_drinks/maaza.jpg', 1),
(42, 42, '/images/cold_drinks/real_mixed_fruit.jpg', 1),
(43, 43, '/images/cold_drinks/tropicana_orange.jpg', 1),
(44, 44, '/images/cold_drinks/paper_boat_aam_panna.jpg', 1),
(45, 45, '/images/cold_drinks/appy_fizz.jpg', 1),
(46, 46, '/images/cold_drinks/red_bull.jpg', 1),
(47, 47, '/images/tea_coffee/tata_tea_gold.jpg', 1),
(48, 48, '/images/tea_coffee/red_label.jpg', 1),
(49, 49, '/images/tea_coffee/taj_mahal_tea.jpg', 1),
(50, 50, '/images/tea_coffee/lipton_green_tea.jpg', 1),
(51, 51, '/images/tea_coffee/tetley_green_tea.jpg', 1),
(52, 52, '/images/tea_coffee/bru_coffee.jpg', 1),
(53, 53, '/images/tea_coffee/nescafe_classic.jpg', 1),
(54, 54, '/images/tea_coffee/nescafe_gold.jpg', 1),
(55, 55, '/images/tea_coffee/davidoff_coffee.jpg', 1),
(56, 56, '/images/tea_coffee/continental_coffee.jpg', 1),
(57, 57, '/images/tea_coffee/wagh_bakri_tea.jpg', 1),
(58, 58, '/images/bakery_biscuit/britannia_bread.jpg', 1),
(59, 59, '/images/bakery_biscuit/parle_g.jpg', 1),
(60, 60, '/images/bakery_biscuit/bourbon.jpg', 1),
(61, 61, '/images/bakery_biscuit/good_day.jpg', 1),
(62, 62, '/images/bakery_biscuit/oreo.jpg', 1),
(63, 63, '/images/bakery_biscuit/hide_seek.jpg', 1),
(64, 64, '/images/bakery_biscuit/little_debbie.jpg', 1),
(65, 65, '/images/chocolates/dairy_milk_silk.jpg', 1),
(66, 66, '/images/chocolates/5_star.jpg', 1),
(67, 67, '/images/chocolates/kitkat.jpg', 1),
(68, 68, '/images/chocolates/munch.jpg', 1),
(69, 69, '/images/chocolates/ferrero_rocher.jpg', 1),
(70, 70, '/images/chocolates/amul_dark.jpg', 1),
(71, 71, '/images/chocolates/milkybar.jpg', 1),
(72, 72, '/images/home_essentials/surf_excel.jpg', 1),
(73, 73, '/images/home_essentials/ariel_matic.jpg', 1),
(74, 74, '/images/home_essentials/vim_bar.jpg', 1),
(75, 75, '/images/home_essentials/lizol.jpg', 1),
(76, 76, '/images/home_essentials/harpic.jpg', 1),
(77, 77, '/images/home_essentials/dettol.jpg', 1),
(78, 78, '/images/home_essentials/odonil.jpg', 1),
(79, 79, '/images/1743988227104.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_subcategories`
--

CREATE TABLE `product_subcategories` (
  `subcategory_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `seller_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sellers`
--

CREATE TABLE `sellers` (
  `seller_id` int(11) NOT NULL,
  `store_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fssai_license` varchar(20) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `store_category` varchar(50) NOT NULL,
  `store_address` text NOT NULL,
  `is_approved` tinyint(1) DEFAULT 0,
  `is_rejected` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sellers`
--

INSERT INTO `sellers` (`seller_id`, `store_name`, `email`, `password`, `fssai_license`, `phone`, `store_category`, `store_address`, `is_approved`, `is_rejected`) VALUES
(1, 'FreshFarms', 'fresh@example.com', 'samarth', 'FSSAI123', '9876543210', 'Produce', 'Mumbai', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `seller_bank_details`
--

CREATE TABLE `seller_bank_details` (
  `bank_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `account_holder` varchar(255) NOT NULL,
  `account_number` varchar(30) NOT NULL,
  `ifsc_code` varchar(11) NOT NULL,
  `bank_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `seller_documents`
--

CREATE TABLE `seller_documents` (
  `document_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `gst_certificate` varchar(255) DEFAULT NULL,
  `bank_proof` varchar(255) DEFAULT NULL,
  `business_address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `seller_earnings`
--

CREATE TABLE `seller_earnings` (
  `earning_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `settlement_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seller_earnings`
--

INSERT INTO `seller_earnings` (`earning_id`, `seller_id`, `order_id`, `amount`, `settlement_date`) VALUES
(16, 1, 73, 100.00, NULL),
(17, 1, 73, 70.00, NULL),
(18, 1, 74, 1240.00, NULL),
(19, 1, 75, 90.00, NULL),
(20, 1, 75, 1200.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `seller_notifications`
--

CREATE TABLE `seller_notifications` (
  `notification_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `seller_schedule`
--

CREATE TABLE `seller_schedule` (
  `schedule_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `day_of_week` enum('Mon','Tue','Wed','Thu','Fri','Sat','Sun') DEFAULT NULL,
  `opening_time` time DEFAULT NULL,
  `closing_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `system_config`
--

CREATE TABLE `system_config` (
  `config_id` int(11) NOT NULL,
  `commission_rate` decimal(5,2) NOT NULL,
  `cod_charge` decimal(5,2) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `system_config`
--

INSERT INTO `system_config` (`config_id`, `commission_rate`, `cod_charge`, `updated_at`) VALUES
(1, 5.00, 10.00, '2025-04-01 19:07:18'),
(2, 5.50, 12.00, '2025-03-01 19:07:18'),
(3, 6.00, 15.00, '2025-02-01 19:07:18'),
(4, 4.75, 8.00, '2025-01-01 19:07:18'),
(5, 5.25, 10.00, '2024-12-01 19:07:18'),
(6, 5.75, 12.00, '2024-11-01 19:07:18'),
(7, 6.25, 15.00, '2024-10-01 19:07:18'),
(8, 4.50, 7.00, '2024-09-01 19:07:18'),
(9, 5.00, 9.00, '2024-08-01 19:07:18'),
(10, 5.50, 11.00, '2024-07-01 19:07:18');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` enum('seller','admin','delivery','end-user') DEFAULT 'end-user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `password`, `created_at`, `role`) VALUES
(1, 'John Doe', 'john@example.com', 'johnpass', '2025-04-01 19:07:18', 'end-user'),
(2, 'Jane Smith', 'jane@example.com', 'janepass', '2025-04-01 19:07:18', 'end-user'),
(3, 'Bob Wilson', 'bob@example.com', 'bobpass', '2025-04-01 19:07:18', 'end-user'),
(4, 'Alice Brown', 'alice@example.com', 'alicepass', '2025-04-01 19:07:18', 'end-user'),
(5, 'Charlie Davis', 'charlie@example.com', 'charliepass', '2025-04-01 19:07:18', 'end-user'),
(6, 'Diana Evans', 'diana@example.com', 'dianapass', '2025-04-01 19:07:18', 'end-user'),
(7, 'Ethan Green', 'ethan@example.com', 'ethanpass', '2025-04-01 19:07:18', 'end-user'),
(8, 'Fiona Harris', 'fiona@example.com', 'fionapass', '2025-04-01 19:07:18', 'end-user'),
(9, 'George Clark', 'george@example.com', 'georgepass', '2025-04-01 19:07:18', 'end-user'),
(10, 'Hannah Lewis', 'hannah@example.com', 'hannahpass', '2025-04-01 19:07:18', 'end-user'),
(11, 'Samarth ', 'samarth@gmail.com', '$2b$10$MDRTub2ZAxLjebJc/N5XYu3ZRBr3LY7c9i9yq1BF6uZwTmYqzxnFG', '2025-04-23 17:25:54', 'end-user'),
(12, 'samrth', 'samarthbhalala@gmail.com', '$2b$10$SgF3dmNxUrbvdT/PEoigYeCKJwvxszVzEMBENHLaP0sfzTMFgKSTe', '2025-04-24 12:22:20', 'end-user');

-- --------------------------------------------------------

--
-- Table structure for table `user_addresses`
--

CREATE TABLE `user_addresses` (
  `address_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address_type` enum('Home','Work','Hotel','Other') NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `house_no` varchar(255) NOT NULL,
  `building_name` varchar(255) DEFAULT NULL,
  `street` varchar(255) NOT NULL,
  `area` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `landmark` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_addresses`
--

INSERT INTO `user_addresses` (`address_id`, `user_id`, `address_type`, `name`, `phone`, `house_no`, `building_name`, `street`, `area`, `city`, `state`, `pincode`, `landmark`) VALUES
(2, 2, 'Work', 'Jane Smith', '0987654321', 'Office 5', 'Tech Park', 'Whitefield Road', 'Whitefield', 'Bengaluru', 'Karnataka', '560066', 'Opposite Forum Mall'),
(3, 3, 'Hotel', 'Alice Johnson', '9876543210', 'Room 304', 'Grand Hyatt', 'MG Road', 'Laxmi Nagar', 'Delhi', 'Delhi', '110092', 'Next to Metro Station'),
(7, 5, 'Home', 'Default Name', '0000000000', 'N/A', NULL, 'N/A', 'N/A', 'N/A', 'N/A', '000000', NULL),
(8, 6, 'Home', 'Default Name', '0000000000', 'N/A', NULL, 'N/A', 'N/A', 'N/A', 'N/A', '000000', NULL),
(9, 7, 'Home', 'Default Name', '0000000000', 'N/A', NULL, 'N/A', 'N/A', 'N/A', 'N/A', '000000', NULL),
(10, 8, 'Home', 'Default Name', '0000000000', 'N/A', NULL, 'N/A', 'N/A', 'N/A', 'N/A', '000000', NULL),
(11, 9, 'Home', 'Default Name', '0000000000', 'N/A', NULL, 'N/A', 'N/A', 'N/A', 'N/A', '000000', NULL),
(12, 10, 'Home', 'Default Name', '0000000000', 'N/A', NULL, 'N/A', 'N/A', 'N/A', 'N/A', '000000', NULL),
(14, 1, 'Home', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'),
(15, 11, 'Home', 'Samarth', '9484400590', '105', 'chamapa ', 'bhavnagar', 'bhavnagar', 'bhavanagr', 'gujarat', '364001', '');

-- --------------------------------------------------------

--
-- Table structure for table `user_payment_methods`
--

CREATE TABLE `user_payment_methods` (
  `payment_method_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `razorpay_id` varchar(255) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `admin_actions`
--
ALTER TABLE `admin_actions`
  ADD PRIMARY KEY (`action_id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `idx_admin_actions` (`target_type`,`target_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `delivery_agents`
--
ALTER TABLE `delivery_agents`
  ADD PRIMARY KEY (`agent_id`),
  ADD UNIQUE KEY `license_number` (`license_number`),
  ADD KEY `idx_delivery_agent_status` (`status`);

--
-- Indexes for table `delivery_earnings`
--
ALTER TABLE `delivery_earnings`
  ADD PRIMARY KEY (`earning_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `idx_delivery_earnings_agent` (`agent_id`,`paid_date`);

--
-- Indexes for table `delivery_locations`
--
ALTER TABLE `delivery_locations`
  ADD PRIMARY KEY (`location_id`),
  ADD KEY `idx_delivery_locations_order` (`order_id`);

--
-- Indexes for table `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`discount_id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `idx_discounts_code_valid` (`code`,`valid_from`,`valid_to`);

--
-- Indexes for table `discount_usage`
--
ALTER TABLE `discount_usage`
  ADD PRIMARY KEY (`usage_id`),
  ADD KEY `discount_id` (`discount_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `idx_discount_usage_user` (`user_id`,`discount_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `idx_orders_user_status` (`user_id`,`status`),
  ADD KEY `idx_orders_created_at` (`created_at`);

--
-- Indexes for table `order_delivery`
--
ALTER TABLE `order_delivery`
  ADD PRIMARY KEY (`delivery_id`),
  ADD UNIQUE KEY `order_id` (`order_id`),
  ADD KEY `agent_id` (`agent_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `idx_order_items_product` (`product_id`);

--
-- Indexes for table `order_ratings`
--
ALTER TABLE `order_ratings`
  ADD PRIMARY KEY (`rating_id`),
  ADD UNIQUE KEY `order_id` (`order_id`);

--
-- Indexes for table `order_status_history`
--
ALTER TABLE `order_status_history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `idx_order_status_history` (`order_id`,`timestamp`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `idx_payments_order` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `seller_id` (`seller_id`),
  ADD KEY `subcategory_id` (`subcategory_id`),
  ADD KEY `idx_products_name` (`name`),
  ADD KEY `idx_products_price` (`price`),
  ADD KEY `idx_products_category` (`category_id`,`subcategory_id`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `idx_product_images` (`product_id`);

--
-- Indexes for table `product_subcategories`
--
ALTER TABLE `product_subcategories`
  ADD PRIMARY KEY (`subcategory_id`),
  ADD UNIQUE KEY `category_id` (`category_id`,`seller_id`,`name`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indexes for table `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`seller_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `fssai_license` (`fssai_license`),
  ADD KEY `idx_sellers_email` (`email`),
  ADD KEY `idx_sellers_fssai` (`fssai_license`);

--
-- Indexes for table `seller_bank_details`
--
ALTER TABLE `seller_bank_details`
  ADD PRIMARY KEY (`bank_id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indexes for table `seller_documents`
--
ALTER TABLE `seller_documents`
  ADD PRIMARY KEY (`document_id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indexes for table `seller_earnings`
--
ALTER TABLE `seller_earnings`
  ADD PRIMARY KEY (`earning_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `idx_seller_earnings` (`seller_id`,`settlement_date`);

--
-- Indexes for table `seller_notifications`
--
ALTER TABLE `seller_notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indexes for table `seller_schedule`
--
ALTER TABLE `seller_schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indexes for table `system_config`
--
ALTER TABLE `system_config`
  ADD PRIMARY KEY (`config_id`),
  ADD KEY `idx_system_config_date` (`updated_at`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_users_email` (`email`);

--
-- Indexes for table `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `idx_user_addresses` (`user_id`);

--
-- Indexes for table `user_payment_methods`
--
ALTER TABLE `user_payment_methods`
  ADD PRIMARY KEY (`payment_method_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `admin_actions`
--
ALTER TABLE `admin_actions`
  MODIFY `action_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `cart_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `delivery_agents`
--
ALTER TABLE `delivery_agents`
  MODIFY `agent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `delivery_earnings`
--
ALTER TABLE `delivery_earnings`
  MODIFY `earning_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `delivery_locations`
--
ALTER TABLE `delivery_locations`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `discount_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `discount_usage`
--
ALTER TABLE `discount_usage`
  MODIFY `usage_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `order_delivery`
--
ALTER TABLE `order_delivery`
  MODIFY `delivery_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `order_ratings`
--
ALTER TABLE `order_ratings`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_status_history`
--
ALTER TABLE `order_status_history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `product_subcategories`
--
ALTER TABLE `product_subcategories`
  MODIFY `subcategory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `sellers`
--
ALTER TABLE `sellers`
  MODIFY `seller_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `seller_bank_details`
--
ALTER TABLE `seller_bank_details`
  MODIFY `bank_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seller_documents`
--
ALTER TABLE `seller_documents`
  MODIFY `document_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seller_earnings`
--
ALTER TABLE `seller_earnings`
  MODIFY `earning_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `seller_notifications`
--
ALTER TABLE `seller_notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seller_schedule`
--
ALTER TABLE `seller_schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `system_config`
--
ALTER TABLE `system_config`
  MODIFY `config_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_addresses`
--
ALTER TABLE `user_addresses`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user_payment_methods`
--
ALTER TABLE `user_payment_methods`
  MODIFY `payment_method_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_actions`
--
ALTER TABLE `admin_actions`
  ADD CONSTRAINT `admin_actions_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`) ON DELETE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `delivery_earnings`
--
ALTER TABLE `delivery_earnings`
  ADD CONSTRAINT `delivery_earnings_ibfk_1` FOREIGN KEY (`agent_id`) REFERENCES `delivery_agents` (`agent_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `delivery_earnings_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `delivery_locations`
--
ALTER TABLE `delivery_locations`
  ADD CONSTRAINT `delivery_locations_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `discount_usage`
--
ALTER TABLE `discount_usage`
  ADD CONSTRAINT `discount_usage_ibfk_1` FOREIGN KEY (`discount_id`) REFERENCES `discounts` (`discount_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `discount_usage_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `discount_usage_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `order_delivery`
--
ALTER TABLE `order_delivery`
  ADD CONSTRAINT `order_delivery_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_delivery_ibfk_2` FOREIGN KEY (`agent_id`) REFERENCES `delivery_agents` (`agent_id`) ON DELETE SET NULL;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `order_ratings`
--
ALTER TABLE `order_ratings`
  ADD CONSTRAINT `order_ratings_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `order_status_history`
--
ALTER TABLE `order_status_history`
  ADD CONSTRAINT `order_status_history_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`seller_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`category_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`subcategory_id`) REFERENCES `product_subcategories` (`subcategory_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD CONSTRAINT `product_categories_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_subcategories`
--
ALTER TABLE `product_subcategories`
  ADD CONSTRAINT `product_subcategories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`category_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_subcategories_ibfk_2` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`seller_id`) ON DELETE CASCADE;

--
-- Constraints for table `seller_bank_details`
--
ALTER TABLE `seller_bank_details`
  ADD CONSTRAINT `seller_bank_details_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`seller_id`) ON DELETE CASCADE;

--
-- Constraints for table `seller_documents`
--
ALTER TABLE `seller_documents`
  ADD CONSTRAINT `seller_documents_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`seller_id`) ON DELETE CASCADE;

--
-- Constraints for table `seller_earnings`
--
ALTER TABLE `seller_earnings`
  ADD CONSTRAINT `seller_earnings_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`seller_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `seller_earnings_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `seller_notifications`
--
ALTER TABLE `seller_notifications`
  ADD CONSTRAINT `seller_notifications_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`seller_id`) ON DELETE CASCADE;

--
-- Constraints for table `seller_schedule`
--
ALTER TABLE `seller_schedule`
  ADD CONSTRAINT `seller_schedule_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`seller_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_payment_methods`
--
ALTER TABLE `user_payment_methods`
  ADD CONSTRAINT `user_payment_methods_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
