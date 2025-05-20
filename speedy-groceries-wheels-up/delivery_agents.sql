-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2025 at 08:34 AM
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
(1, 'Aarav Patel', '', '', 0, 0, '', '', '', '', 0, 'Bike', 'MH01AB1234', 'available', 1, 0),
(2, 'Priya Sharma', '', '', 0, 0, '', '', '', '', 0, 'Scooter', 'DL02CD5678', 'available', 1, 0),
(3, 'Rohan Singh', '', '', 0, 0, '', '', '', '', 0, 'Bike', 'KA03EF9012', 'available', 0, 0),
(4, 'Neha Gupta', '', '', 0, 0, '', '', '', '', 0, 'Scooter', 'TN04GH3456', 'available', 0, 0),
(5, 'Vikram Joshi', '', '', 0, 0, '', '', '', '', 0, 'Bike', 'UP05IJ7890', 'offline', 0, 1),
(6, 'Ananya Reddy', '', '', 0, 0, '', '', '', '', 0, 'Scooter', 'AP06KL1234', 'offline', 0, 1),
(7, 'Arjun Malhotra', '', '', 0, 0, '', '', '', '', 0, 'Bike', 'GJ07MN5678', 'available', 1, 0),
(8, 'Isha Choudhary', '', '', 0, 0, '', '', '', '', 0, 'Scooter', 'RJ08OP9012', 'available', 1, 0),
(9, 'Kabir Khan', '', '', 0, 0, '', '', '', '', 0, 'Bike', 'MP09QR3456', 'available', 1, 0),
(10, 'Zoya Ansari', '', '', 0, 0, '', '', '', '', 0, 'Scooter', 'HR10ST7890', 'available', 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `delivery_agents`
--
ALTER TABLE `delivery_agents`
  ADD PRIMARY KEY (`agent_id`),
  ADD UNIQUE KEY `license_number` (`license_number`),
  ADD KEY `idx_delivery_agent_status` (`status`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `delivery_agents`
--
ALTER TABLE `delivery_agents`
  MODIFY `agent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
