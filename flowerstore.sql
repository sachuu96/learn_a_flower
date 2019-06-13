-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 19, 2019 at 03:59 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.1.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flowerstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `flower`
--

CREATE TABLE `flower` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `image` varchar(250) NOT NULL,
  `fno` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `flower`
--

INSERT INTO `flower` (`id`, `name`, `description`, `image`, `fno`, `createdAt`, `updatedAt`) VALUES
(15, 'Aster', 'Small daisy-like flower often used to accent floral arrangements. Asters are typically found in shades of white or light to dark pink. New larger varieties such as the matsumoto aster can also be found in reds, purples and yellows.', 'Aster.jpg', '0001', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'Campanula', 'Campanula flowers are known for their small bell-shaped blooms, which can often be found in shades of lavender. They are also known as bellflowers or canterbury bells and are traditionally used as a sign of gratitude.', 'campanulas.jpg', '0002', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'Daffodil', 'The common name for flowers in the Narcissus family, which consist of trumpet-shaped blooms and are often yellow or white in color. Daffodils are traditionally associated with chivalry. See also: Jonquil, Narcissus', 'Daffodil.jpg', '0003', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, 'Iris', 'Six-petaled flower predominantly found in shades of blue or purple. Yellow and white are also available. Iris are grown in many parts of the world and generally symbolize faith and wisdom.', 'Iris.jpg', '0004', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(25, 'Lavender', 'A silvery, woody shrub that enjoys seaside weather. These fragrant plants bloom in spikes of purple, or sometimes white flowers. Lavender is often associated with love and devotion.', 'Lavender.jpg', '0005', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(27, 'Magnolia', 'A flowering plant known for its large and fragrant blooms. These delicate flowers are typically found in shades of pale pink or white and are often used to represent nobility.', 'Magnolia.jpg', '0007', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(29, 'Petite Rose', 'Also known as sweetheart roses, these flowers are characterized by their smaller size relative to standard roses. There are many types available, including single bloom and multi-bloom varieties.\r\n', 'PetiteRose.jpg', '0008', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(31, 'Carnation', 'A long-lasting flower available in a wide variety of colors. Also known as dianthus, carnations have a long history of cultivation and are traditionally associated with fascination and distinction.\r\r\nA brightly colored flower distinguished by its la', 'Carnation.jpg', '0009', '0000-00-00 00:00:00', '2019-05-19 13:51:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `flower`
--
ALTER TABLE `flower`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `flower`
--
ALTER TABLE `flower`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
