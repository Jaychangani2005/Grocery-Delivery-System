-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2025 at 05:41 PM
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
(1, 1, '2025-04-01 19:07:18'),
(2, 2, '2025-04-01 19:07:18'),
(3, 3, '2025-04-01 19:07:18'),
(4, 4, '2025-04-01 19:07:18'),
(5, 5, '2025-04-01 19:07:18'),
(6, 6, '2025-04-01 19:07:18'),
(7, 7, '2025-04-01 19:07:18'),
(8, 8, '2025-04-01 19:07:18'),
(9, 9, '2025-04-01 19:07:18'),
(10, 10, '2025-04-01 19:07:18');

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
(1, 1, 1, 2, '2025-04-01 19:07:18'),
(2, 1, 2, 1, '2025-04-01 19:07:18'),
(4, 3, 4, 3, '2025-04-01 19:07:18'),
(6, 5, 6, 4, '2025-04-01 19:07:18'),
(7, 6, 7, 1, '2025-04-01 19:07:18'),
(8, 7, 8, 2, '2025-04-01 19:07:18'),
(9, 8, 9, 3, '2025-04-01 19:07:18');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_agents`
--

CREATE TABLE `delivery_agents` (
  `agent_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `vehicle_type` enum('Bike','Scooter') NOT NULL,
  `license_number` varchar(20) NOT NULL,
  `status` enum('available','busy','offline') DEFAULT 'available',
  `is_approved` tinyint(1) DEFAULT 0,
  `is_rejected` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `delivery_agents`
--

INSERT INTO `delivery_agents` (`agent_id`, `name`, `vehicle_type`, `license_number`, `status`, `is_approved`, `is_rejected`) VALUES
(1, 'Aarav Patel', 'Bike', 'MH01AB1234', 'available', 1, 0),
(2, 'Priya Sharma', 'Scooter', 'DL02CD5678', 'available', 1, 0),
(3, 'Rohan Singh', 'Bike', 'KA03EF9012', 'available', 0, 0),
(4, 'Neha Gupta', 'Scooter', 'TN04GH3456', 'available', 0, 0),
(5, 'Vikram Joshi', 'Bike', 'UP05IJ7890', 'offline', 0, 1),
(6, 'Ananya Reddy', 'Scooter', 'AP06KL1234', 'offline', 0, 1),
(7, 'Arjun Malhotra', 'Bike', 'GJ07MN5678', 'available', 1, 0),
(8, 'Isha Choudhary', 'Scooter', 'RJ08OP9012', 'available', 1, 0),
(9, 'Kabir Khan', 'Bike', 'MP09QR3456', 'available', 1, 0),
(10, 'Zoya Ansari', 'Scooter', 'HR10ST7890', 'available', 1, 0);

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
  `total` decimal(10,2) NOT NULL,
  `status` enum('new','pending','confirmed','preparing','ready','delivered','cancelled','Out For delivery') DEFAULT 'new',
  `payment_method` enum('cod','online') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `total`, `status`, `payment_method`, `created_at`) VALUES
