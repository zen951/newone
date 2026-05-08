-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2026 at 03:00 AM
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
-- Database: `techstock`
--
CREATE DATABASE IF NOT EXISTS `techstock` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `techstock`;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(2, 'Keyboards'),
(1, 'Laptops'),
(3, 'Monitors'),
(4, 'Mouse'),
(5, 'Smart Phones');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL CHECK (`price` >= 0),
  `unit_in_stock` int(11) DEFAULT 0 CHECK (`unit_in_stock` >= 0),
  `supplier_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `description`, `price`, `unit_in_stock`, `supplier_id`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'Razer Basilisk V3 Pro', '/uploads/1749600304501.jpg', 'עכבר גיימינג אלחוטי Razer Basilisk V3 Pro בעיצוב ארגונומי עם גלגלת הטייה Razer™ HyperScroll, תאורת Chroma ב־13 אזורים כולל הארה היקפית, ו־11 כפתורים ניתנים לתכנות להתאמה אישית מלאה\n', 799.00, 80, 8, 4, '2025-06-11 00:05:04', '2025-06-11 01:49:45'),
(2, 'Logitech G502X PLUS', '/uploads/1749600401028.jpg', 'עכבר גיימינג אלחוטי מבית Logitech דגם G502X PLUS עם 13 פקדים הניתנים לתכנות, טכנולוגיית Lightspeed Wireless, בצבע שחור', 665.00, 15, 7, 4, '2025-06-11 00:06:41', '2025-06-11 00:06:41'),
(3, 'Corsair M55 RGB PRO Ambidextrous', '/uploads/1749600498329.jpg', 'עכבר גיימינג Corsair M55 RGB PRO עם עיצוב דו-צדדי המתאים לכל אחיזה או יד, וחיישן אופטי מדויק ביותר של 12,400 DPI', 149.99, 22, 9, 4, '2025-06-11 00:08:18', '2025-06-11 00:08:18'),
(4, 'Razer Basilisk V3 Pr', '/uploads/1749600602401.jpg', 'עכבר גיימינג אלחוטי Razer Basilisk V3 Pro בעיצוב ארגונומי עם גלגלת הטייה Razer™ HyperScroll, תאורת Chroma ב־13 אזורים כולל הארה היקפית, ו־11 כפתורים ניתנים לתכנות להתאמה אישית מלאה', 745.00, 5, 8, 4, '2025-06-11 00:10:02', '2025-06-11 00:10:02'),
(5, 'Corsair KATAR PRO Wireless', '/uploads/1749600668489.jpg', 'תהנה מעיצוב קל משקל וביצועים במשקל כבד באמצעות עכבר הגיימינג האלחוטי Corsair KATAR PRO, המתחבר באמצעות Bluetooth מהיר במיוחד או באמצאות מתאם SLIPSTREAM Wireless\n', 219.00, 33, 9, 4, '2025-06-11 00:10:35', '2025-06-11 00:11:08'),
(6, 'Dell UltraSharp 24 U2424H IPS', '/uploads/1749600801151.jpg', 'חוו נוחות צפייה אופטימלית לצד צבעים חיים ודיוק כיול מרשים. המסך מצויד בחיישן אור סביבתי המתאים אוטומטית את הבהירות וטמפרטורת הצבע לתנאי הסביבה, וקצב רענון 120Hz המבטיח תנועה חלקה וגלילה נטולת הבהוב. עם מפצל USB 10Gbps מובנה, ועיצוב אלגנטי בגימור כסוף פלטינה - זהו המסך המושלם לפרודוקטיביות ועבודה נוחה!', 899.00, 12, 5, 3, '2025-06-11 00:13:21', '2025-06-11 00:13:21'),
(7, 'Asus TUF Gaming VG27VQ3B', '/uploads/1749600866966.jpg', 'מסך גיימינג קעור Asus TUF Gaming בגודל 27 אינץ\', פאנל VA, רזולוציה 1920x1080 Full HD בקצב רענון 180Hz, חיבורי תצוגה 2xHDMI / 1xDisplayPort', 1199.00, 18, 3, 3, '2025-06-11 00:14:26', '2025-06-11 00:14:35'),
(8, 'Dell UltraSharp 27 U2724DE IPS 2K', '/uploads/1749600923709.jpg', 'מסך מחשב Dell UltraSharp 27, בגודל 27 אינץ\', פאנל IPS, רזולוציה 2560x1440 2K WQHD, קצב רענון 120Hz, חיבורי תצוגה DisplayPort / HDMI / Thunderbolt, כולל מפצל USB מובנה עם יציאות USB-C ו- USB-A וגם חיבור רשת קווית', 1870.99, 25, 5, 3, '2025-06-11 00:15:23', '2025-06-11 00:15:23'),
(9, 'Lenovo Legion R45w-30 ', '/uploads/1749601022451.jpg', 'מסך מחשב גיימינג Lenovo בגודל \"44.5 דגם R45W-30 בעל פאנל VA, קצב רענון 170Hz ברזולוציה 5120x1440 Dual QHD, זמן תגובה 1ms, חיבורי HDMI / DisplayPort / USB-C, עם מפצל USB ורמקולים מובנים', 3239.00, 11, 1, 3, '2025-06-11 00:17:02', '2025-06-11 00:17:02'),
(10, 'LG UltraGear OLED ', '/uploads/1749601077977.jpg', 'צלול לעולם הגיימינג האולטימטיבי – עם תצוגת OLED קעורה בגודל 45 אינץ\', קצב רענון מסחרר של 240Hz וזמן תגובה של 0.03ms, מסך ה-LG UltraGear מציב אותך במרכז האקשן. תמונה עוצרת נשימה, צבעים חיים, ועיצוב מהפנט עם תאורת RGB – כל מה שגיימר צריך כדי לשלוט בזירה.', 7235.00, 16, 4, 3, '2025-06-11 00:17:57', '2025-06-11 00:17:57'),
(11, 'Asus ROG Strix XG27AQMR 300Hz', '/uploads/1749601139939.jpg', 'מסך גיימינג Asus ROG Strix, בגודל 27 אינץ\', פאנל IPS, רזולוציה 2560x1440 2K WQHD בקצב רענון 300Hz, תומך בטכנולוגיות G-Sync ו- VESA DisplayHDR 600, חיבורי תצוגה 2xHDMI / 1xDisplayPort, כולל מפצל USB 3.2 מובנה', 2985.00, 18, 3, 3, '2025-06-11 00:18:59', '2025-06-11 00:18:59'),
(12, 'LG 32UR550-B HDR10 4K UHD', '/uploads/1749601237183.jpg', 'מסך מחשב LG בגודל \"32 דגם 32UR550-B בעל פאנל VA רזולוציה 3840x2160 4K UHD, קצב רענון 60Hz, זמן תגובה 4ms, כולל 2 חיבורי HDMI חיבור DisplayPort ורמקולים מובנים', 1949.00, 22, 4, 3, '2025-06-11 00:20:37', '2025-06-11 00:20:37'),
(13, 'Asus ROG Strix', '/uploads/1749601310885.jpg', 'מסך מחשב גיימינג קעור Asus בגודל 31.5 אינץ דגם ROG Strix XG32WCS, פאנל VA, רזולוציה 2560x1440 2K WQHD, זמן תגובה 1ms, קצב רענון 180Hz, ו- VESA DisplayHDR 400, כולל חיבורי HDMI, חיבור DisplayPort וחיבור USB-C לתצוגה וטעינה (7.5W).', 1650.00, 50, 3, 3, '2025-06-11 00:21:50', '2025-06-11 01:55:31'),
(14, 'Dell P2725HE IPS ', '/uploads/1749601381226.jpg', 'מסך מחשב דל 27 אינץ\' דגם P2725HE, פאנל IPS, רזולוציה Full HD, חיבורי תצוגה HDMI / USB-C / DisplayPort, כניסת תצוגה USB-C תומכת טעינה עד 90W, כולל כניסת רשת קווית, מפצל USB מובנה ויציאת USB-C נוספת עם טעינה של 15W (אינו מעביר תצוגה)', 895.00, 41, 5, 3, '2025-06-11 00:22:38', '2025-06-11 00:23:01'),
(15, 'Logitech G213 Prodigy RGB Gaming', '/uploads/1749601501419.jpg', 'מקלדת Logitech דגם G213 Prodigy RGB Gaming הכוללת תאורת RGB ומקשי מולטימדיה - האותיות בעברית אינן מוארות, שפות עברית ואנגלית', 219.00, 33, 7, 2, '2025-06-11 00:24:41', '2025-06-11 00:25:01'),
(16, 'CORSAIR K70 MAX MGX MAGNETIC PBT', '/uploads/1749601565497.jpg', 'תהנו מחוויית משחק אדירה, למקלדת תאורת RGB מרהיבה ומתגים מגנטיים CORSAIR MGX switches שניתנים לכיוון כל אחד בנפרד לפי עבור ביצועי משחק יוצאים מן הכלל.', 1199.00, 22, 9, 2, '2025-06-11 00:26:05', '2025-06-11 00:26:05'),
(17, 'Logitech G515 Lightspeed', '/uploads/1749601610387.jpg', '', 649.00, 23, 7, 2, '2025-06-11 00:26:50', '2025-06-11 00:26:50'),
(18, 'Razer Ornata V3 Mecha', '/uploads/1749601654068.jpg', 'מקלדת Razer דגם Ornata V3 עם Mecha-Membrane Switch כולל תאורת לד, פרופיל נמוך, ומקשים מצופים UV לעמידות מוגברת', 339.00, 15, 8, 2, '2025-06-11 00:27:34', '2025-06-11 00:27:34'),
(19, 'Razer BlackWidow V4 X Yellow', '/uploads/1749601734215.jpg', 'מקלדת מכנית גיימינג Razer BlackWidow V4 X במהדורת Fortnite בצבע כחול עם תאורת RGB ומתגים ליניארים Razer Yellow', 999.00, 3, 8, 2, '2025-06-11 00:28:54', '2025-06-11 00:28:54'),
(20, 'Asus Vivobook X1404VA', '/uploads/1749601952692.jpg', 'מחשב נייד Asus מסך \"14 Asus Vivobook X1404VA-EB084W i7-1355U כונן 512GB SSD זיכרון 16GB ומ.גרפי Intel Iris Xᵉ Graphics בצבע Terra Cotta', 3039.00, 12, 3, 1, '2025-06-11 00:32:32', '2025-06-11 00:32:32'),
(21, 'Dell Vostro 15 3520', '/uploads/1749602002967.jpg', 'מחשב נייד Dell Vostro 15 מסך \"15.6 מעבד Intel Core i5-1235U כונן 1TB SSD זכרון 16GB DDR4 מאיץ גרפי Intel Iris Xe Graphics', 3279.00, 7, 5, 1, '2025-06-11 00:33:22', '2025-06-11 00:33:22'),
(22, 'Lenovo IdeaPad Slim ', '/uploads/1749602059707.jpg', 'מחשב נייד Lenovo IdeaPad Slim 5, מסך 14 אינץ\' OLED עם רזולוציה WUXGA (1920x1200), מעבד Intel Core 7 240H דור Core Series 2, כונן 1TB SSD, זכרון 32GB DDR5, מאיץ גרפי Intel Graphics', 5184.00, 22, 1, 1, '2025-06-11 00:34:19', '2025-06-11 00:34:19'),
(23, 'Apple MacBook Pro 14', '/uploads/1749602137920.jpg', 'מחשב נייד Apple MacBook Pro 14, מעבד Apple M4 Max chip, כונן 1TB SSD, זכרון 36GB, מ.גרפי 32 ליבות, בצבע Silver, שנת השקה 2024', 13799.00, 37, 6, 1, '2025-06-11 00:35:37', '2025-06-11 00:35:37'),
(24, 'HP Omen Transcend', '/uploads/1749602180449.jpg', 'מחשב נייד גיימינג HP Omen Transcend, מסך 14 אינץ\', פאנל OLED עם רזולוציה 3K (2880x1800) וקצב רענון דינמי עד 120Hz, מעבד Intel Core Ultra 9 185H דור Core Ultra Series 1, זכרון 32GB DDR5, כונן 1TB SSD, מאיץ גרפי NVIDIA GeForce RTX 4070 8GB GDDR6', 9849.00, 0, 2, 1, '2025-06-11 00:36:20', '2025-06-11 00:36:20'),
(25, 'Lenovo LOQ', '/uploads/1749602233130.jpg', 'מחשב נייד גיימינג Lenovo מסך \"15.6 מעבד Intel Core i7-13650HX דור 13 כונן 1TB SSD M.2 זכרון 24GB DDR5 4800MHz מאיץ גרפי NVIDIA GeForce RTX 4050 6GB GDDR6', 5549.00, 17, 1, 1, '2025-06-11 00:37:13', '2025-06-11 00:37:13'),
(26, 'Asus TUF Gaming F16', '/uploads/1749602285549.png', 'מחשב נייד גיימינג Asus TUF Gaming F16, מעבד Intel Core i7-13620H דור 13, כונן 1TB SSD, זכרון 32GB DDR5, מסך WUXGA (1920 x 1200) IPS עם קצב רענון 144Hz, כרטיס מסך Nvidia GeForce RTX 4050 6GB GDDR6', 5773.00, 20, 3, 1, '2025-06-11 00:38:05', '2025-06-11 00:38:05'),
(27, 'Samsung Galaxy Z Fold 6', '/uploads/1749602686347.jpg', 'סמארטפון Samsung Galaxy Z Fold6 בנפח 256GB וזיכרון 12GB RAM מעניק לכם חווית צפייה סוחפת עם מסך עצום ואיכותי בחוויה מתקפלת, מצלמה מקצועית עם עריכת תמונות חכמה AI, ביצועים עוצמתיים עם מעבד Snapdragon 8 Gen3, חיי סוללה ארוכים עם סוללה מתקדמת 4,400mAh ועמידות מוגברת עם מסגרת אלומיניום\n', 6326.00, 8, 10, 5, '2025-06-11 00:44:46', '2025-06-11 00:44:46'),
(28, 'Apple iPhone 16', '/uploads/1749602748389.jpg', 'אייפון Apple iPhone 16, עם נפח 256GB, בצבע ורוד, חיבור USB-C, עם לחצן המצלמה החדש ולחצן Action Button', 3789.00, 15, 6, 5, '2025-06-11 00:45:48', '2025-06-11 00:45:48'),
(29, 'Apple iPhone 16 Pro', '/uploads/1749602804260.jpg', 'אייפון Apple iPhone 16 Pro, עם נפח 256GB, בצבע שחור טיטניום, חיבור USB-C, עם לחצן המצלמה החדש ולחצן Action Button', 4690.00, 19, 6, 5, '2025-06-11 00:46:44', '2025-06-11 00:46:44'),
(30, 'Apple iPhone 16 Pro Max', '/uploads/1749602857033.jpg', 'אייפון Apple iPhone 16 Pro Max, עם נפח 256GB, בצבע טיטניום מדבר, חיבור USB-C, עם לחצן המצלמה החדש ולחצן Action Button\n', 4945.00, 0, 6, 5, '2025-06-11 00:47:37', '2025-06-11 00:47:37'),
(31, 'Samsung Galaxy S25 Ultra', '/uploads/1749602985251.jpg', 'סמארטפון Galaxy S25 Ultra מציע ביצועים עוצמתיים בזכות מעבד Snapdragon 8 Elite, מסך Dynamic AMOLED 2X בגודל 6.9 אינץ\' וברזולוציית QHD+ (3120x1440), סוללה עוצמתית בקיבולת 5,000mAh, מצלמה ראשית עם חיישן 200 מגה-פיקסל במערך צילום מרובע, עיצוב יוקרתי עם מסגרת טיטניום מחוזקת וזכוכית Gorilla Glass Armor, ויכולות בינה מלאכותית מתקדמות', 5449.00, 18, 10, 5, '2025-06-11 00:49:45', '2025-06-11 00:49:45'),
(32, 'Samsung Galaxy A06', '/uploads/1749603037881.jpg', 'סמארטפון Samsung Galaxy A06 בנפח 128GB ו-4GB RAM עם מסך 6.7 אינץ\', מצלמת 50MP מקצועית, סוללת 5,000mAh עם טעינה מהירה, אבטחת Samsung Knox Vault, ועיצוב דק', 409.00, 5, 10, 5, '2025-06-11 00:50:37', '2025-06-11 01:49:32');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `email`, `phone`) VALUES
(1, 'Lenovo', 'contact@lenovo.com', '111-222-0001'),
(2, 'HP', 'support@hp.com', '111-222-0002'),
(3, 'Asus', 'support@asus.com', '111-222-0003'),
(4, 'LG', 'support@lg.com', '111-222-0004'),
(5, 'Dell', 'support@dell.com', '111-222-0005'),
(6, 'Apple', 'support@apple.com', '111-222-0006'),
(7, 'Logitech', 'support@logitech.com', '111-222-0007'),
(8, 'Razer', 'support@razer.com', '111-222-0008'),
(9, 'Corsair', 'support@corsair.com', '111-222-0009'),
(10, 'Samsung', 'support@samsung.com', '1800-726-7864');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `is_manager` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `phone`, `city`, `password`, `is_manager`, `created_at`, `updated_at`) VALUES
(1, 'bshara@gmail.com', 'bshara', '123-456-7890', 'Hifa', '$2b$10$Ku.uGIhoKpjmNpe2dz/N2uoA1nJlZ11ZWqP9DrApuy67YxM20ja6a', 0, '2025-06-11 00:03:26', '2025-06-11 00:03:26'),
(2, 'batman@gmail.com', 'batman', '123-456-7890', 'Tel Aviv', '$2b$10$iJu.uqbVvOgTvOYsMweQYuDO1L7N3aadcVvOkJIFrNAcXLCU3eY0u', 0, '2025-06-12 00:58:13', '2026-05-08 00:59:01'),
(3, 'joker@gmail.com', 'joker', '123-456-7890', 'Nazareth', '$2b$10$qAnbgvR88TZryht8gO8AH.pccH0e5exBwAPRlFRtmdTTp9JRFLe.u', 0, '2025-06-12 00:58:45', '2026-05-08 00:59:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
