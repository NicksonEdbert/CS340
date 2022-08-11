
SET SQL_MODE = "STRICT_ALL_TABLES";
START TRANSACTION;
SET time_zone = "+00:00";
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `Customers`;
CREATE TABLE `Customers` (
  `customer_id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `phone` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `cusadd_line1` varchar(255) NOT NULL,
  `cusadd_city` varchar(20) NOT NULL,
  `cusadd_state` varchar(20) NOT NULL,
  `cusadd_zipcode` int(5) NOT NULL,
  CONSTRAINT not_both_null CHECK (email IS NOT NULL OR phone IS NOT NULL)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `Customers` (`customer_id`, `first_name`, `last_name`, `phone`, `email`, `cusadd_line1`, `cusadd_city`, `cusadd_state`, `cusadd_zipcode`) VALUES
(1, 'Barret', 'Mila', '1234567890', NULL, '60025 Bollinger Canyon Road', 'San Ramon', 'California', 94583),
(2, 'Smith', 'White', NULL, 'SmithWhite_CS340@hotmail.com', '482505 Warm Springs Blvd.', 'Fremont', 'California', 94536);

DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
  `order_id` int(11) NOT NULL,
  `order_date` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `order_total` decimal(12,2) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `shipping_status` enum('not shipped','shipped','delivered','returned') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `Orders` (`order_id`, `order_date`, `order_total`, `customer_id`, `shipping_status`) VALUES
(1, '2022-07-21 23:35:30', '17.85', 1, 'delivered'),
(2, '2022-07-16 23:37:25', '11.90', 2, 'shipped');

DROP TABLE IF EXISTS `Order_Details`;
CREATE TABLE `Order_Details` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_qty` int(11) NOT NULL,
  `sub_total` decimal(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `Order_Details` (`order_id`, `product_id`, `product_qty`, `sub_total`) VALUES
(1, 1, 1, '17.85'),
(2, 1, 2, '11.50');

CREATE TABLE `Products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `product_des` mediumtext DEFAULT NULL,
  `price` decimal(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `Products` (`product_id`, `product_name`, `product_des`, `price`) VALUES
(1, 'Oranges 5lbs pack', 'Fresh Orange from a rural farm', '5.95'),
(2, 'Oranges 10lbs pack', 'Fresh Orange from a rural farm', '11.90');

ALTER TABLE `Customers`
  ADD PRIMARY KEY (`customer_id`);

ALTER TABLE `Orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`);

ALTER TABLE `Order_Details`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

ALTER TABLE `Products`
  ADD PRIMARY KEY (`product_id`);

ALTER TABLE `Customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `Orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `Products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `Orders`
  ADD CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`) ON DELETE CASCADE;


UPDATE Orders SET order_total = (SELECT SUM(sub_total) FROM Order_Details WHERE Order_Details.order_id = Orders.order_id);