(1, 1, 450.00, 'Out For delivery', 'online', '2025-04-01 19:07:18'),
(2, 2, 1200.00, 'Out For delivery', 'cod', '2025-04-01 19:07:18'),
(3, 3, 300.00, 'cancelled', 'online', '2025-04-01 19:07:18'),
(4, 4, 750.00, 'preparing', 'cod', '2025-04-01 19:07:18'),
(5, 5, 950.00, 'ready', 'online', '2025-04-01 19:07:18'),
(6, 6, 230.00, 'Out For delivery', 'cod', '2025-04-01 19:07:18'),
(7, 7, 640.00, 'delivered', 'online', '2025-04-01 19:07:18'),
(8, 8, 180.00, 'new', 'cod', '2025-04-01 19:07:18'),
(9, 9, 550.00, 'confirmed', 'online', '2025-04-01 19:07:18'),
(10, 10, 890.00, 'pending', 'cod', '2025-04-01 19:07:18');

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
(1, 1, 1, '2025-04-02 00:37:18', '2025-04-02 02:37:18'),
(2, 2, 2, '2025-04-02 00:37:18', NULL),
(3, 3, NULL, NULL, NULL),
(4, 4, 4, '2025-04-02 00:37:18', NULL),
(5, 5, 5, '2025-04-02 00:37:18', '2025-04-02 03:37:18'),
(7, 7, 7, '2025-04-01 00:37:18', '2025-04-01 04:37:18'),
(8, 8, NULL, NULL, NULL),
(10, 10, 10, '2025-04-02 00:37:18', '2025-04-02 05:37:18');

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
(1, 1, 1, 2, 150.00),
(2, 1, 2, 1, 250.00),
(4, 3, 4, 1, 350.00),
(6, 5, 6, 1, 800.00),
(7, 6, 7, 4, 450.00),
(8, 7, 8, 2, 200.00),
(9, 8, 9, 3, 150.00);

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
(1, 1, 'Out For delivery', 'Out For delivery', 'seller', '2025-04-01 19:13:20'),
(2, 2, 'Out For delivery', 'Out For delivery', 'seller', '2025-04-01 19:29:43'),
(3, 1, 'Out For delivery', 'Out For delivery', 'seller', '2025-04-01 19:34:48'),
(4, 1, 'Out For delivery', 'Out For delivery', 'seller', '2025-04-01 19:56:59'),
(5, 2, 'Out For delivery', 'Out For delivery', 'seller', '2025-04-02 11:31:53');

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
(1, 1, 'rzp_123', 450.00, 'success', '2025-04-01 19:07:18'),
(2, 2, 'rzp_456', 1200.00, '', '2025-04-01 19:07:18'),
(3, 3, 'rzp_789', 300.00, 'failed', '2025-04-01 19:07:18'),
(4, 4, 'rzp_012', 750.00, 'success', '2025-04-01 19:07:18'),
(5, 5, 'rzp_345', 950.00, 'success', '2025-04-01 19:07:18'),
(6, 6, 'rzp_678', 230.00, '', '2025-04-01 19:07:18'),
(7, 7, 'rzp_901', 640.00, 'success', '2025-04-01 19:07:18'),
(8, 8, 'rzp_234', 180.00, 'failed', '2025-04-01 19:07:18'),
(9, 9, 'rzp_567', 550.00, 'success', '2025-04-01 19:07:18'),
(10, 10, 'rzp_890', 890.00, '', '2025-04-01 19:07:18');

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
(1, 1, 'Organic Apples', 'Fresh from Kashmir', '1kg', 150.00, 180.00, 50, '7 days', 1, 1),
(2, 1, 'Amul Butter', 'Salted 500g', '500g', 250.00, 280.00, 30, '6 months', 2, 2),
(4, 4, 'Honey', 'Natural forest honey', '500ml', 350.00, 400.00, 15, '2 years', 4, 4),
(6, 6, 'Olive Oil', 'Extra virgin', '1L', 800.00, 900.00, 25, '2 years', 6, 6),
(7, 7, 'Quinoa', 'Organic white', '500g', 450.00, 500.00, 18, '1 year', 7, 7),
(8, 8, 'Dark Chocolate', '85% cocoa', '100g', 200.00, 250.00, 60, '1 year', 8, 8),
(9, 9, 'Green Tea', 'Jasmine flavor', '50 bags', 150.00, 180.00, 35, '1 year', 9, 9),
(12, 1, 'dark chocolate ', '91 % ', '1 kg', 100.00, 120.00, 10, '6 months', 8, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`category_id`, `name`, `admin_id`) VALUES
(1, 'Fruits', 1),
(2, 'Dairy', 2),
(3, 'Grains', 3),
(4, 'Sweeteners', 4),
(5, 'Nuts', 5),
(6, 'Oils', 6),
(7, 'Superfoods', 7),
(8, 'Chocolates', 8),
(9, 'Teas', 9),
(10, 'Salts', 10);

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
(2, 12, '/images/1743618649621.jpg', 0),
(3, 1, '/images/1743618649621.jpg', 1),
(4, 2, '/images/1743618649621.jpg', 1),
(5, 4, '/images/1743618649621.jpg', 1),
(6, 6, '/images/1743618649621.jpg', 1),
(7, 7, '/images/1743618649621.jpg', 1),
(8, 8, '/images/1743618649621.jpg', 1),
(9, 9, '/images/1743618649621.jpg', 1);

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

