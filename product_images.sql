-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 06, 2025 at 07:50 PM
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
(2, 2, '/images/atta_rice_dal/fortune_chakki_atta.avl', 1),
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
(78, 78, '/images/home_essentials/odonil.jpg', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `idx_product_images` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
