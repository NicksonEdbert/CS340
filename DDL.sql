-- phpMyAdmin SQL Dump
-- version 5.2.0-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 23, 2022 at 05:44 AM
-- Server version: 10.6.8-MariaDB-log
-- PHP Version: 7.4.30

SET SQL_MODE = "STRICT_ALL_TABLES";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_shuh`
--

-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--

CREATE TABLE `Customers` (
  `customer_id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `mid_name` varchar(255) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `cusadd_line1` varchar(255) NOT NULL,
  `cusadd_line2` varchar(10) DEFAULT NULL,
  `cusadd_city` varchar(20) NOT NULL,
  `cusadd_state` varchar(20) NOT NULL,
  `cusadd_zipcode` int(5) NOT NULL,
  CONSTRAINT not_both_null CHECK (email IS NOT NULL OR phone IS NOT NULL)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Customers`
--

INSERT INTO `Customers` (`customer_id`, `first_name`, `last_name`, `mid_name`, `phone`, `email`, `cusadd_line1`, `cusadd_line2`, `cusadd_city`, `cusadd_state`, `cusadd_zipcode`) VALUES
(1, 'Barret', 'Mila', NULL, '1234567890', NULL, '60025 Bollinger Canyon Road', NULL, 'San Ramon', 'California', 94583),
(2, 'Smith', 'White', '', NULL, 'SmithWhite_CS340@hotmail.com', '482505 Warm Springs Blvd.', NULL, 'Fremont', 'California', 94536);

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `order_id` int(11) NOT NULL,
  `order_date` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `order_total` decimal(12,2) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `shipping_status` enum('not shipped','shipped','delivered','returned') NOT NULL,
  `shipadd_line1` varchar(255) NOT NULL,
  `shipadd_line2` varchar(10) DEFAULT NULL,
  `shipadd_city` varchar(20) NOT NULL,
  `shipadd_state` varchar(20) NOT NULL,
  `shipadd_zipcode` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`order_id`, `order_date`, `order_total`, `customer_id`, `shipping_status`, `shipadd_line1`, `shipadd_line2`, `shipadd_city`, `shipadd_state`, `shipadd_zipcode`) VALUES
(1, '2022-07-21 23:35:30', '17.85', 1, 'delivered', '60025 Bollinger Canyon Road', NULL, 'San Ramon', 'California', 94583),
(2, '2022-07-16 23:37:25', '11.90', 2, 'shipped', '482505 Warm Springs Blvd.', NULL, 'Fremont', 'California', 94536);

-- --------------------------------------------------------

--
-- Table structure for table `Order_Details`
--

CREATE TABLE `Order_Details` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_price` decimal(12,2) NOT NULL,
  `product_qty` int(11) NOT NULL,
  `discount` decimal(12,2) DEFAULT NULL,
  `sub_total` decimal(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Order_Details`
--

INSERT INTO `Order_Details` (`order_id`, `product_id`, `product_price`, `product_qty`, `discount`, `sub_total`) VALUES
(1, 1, '5.95', 1, '0.00', '17.85'),
(2, 1, '5.95', 2, '0.00', '11.90');

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `product_des` mediumtext DEFAULT NULL,
  `price` decimal(12,2) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`product_id`, `product_name`, `product_des`, `price`, `stock`) VALUES
(1, 'Oranges 5lbs pack', 'Fresh Orange from a rural farm', '5.95', 3000),
(2, 'Oranges 10lbs pack', 'Fresh Orange from a rural farm', '11.50', 1000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Customers`
--
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `Order_Details`
--
ALTER TABLE `Order_Details`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Customers`
--
ALTER TABLE `Customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`);

--
-- Constraints for table `Order_Details`
--
ALTER TABLE `Order_Details`
  ADD CONSTRAINT `Order_Details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Products` (`product_id`),
  ADD CONSTRAINT `Order_Details_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`);
COMMIT;

UPDATE Orders SET order_total = (SELECT SUM(sub_total) FROM Order_Details WHERE Order_Details.order_id = Orders.order_id);


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