--
-- Dumping data for table `product_subcategories`
--

INSERT INTO `product_subcategories` (`subcategory_id`, `category_id`, `name`, `seller_id`) VALUES
(1, 1, 'Tropical Fruits', 1),
(2, 2, 'Cheese', 2),
(3, 3, 'Rice Varieties', 3),
(4, 4, 'Natural Honey', 4),
(5, 5, 'Premium Nuts', 5),
(6, 6, 'Cooking Oils', 6),
(7, 7, 'Ancient Grains', 7),
(8, 8, 'Dark Chocolate', 8),
(9, 9, 'Herbal Teas', 9),
(10, 10, 'Specialty Salts', 10);

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
(1, 'FreshFarms', 'fresh@example.com', 'freshpass', 'FSSAI123', '9876543210', 'Produce', 'Mumbai', 1, 0),
(2, 'DairyKing', 'dairy@example.com', 'dairypass', 'FSSAI456', '9876543211', 'Dairy', 'Delhi', 1, 0),
(3, 'GrainsHub', 'grains@example.com', 'grainspass', 'FSSAI789', '9876543212', 'Grains', 'Bangalore', 1, 0),
(4, 'HealthyBites', 'healthy@example.com', 'healthypass', 'FSSAI012', '9876543213', 'Snacks', 'Chennai', 1, 0),
(5, 'SpiceWorld', 'spice@example.com', 'spicepass', 'FSSAI345', '9876543214', 'Spices', 'Kolkata', 0, 1),
(6, 'BeverageCo', 'beverage@example.com', 'beveragepass', 'FSSAI678', '9876543215', 'Drinks', 'Hyderabad', 1, 0),
(7, 'OrganicLife', 'organic@example.com', 'organicpass', 'FSSAI901', '9876543216', 'Organic', 'Pune', 0, 1),
(8, 'SweetTreats', 'sweets@example.com', 'sweetspass', 'FSSAI234', '9876543217', 'Confectionery', 'Jaipur', 1, 0),
(9, 'TeaTime', 'tea@example.com', 'teapass', 'FSSAI567', '9876543218', 'Beverages', 'Ahmedabad', 0, 1),
(10, 'SaltMasters', 'salt@example.com', 'saltpass', 'FSSAI890', '9876543219', 'Essentials', 'Surat', 0, 1);

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
(10, 'Hannah Lewis', 'hannah@example.com', 'hannahpass', '2025-04-01 19:07:18', 'end-user');

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
(1, 1, 'Home', 'John Doe', '1234567890', 'A-12', 'Green Valley', 'Main Street', 'Bandra West', 'Mumbai', 'Maharashtra', '400050', 'Near Taj Hotel'),
(2, 2, 'Work', 'Jane Smith', '0987654321', 'Office 5', 'Tech Park', 'Whitefield Road', 'Whitefield', 'Bengaluru', 'Karnataka', '560066', 'Opposite Forum Mall'),
(3, 3, 'Hotel', 'Alice Johnson', '9876543210', 'Room 304', 'Grand Hyatt', 'MG Road', 'Laxmi Nagar', 'Delhi', 'Delhi', '110092', 'Next to Metro Station'),
(4, 4, 'Other', 'Bob Wilson', '8765432109', 'Farm House', 'Green Acres', 'Rural Road', 'Yelahanka', 'Bengaluru', 'Karnataka', '560064', 'Behind Lake');

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
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `cart_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `delivery_agents`
--
ALTER TABLE `delivery_agents`
  MODIFY `agent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `delivery_earnings`
--
ALTER TABLE `delivery_earnings`
  MODIFY `earning_id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `order_delivery`
--
ALTER TABLE `order_delivery`
  MODIFY `delivery_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `order_ratings`
--
ALTER TABLE `order_ratings`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_status_history`
--
ALTER TABLE `order_status_history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
  MODIFY `earning_id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_addresses`
--
ALTER TABLE `user_addresses`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
