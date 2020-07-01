-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 30, 2020 at 05:29 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `snaily-cad`
--

-- --------------------------------------------------------

--
-- Table structure for table `911calls`
--

CREATE TABLE `911calls` (
  `id` int(11) NOT NULL,
  `description` varchar(1800) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `assigned_unit` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `action_logs`
--

CREATE TABLE `action_logs` (
  `id` int(11) NOT NULL,
  `action_title` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `arrest_reports`
--

CREATE TABLE `arrest_reports` (
  `id` int(11) NOT NULL,
  `arrestee_name` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `charges` text NOT NULL,
  `officer_name` varchar(255) NOT NULL,
  `notes` text NOT NULL,
  `postal` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bleets`
--

CREATE TABLE `bleets` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `uploaded_by` varchar(255) NOT NULL,
  `uploaded_at` varchar(255) NOT NULL,
  `file_dir` text NOT NULL,
  `pinned` varchar(255) NOT NULL,
  `likes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bolos`
--

CREATE TABLE `bolos` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `plate` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `businesses`
--

CREATE TABLE `businesses` (
  `id` int(11) NOT NULL,
  `business_name` varchar(255) NOT NULL,
  `business_owner` varchar(255) NOT NULL,
  `linked_to` varchar(255) NOT NULL,
  `whitelisted` varchar(255) NOT NULL,
  `business_address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cad_info`
--

CREATE TABLE `cad_info` (
  `id` int(11) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `cad_name` varchar(255) NOT NULL,
  `AOP` varchar(255) NOT NULL,
  `tow_whitelisted` varchar(255) NOT NULL,
  `whitelisted` varchar(255) NOT NULL,
  `company_whitelisted` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `citizens`
--

CREATE TABLE `citizens` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `stringifyd_name` varchar(500) NOT NULL,
  `linked_to` varchar(255) NOT NULL,
  `birth` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `ethnicity` varchar(255) NOT NULL,
  `hair_color` varchar(255) NOT NULL,
  `eye_color` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `height` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `dmv` varchar(255) NOT NULL,
  `fire_license` varchar(255) NOT NULL,
  `pilot_license` varchar(255) NOT NULL,
  `ccw` varchar(255) NOT NULL,
  `business` varchar(255) NOT NULL,
  `rank` varchar(255) NOT NULL,
  `vehicle_reg` varchar(255) NOT NULL,
  `posts` varchar(255) NOT NULL,
  `citizen_picture` text NOT NULL,
  `b_status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ems-fd`
--

CREATE TABLE `ems-fd` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `linked_to` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `status2` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ethnicities`
--

CREATE TABLE `ethnicities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `genders`
--

CREATE TABLE `genders` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `in_statuses`
--

CREATE TABLE `in_statuses` (
  `id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `leo_tickets`
--

CREATE TABLE `leo_tickets` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `violations` text NOT NULL,
  `officer_name` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `postal` varchar(255) NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `medical_records`
--

CREATE TABLE `medical_records` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `short_info` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `officers`
--

CREATE TABLE `officers` (
  `id` int(11) NOT NULL,
  `officer_name` varchar(255) NOT NULL,
  `officer_dept` varchar(255) NOT NULL,
  `linked_to` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `status2` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `linked_to_bus` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `uploadedBy` varchar(255) NOT NULL,
  `uploadedAt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `registered_cars`
--

CREATE TABLE `registered_cars` (
  `id` int(11) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `vehicle` varchar(255) NOT NULL,
  `vin_number` varchar(255) NOT NULL,
  `in_status` varchar(255) NOT NULL,
  `plate` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `linked_to` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `registered_weapons`
--

CREATE TABLE `registered_weapons` (
  `id` int(11) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `weapon` varchar(255) NOT NULL,
  `serial_number` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `linked_to` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tow_calls`
--

CREATE TABLE `tow_calls` (
  `id` int(11) NOT NULL,
  `description` varchar(1800) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `truck_logs`
--

CREATE TABLE `truck_logs` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `timestamp` varchar(255) NOT NULL,
  `co_driver` varchar(255) NOT NULL,
  `start_time` varchar(255) NOT NULL,
  `plate` varchar(255) NOT NULL,
  `linked_to` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rank` varchar(255) NOT NULL,
  `leo` varchar(255) NOT NULL,
  `ems_fd` varchar(255) NOT NULL,
  `dispatch` varchar(255) NOT NULL,
  `tow` varchar(255) NOT NULL,
  `banned` varchar(255) NOT NULL,
  `ban_reason` varchar(255) NOT NULL,
  `whitelist_status` varchar(255) NOT NULL,
  `dispatch_status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `cname` varchar(255) NOT NULL,
  `default_car` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `cname`, `default_car`) VALUES
(1, 'Albany Alpha		', 'true'),
(2, 'Albany Buccaneer		', 'true'),
(3, 'Albany Buccaneer Custom		', 'true'),
(4, 'Albany Cavalcade		', 'true'),
(5, 'Albany Cavalcade FXT		', 'true'),
(6, 'Albany Emperor		', 'true'),
(7, 'Albany Esperanto		', 'true'),
(8, 'Albany Franken Stange		', 'true'),
(9, 'Albany Hermes		', 'true'),
(10, 'Albany Lurcher		', 'true'),
(11, 'Albany Manana		', 'true'),
(12, 'Albany Police Roadcruiser		', 'true'),
(13, 'Albany Presidente		', 'true'),
(14, 'Albany Primo		', 'true'),
(15, 'Albany Primo Custom		', 'true'),
(16, 'Albany Taxi Cab		', 'true'),
(17, 'Albany Romero		', 'true'),
(18, 'Albany Roosevelt		', 'true'),
(19, 'Albany Roosevelt Valor		', 'true'),
(20, 'Albany Stretch		', 'true'),
(21, 'Albany Virgo		', 'true'),
(22, 'Albany Washington		', 'true'),
(23, 'Annis Elergy Retro Custom		', 'true'),
(24, 'Annis Elergy RH8		', 'true'),
(25, 'Annis RE7B		', 'true'),
(26, 'Annis Savestra		', 'true'),
(27, 'Benefactor Dubsta		', 'true'),
(28, 'Benefactor Dubsta 6X6		', 'true'),
(29, 'Benefactor Feltzer		', 'true'),
(30, 'Benefactor Glendale		', 'true'),
(31, 'Benefactor Panto		', 'true'),
(32, 'Benefactor Schafter		', 'true'),
(33, 'Benefactor Schafter LWB		', 'true'),
(34, 'Benefactor Schafter LWB Armored		', 'true'),
(35, 'Benefactor Schafter V12		', 'true'),
(36, 'Benefactor Schafter V12 Armored		', 'true'),
(37, 'Benefactor Schwartzer		', 'true'),
(38, 'Benefactor Serrano		', 'true'),
(39, 'Benefactor Stirling GT		', 'true'),
(40, 'Benefactor Streiter		', 'true'),
(41, 'Benefactor Surano		', 'true'),
(42, 'Benefactor Terrorbyte		', 'true'),
(43, 'Benefactor Turreted Limo		', 'true'),
(44, 'Benefactor XLS		', 'true'),
(45, 'Benefactor XLS Armored		', 'true'),
(46, 'BF Bifta		', 'true'),
(47, 'BF Dune Buggy		', 'true'),
(48, 'BF Dune FAV		', 'true'),
(49, 'BF Injection		', 'true'),
(50, 'BF Ramp Buggy		', 'true'),
(51, 'BF Raptor		', 'true'),
(52, 'BF Space Docker		', 'true'),
(53, 'BF Surfer		', 'true'),
(54, 'Bollokan Prairie		', 'true'),
(55, 'Bravado	Banshee		', 'true'),
(56, 'Bravado	Banshee Topless		', 'true'),
(57, 'Bravado	Banshee 900R		', 'true'),
(58, 'Bravado	Bison		', 'true'),
(59, 'Bravado	Buffalo		', 'true'),
(60, 'Bravado	Buffalo S		', 'true'),
(61, 'Bravado	Duneloader		', 'true'),
(62, 'Bravado	FIB Buffalo		', 'true'),
(63, 'Bravado	Gauntlet		', 'true'),
(64, 'Bravado	Gresley		', 'true'),
(65, 'Bravado	HalfTrack		', 'true'),
(66, 'Bravado	Paradise		', 'true'),
(67, 'Bravado	Police Cruiser Buffalo		', 'true'),
(68, 'Bravado	RatLoader		', 'true'),
(69, 'Bravado	RatTruck		', 'true'),
(70, 'Bravado	Redwood Gauntlet		', 'true'),
(71, 'Bravado	Rumpo		', 'true'),
(72, 'Bravado	Rumpo Custom		', 'true'),
(73, 'Bravado	Sprunk Buffalo		', 'true'),
(74, 'Bravado	Verlierer		', 'true'),
(75, 'Bravado	Youga		', 'true'),
(76, 'Bravado	Youga Classic		', 'true'),
(77, 'Brute Airport Bus		', 'true'),
(78, 'Brute Ambulance		', 'true'),
(79, 'Brute Boxville		', 'true'),
(80, 'Brute Boxville Armored		', 'true'),
(81, 'Brute Bus		', 'true'),
(82, 'Brute Camper		', 'true'),
(83, 'Brute Dashound		', 'true'),
(84, 'Brute Police Riot		', 'true'),
(85, 'Brute Pony		', 'true'),
(86, 'Brute Rental Shuttle Bus	', 'true'),
(87, 'Brute Stockade		', 'true'),
(88, 'Brute Taco Van		', 'true'),
(89, 'Brute Tipper		', 'true'),
(90, 'Brute Tipper Classic		', 'true'),
(91, 'Brute Tour Bus		', 'true'),
(92, 'Brute Utility Truck		', 'true'),
(93, 'Brute Cherry Picker Utility Truck		', 'true'),
(94, 'Canis Bohdi		', 'true'),
(95, 'Canis Crusader		', 'true'),
(96, 'Canis Kalahari		', 'true'),
(97, 'Canis Kalahari Topless		', 'true'),
(98, 'Canis Kamacho		', 'true'),
(99, 'Canis Mesa		', 'true'),
(100, 'Canis Merryweather Mesa		', 'true'),
(101, 'Canis Seminole		', 'true'),
(102, 'Chariot Romero Hearse		', 'true'),
(103, 'Cheval Fugitive		', 'true'),
(104, 'Cheval Marshall		', 'true'),
(105, 'Cheval Picador		', 'true'),
(106, 'Cheval Surge		', 'true'),
(107, 'Cheval Taipan		', 'true'),
(108, 'Coil Brawler		', 'true'),
(109, 'Coil Cyclone		', 'true'),
(110, 'Coil Raiden		', 'true'),
(111, 'Coil Rocket Voltic		', 'true'),
(112, 'Coil Voltic		', 'true'),
(113, 'Coil Topless Voltic		', 'true'),
(114, 'Declasse Asea		', 'true'),
(115, 'Declasse Burger Shot Stallion		', 'true'),
(116, 'Declasse Burrito		', 'true'),
(117, 'Declasse Drift Tampa		', 'true'),
(118, 'Declasse FIB Granger		', 'true'),
(119, 'Declasse LMC Biker Burrito		', 'true'),
(120, 'Declasse Granger		', 'true'),
(121, 'Declasse Hotring Sabre		', 'true'),
(122, 'Declasse Lifegaurd Granger		', 'true'),
(123, 'Declasse Mamba		', 'true'),
(124, 'Declasse Moonbeam		', 'true'),
(125, 'Declasse Moonbeam Custom		', 'true'),
(126, 'Declasse Park Ranger Granger		', 'true'),
(127, 'Declasse Police Rancher		', 'true'),
(128, 'Declasse Police Transport Van		', 'true'),
(129, 'Declasse Premier		', 'true'),
(130, 'Declasse Rancher XL		', 'true'),
(131, 'Declasse Rhapsody		', 'true'),
(132, 'Declasse Sabre Turbo		', 'true'),
(133, 'Declasse Sabre Turbo Custom		', 'true'),
(134, 'Declasse Sheriff Granger		', 'true'),
(135, 'Declasse Stallion		', 'true'),
(136, 'Declasse Tampa		', 'true'),
(137, 'Declasse Tornado		', 'true'),
(138, 'Declasse Tornado Convertible		', 'true'),
(139, 'Declasse Tornado Custom		', 'true'),
(140, 'Declasse Tornado Rat Rod		', 'true'),
(141, 'Declasse Vigero		', 'true'),
(142, 'Declasse Voodoo		', 'true'),
(143, 'Declasse Voodoo Custom		', 'true'),
(144, 'Declasse Weaponized Tampa		', 'true'),
(145, 'Declasse Yosemite		', 'true'),
(146, 'Dewbauchee Exemplar		', 'true'),
(147, 'Dewbauchee JB 700		', 'true'),
(148, 'Dewbauchee Massacro		', 'true'),
(149, 'Dewbauchee Massacro RaceCar		', 'true'),
(150, 'Dewbauchee Rapid GT		', 'true'),
(151, 'Dewbauchee Rapid GT Classic		', 'true'),
(152, 'Dewbauchee Rapid GT Sports		', 'true'),
(153, 'Dewbauchee Seven - 70		', 'true'),
(154, 'Dewbauchee Specter		', 'true'),
(155, 'Dewbauchee Specter Custom		', 'true'),
(156, 'Dewbauchee Vagner		', 'true'),
(157, 'Dinka Akuma		', 'true'),
(158, 'Dinka Blista		', 'true'),
(159, 'Dinka Blista Compact		', 'true'),
(160, 'Dinka Double - T		', 'true'),
(161, 'Dinka Enduro		', 'true'),
(162, 'Dinka Go - Go Monkey Blista		', 'true'),
(163, 'Dinka Jester		', 'true'),
(164, 'Dinka Jester RaceCar		', 'true'),
(165, 'Dinka Jester Classic		', 'true'),
(166, 'Dinka Thrust		', 'true'),
(167, 'Dinka Vindicator		', 'true'),
(168, 'Dundreary Landstalker		', 'true'),
(169, 'Dundreary Regina		', 'true'),
(170, 'Dundreary Stretch		', 'true'),
(171, 'Dundreary Virgo Classic		', 'true'),
(172, 'Dundreary Virgo Classic Custom		', 'true'),
(173, 'Emperor	ETR1		', 'true'),
(174, 'Emperor	Habanero		', 'true'),
(175, 'Enus Cognoscenti		', 'true'),
(176, 'Enus Cognoscenti Armored		', 'true'),
(177, 'Enus Cognoscenti 55		', 'true'),
(178, 'Enus Cognoscenti 55 Armored', 'true'),
(179, 'Enus Cognoscenti Cabrio', 'true'),
(180, 'Enus Huntley S', 'true'),
(181, 'Enus Stafford', 'true'),
(182, 'Enus Super Diamond', 'true'),
(183, 'Enus Windsor', 'true'),
(184, 'Enus Windsor Drop', 'true'),
(185, 'Fathom	FQ 2', 'true'),
(186, 'Gallivanter Baller Classic', 'true'),
(187, 'Gallivanter Baller		', 'true'),
(188, 'Gallivanter Baller LE		', 'true'),
(189, 'Gallivanter Baller LE Armored		', 'true'),
(190, 'Gallivanter Baller LE LWB		', 'true'),
(191, 'Gallivanter Baller LE LWB Armored		', 'true'),
(192, 'Grotti Bestia GTS		', 'true'),
(193, 'Grotti Brioso R / A		', 'true'),
(194, 'Grotti Carbonizzare		', 'true'),
(195, 'Grotti Cheetah		', 'true'),
(196, 'Grotti Cheetah Classic		', 'true'),
(197, 'Grotti GT500		', 'true'),
(198, 'Grotti Stinger		', 'true'),
(199, 'Grotti Topless Stinger		', 'true'),
(200, 'Grotti Stinger GT		', 'true'),
(201, 'Grotti Turismo Classic		', 'true'),
(202, 'Grotti Turismo R		', 'true'),
(203, 'Grotti Vigilante		', 'true'),
(204, 'Grotti Visione		', 'true'),
(205, 'Grotti X80 Proto		', 'true'),
(206, 'Hijak Khamelion		', 'true'),
(207, 'Hijak Ruston		', 'true'),
(208, 'HVY	Airtug		', 'true'),
(209, 'HVY	APC Tank		', 'true'),
(210, 'HVY	Barracks		', 'true'),
(211, 'HVY	Barracks Semi		', 'true'),
(212, 'HVY	Biff		', 'true'),
(213, 'HVY	Chernobog		', 'true'),
(214, 'HVY	Crane		', 'true'),
(215, 'HVY	Cutter		', 'true'),
(216, 'HVY	Dock Handler		', 'true'),
(217, 'HVY	Docktug		', 'true'),
(218, 'HVY	Dozer		', 'true'),
(219, 'HVY	Dump		', 'true'),
(220, 'HVY	Forklift		', 'true'),
(221, 'HVY	Insurgent		', 'true'),
(222, 'HVY	Insurgent Pick - Up		', 'true'),
(223, 'HVY	Insurgent Pick - up Custom		', 'true'),
(224, 'HVY	Mixer Classic		', 'true'),
(225, 'HVY	Mixer		', 'true'),
(226, 'HVY	Nightshark		', 'true'),
(227, 'HVY	Ripley		', 'true'),
(228, 'HVY	Skylift		', 'true'),
(229, 'Imponte	Deluxo		', 'true'),
(230, 'Imponte	Duke O Death		', 'true'),
(231, 'Imponte	Dukes		', 'true'),
(232, 'Imponte	Nightshade		', 'true'),
(233, 'Imponte	Phoenix		', 'true'),
(234, 'Imponte	Ruiner		', 'true'),
(235, 'Imponte	Ruiner 2000		', 'true'),
(236, 'Invetero Coquette		', 'true'),
(237, 'Invetero Coquette Topless		', 'true'),
(238, 'Invetero Coquette BlackFin		', 'true'),
(239, 'Invetero Coquette Classic		', 'true'),
(240, 'Invetero Coquette Classic Topless		', 'true'),
(241, 'Jacksheepe Lawn Mower		', 'true'),
(242, 'JoBuilt	Hauler		', 'true'),
(243, 'JoBuilt	Hauler Custom		', 'true'),
(244, 'JoBuilt	Phantom		', 'true'),
(245, 'JoBuilt	Phantom Custom		', 'true'),
(246, 'JoBuilt	Phantom Wedge		', 'true'),
(247, 'JoBuilt	Rubble		', 'true'),
(248, 'JoBuilt	Trashmaster		', 'true'),
(249, 'Karin 190z		', 'true'),
(250, 'Karin Asterope		', 'true'),
(251, 'Karin BeeJay XL		', 'true'),
(252, 'Karin Dilettante		', 'true'),
(253, 'Karin Dilettante Patrol Vehicle		', 'true'),
(254, 'Karin Futo		', 'true'),
(255, 'Karin Intruder		', 'true'),
(256, 'Karin Kuruma		', 'true'),
(257, 'Karin Kuruma Armored		', 'true'),
(258, 'Karin Rebel		', 'true'),
(259, 'Karin Sultan		', 'true'),
(260, 'Karin Sultan RS		', 'true'),
(261, 'Karin Technical		', 'true'),
(262, 'Karin Technical Aqua		', 'true'),
(263, 'Karin Technical Custom		', 'true'),
(264, 'Lampadati Casco		', 'true'),
(265, 'Lampadati Felon		', 'true'),
(266, 'Lampadati Felon GT		', 'true'),
(267, 'Lampadati Furore GT		', 'true'),
(268, 'Lampadati Michelli GT		', 'true'),
(269, 'Lampadati Pigalle		', 'true'),
(270, 'Lampadati Tropos Rallye		', 'true'),
(271, 'Lampadati Viseris		', 'true'),
(272, 'LCC	Avarus		', 'true'),
(273, 'LCC	Hexer		', 'true'),
(274, 'LCC	Innovation		', 'true'),
(275, 'LCC	Sanctus		', 'true'),
(276, 'Maibatsu Manchez		', 'true'),
(277, 'Maibatsu Mule		', 'true'),
(278, 'Maibatsu Mule Armored		', 'true'),
(279, 'Maibatsu Mule Custom		', 'true'),
(280, 'Maibatsu Penumbra		', 'true'),
(281, 'Maibatsu Sanchez		', 'true'),
(282, 'Maibatsu Sanchez w / Livery		', 'true'),
(283, 'Mammoth	Patriot		', 'true'),
(284, 'Mammoth	Patriot Stretch		', 'true'),
(285, 'Mammoth	Thruster Jetpack		', 'true'),
(286, 'MTL	Brickade		', 'true'),
(287, 'MTL	Dune		', 'true'),
(288, 'MTL	Fire Truck		', 'true'),
(289, 'MTL	Flatbed		', 'true'),
(290, 'MTL	Packer		', 'true'),
(291, 'MTL	Pounder		', 'true'),
(292, 'MTL	Pounder Custom		', 'true'),
(293, 'MTL	Wastelander		', 'true'),
(294, 'Nagasaki BF400		', 'true'),
(295, 'Nagasaki Blazer		', 'true'),
(296, 'Nagasaki Blazer Aqua		', 'true'),
(297, 'Nagasaki Blazer Lifeguard		', 'true'),
(298, 'Nagasaki Caddy		', 'true'),
(299, 'Nagasaki Bunker Caddy		', 'true'),
(300, 'Nagasaki Caddy Utility		', 'true'),
(301, 'Nagasaki Carbon RS		', 'true'),
(302, 'Nagasaki Chimera		', 'true'),
(303, 'Nagasaki Hot Rod Blazer		', 'true'),
(304, 'Nagasaki Shotaro		', 'true'),
(305, 'Nagasaki Street Blazer		', 'true'),
(306, 'Obey 9F		', 'true'),
(307, 'Obey 9F Cabrio		', 'true'),
(308, 'Obey Omnis		', 'true'),
(309, 'Obey Rocoto		', 'true'),
(310, 'Obey Tailgater		', 'true'),
(311, 'Ocelot Ardent		', 'true'),
(312, 'Ocelet F620		', 'true'),
(313, 'Ocelet Jackal		', 'true'),
(314, 'Ocelet Lynx		', 'true'),
(315, 'Ocelet Pariah		', 'true'),
(316, 'Ocelet Penetrator		', 'true'),
(317, 'Ocelet Stromberg		', 'true'),
(318, 'Ocelet Swinger		', 'true'),
(319, 'Ocelet XA - 21		', 'true'),
(320, 'Overflod Autarch		', 'true'),
(321, '  Overflod Entity XF		', 'true'),
(322, '  Overflod Entity XXR		', 'true'),
(323, '  Overflod Tyrant		', 'true'),
(324, '  Pegassi Bati 801		', 'true'),
(325, '  Pegassi Bati 801RR		', 'true'),
(326, '  Pegassi Esskey		', 'true'),
(327, '  Pegassi Faggio		', 'true'),
(328, '  Pegassi Faggio Mod		', 'true'),
(329, '  Pegassi FCR 1000		', 'true'),
(330, '  Pegassi FCR 1000 Custom		', 'true'),
(331, '  Pegassi Infernus		', 'true'),
(332, '  Pegassi Infernus Classic		', 'true'),
(333, '  Pegassi Monroe		', 'true'),
(334, '  Pegassi Oppressor		', 'true'),
(335, '  Pegassi Oppressor MK II		', 'true'),
(336, '  Pegassi Osiris		', 'true'),
(337, '  Pegassi Reaper		', 'true'),
(338, '  Pegassi Ruffian		', 'true'),
(339, '  Pegassi Tempesta		', 'true'),
(340, '  Pegassi Tezeract		', 'true'),
(341, '  Pegassi Torero		', 'true'),
(342, '  Pegassi Vacca		', 'true'),
(343, '  Pegassi Vortex		', 'true'),
(344, '  Pegassi Zentorno		', 'true'),
(345, '  Pfister 811		', 'true'),
(346, '  Pfister Comet		', 'true'),
(347, '  Pfister Comet Retro Custom		', 'true'),
(348, '  Pfister Comet Safari		', 'true'),
(349, '  Pfister Comet SR		', 'true'),
(350, '  Pfister Neon		', 'true'),
(351, '  Principe Diabolus		', 'true'),
(352, '  Principe Diabolus Custom		', 'true'),
(353, '  Principe Lectro		', 'true'),
(354, '  Principe Nemesis		', 'true'),
(355, '  Progen GP1		', 'true'),
(356, '  Progen Itali GTB		', 'true'),
(357, '  Progen Itali GTB Custom		', 'true'),
(358, '  Progen T20		', 'true'),
(359, '  Progen Tyrus		', 'true'),
(360, '  RUNE Cheburek		', 'true'),
(361, '  Schyster Fusilade		', 'true'),
(362, '  Shitzu Defiler		', 'true'),
(363, '  Shitzu Hakuchou		', 'true'),
(364, '  Shitzu Hakuchou Drag Bike		', 'true'),
(365, '  Shitzu PCJ 600		', 'true'),
(366, '  Shitzu Vader		', 'true'),
(367, '  Stanley	Fieldmaster		', 'true'),
(368, '  Stanley	Tractor		', 'true'),
(369, '  Truffade Adder		', 'true'),
(370, '  Truffade Nero		', 'true'),
(371, '  Truffade Nero Custom		', 'true'),
(372, '  Truffade Z - Type		', 'true'),
(373, '  Ubermacht Oracle		', 'true'),
(374, '  Ubermacht Oracle XS		', 'true'),
(375, '  Ubermacht Revolter		', 'true'),
(376, '  Ubermacht SC1		', 'true'),
(377, '  Ubermacht Sentinel		', 'true'),
(378, '  Ubermacht Sentinel Classic		', 'true'),
(379, '  Ubermacht Sentinel XS		', 'true'),
(380, '  Ubermacht Zion		', 'true'),
(381, '  Ubermacht Zion Cabrio		', 'true'),
(382, '  Vapid Benson		', 'true'),
(383, '  Vapid Blade		', 'true'),
(384, '  Vapid Bobcat XL		', 'true'),
(385, '  Vapid Bullet		', 'true'),
(386, '  Vapid Caracara		', 'true'),
(387, '  Vapid Chino		', 'true'),
(388, '  Vapid Chino Custom		', 'true'),
(389, '  Vapid Clown Van		', 'true'),
(390, '  Vapid Contender		', 'true'),
(391, '  Vapid Desert Raid		', 'true'),
(392, '  Vapid Dominator		', 'true'),
(393, '  Vapid Dominator GTX		', 'true'),
(394, '  Vapid Ellie		', 'true'),
(395, '  Vapid Flash GT		', 'true'),
(396, '  Vapid FMJ		', 'true'),
(397, '  Vapid GB200		', 'true'),
(398, '  Vapid Guardian		', 'true'),
(399, '  Vapid Hotknife		', 'true'),
(400, '  Vapid Hustler		', 'true'),
(401, '  Vapid Minivan		', 'true'),
(402, '  Vapid Minivan Custom		', 'true'),
(403, '  Vapid Peyote		', 'true'),
(404, '  Vapid Pibwasser		', 'true'),
(405, '  Vapid Police Cruiser		', 'true'),
(406, '  Vapid Police Interceptor		', 'true'),
(407, '  Vapid Police Prison Bus		', 'true'),
(408, '  Vapid Radius		', 'true'),
(409, '  Vapid Retinue		', 'true'),
(410, '  Vapid Riata		', 'true'),
(411, '  Vapid Sadler		', 'true'),
(412, '  Vapid Sandking SWB		', 'true'),
(413, '  Vapid Sandking XL		', 'true'),
(414, '  Vapid Scrap Truck		', 'true'),
(415, '  Vapid Sheriff Cruiser		', 'true'),
(416, '  Vapid Slamvan		', 'true'),
(417, '  Vapid Slamvan Custom		', 'true'),
(418, '  Vapid Speedo		', 'true'),
(419, '  Vapid Speedo Custom		', 'true'),
(420, '  Vapid Stanier		', 'true'),
(421, '  Vapid Taxi		', 'true'),
(422, '  Vapid Liberator		', 'true'),
(423, '  Vapid Tow Truck		', 'true'),
(424, '  Vapid Large Tow Truck		', 'true'),
(425, '  Vapid Trophy Truck		', 'true'),
(426, '  Vapid Unmarked Cruiser		', 'true'),
(427, '  Vapid Utility Truck		', 'true'),
(428, '  Vulcar Fagaloa		', 'true'),
(429, '  Vulcar Ingot		', 'true'),
(430, '  Vulcar Warrener		', 'true'),
(431, '  Weeny Issi		', 'true'),
(432, '  Weeny Issi Classic		', 'true'),
(433, '  Western Motorcycle Company	Bagger		', 'true'),
(434, '  Western Motorcycle Company	Cliffhanger		', 'true'),
(435, '  Western Motorcycle Company	Daemon		', 'true'),
(436, '  Western Motorcycle Company	Daemon Custom	', 'true'),
(437, '  Western Motorcycle Company	Gargoyle		', 'true'),
(438, '  Western Motorcycle Company	Nightblade		', 'true'),
(439, '  Western Motorcycle Company	Police Bike		', 'true'),
(440, '  Western Motorcycle Company	Rat Bike		', 'true'),
(441, '  Western Motorcycle Company	Sovereign		', 'true'),
(442, '  Western Motorcycle Company	Wolfsbane		', 'true'),
(443, '  Western Motorcycle Company	Zombie Bobber	', 'true'),
(444, '  Western Motorcycle Company	Zombie Chopper	', 'true'),
(445, '  Willard	Faction		', 'true'),
(446, '  Willard	Faction Custom		', 'true'),
(447, '  Willard	Faction Custom Donk		', 'true'),
(448, '  Zirconium Journey', 'true'),
(449, '  Zirconium Stratum', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `warrants`
--

CREATE TABLE `warrants` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `weapons`
--

CREATE TABLE `weapons` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `default_weapon` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `written_warnings`
--

CREATE TABLE `written_warnings` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `infractions` text NOT NULL,
  `officer_name` varchar(255) NOT NULL,
  `notes` text NOT NULL,
  `postal` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `911calls`
--
ALTER TABLE `911calls`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `action_logs`
--
ALTER TABLE `action_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `arrest_reports`
--
ALTER TABLE `arrest_reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bleets`
--
ALTER TABLE `bleets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bolos`
--
ALTER TABLE `bolos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `businesses`
--
ALTER TABLE `businesses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cad_info`
--
ALTER TABLE `cad_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `citizens`
--
ALTER TABLE `citizens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ems-fd`
--
ALTER TABLE `ems-fd`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ethnicities`
--
ALTER TABLE `ethnicities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `in_statuses`
--
ALTER TABLE `in_statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leo_tickets`
--
ALTER TABLE `leo_tickets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medical_records`
--
ALTER TABLE `medical_records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `officers`
--
ALTER TABLE `officers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registered_cars`
--
ALTER TABLE `registered_cars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registered_weapons`
--
ALTER TABLE `registered_weapons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tow_calls`
--
ALTER TABLE `tow_calls`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `truck_logs`
--
ALTER TABLE `truck_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `warrants`
--
ALTER TABLE `warrants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `weapons`
--
ALTER TABLE `weapons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `written_warnings`
--
ALTER TABLE `written_warnings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `911calls`
--
ALTER TABLE `911calls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `action_logs`
--
ALTER TABLE `action_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `arrest_reports`
--
ALTER TABLE `arrest_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bleets`
--
ALTER TABLE `bleets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bolos`
--
ALTER TABLE `bolos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `businesses`
--
ALTER TABLE `businesses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cad_info`
--
ALTER TABLE `cad_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `citizens`
--
ALTER TABLE `citizens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ems-fd`
--
ALTER TABLE `ems-fd`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ethnicities`
--
ALTER TABLE `ethnicities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `genders`
--
ALTER TABLE `genders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `in_statuses`
--
ALTER TABLE `in_statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leo_tickets`
--
ALTER TABLE `leo_tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `medical_records`
--
ALTER TABLE `medical_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `officers`
--
ALTER TABLE `officers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `registered_cars`
--
ALTER TABLE `registered_cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `registered_weapons`
--
ALTER TABLE `registered_weapons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tow_calls`
--
ALTER TABLE `tow_calls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `truck_logs`
--
ALTER TABLE `truck_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=460;

--
-- AUTO_INCREMENT for table `warrants`
--
ALTER TABLE `warrants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `weapons`
--
ALTER TABLE `weapons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `written_warnings`
--
ALTER TABLE `written_warnings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
