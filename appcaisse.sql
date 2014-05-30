-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb2
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Mer 28 Mai 2014 à 14:58
-- Version du serveur: 5.5.35
-- Version de PHP: 5.4.4-14+deb7u8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `appcaisse`
--

-- --------------------------------------------------------

--
-- Structure de la table `association_produit_ingredient`
--

CREATE TABLE IF NOT EXISTS `association_produit_ingredient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_produit` int(11) NOT NULL,
  `id_ingredient` int(11) NOT NULL,
  `isAdded` tinyint(1) NOT NULL,
  `surcout` int(11) NOT NULL,
  `supprimable` tinyint(11) NOT NULL,
  `isIngredientSup` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=203 ;

--
-- Contenu de la table `association_produit_ingredient`
--

INSERT INTO `association_produit_ingredient` (`id`, `id_produit`, `id_ingredient`, `isAdded`, `surcout`, `supprimable`, `isIngredientSup`) VALUES
(3, 2, 5, 1, 0, 1, 0),
(4, 2, 2, 1, 0, 1, 0),
(5, 2, 6, 1, 0, 1, 0),
(6, 2, 7, 1, 0, 1, 0),
(7, 2, 8, 1, 0, 1, 0),
(8, 2, 9, 1, 0, 1, 0),
(9, 2, 10, 1, 0, 1, 0),
(10, 2, 11, 1, 0, 1, 0),
(11, 2, 4, 1, 0, 1, 0),
(12, 3, 12, 1, 0, 1, 0),
(13, 3, 13, 1, 0, 1, 0),
(14, 4, 14, 1, 0, 1, 0),
(15, 4, 15, 1, 0, 1, 0),
(16, 6, 2, 1, 0, 1, 0),
(17, 6, 16, 1, 0, 1, 0),
(18, 6, 17, 1, 0, 1, 0),
(19, 6, 18, 1, 0, 1, 0),
(20, 6, 9, 1, 0, 1, 0),
(21, 6, 4, 1, 0, 1, 0),
(22, 7, 19, 1, 0, 1, 0),
(23, 7, 20, 1, 0, 1, 0),
(24, 7, 2, 1, 0, 1, 0),
(25, 7, 1, 1, 0, 1, 0),
(26, 7, 8, 1, 0, 1, 0),
(27, 7, 4, 1, 0, 1, 0),
(28, 8, 21, 1, 0, 1, 0),
(29, 8, 22, 1, 0, 1, 0),
(30, 8, 2, 1, 0, 1, 0),
(31, 8, 23, 1, 0, 1, 0),
(32, 8, 1, 1, 0, 1, 0),
(33, 8, 4, 1, 0, 1, 0),
(34, 8, 7, 1, 0, 1, 0),
(35, 10, 24, 1, 0, 1, 0),
(36, 10, 25, 1, 0, 1, 0),
(37, 14, 10, 1, 0, 1, 0),
(38, 14, 9, 1, 0, 1, 0),
(39, 14, 7, 1, 0, 1, 0),
(40, 1, 1, 1, 0, 1, 0),
(41, 1, 2, 1, 0, 1, 0),
(42, 1, 3, 1, 0, 1, 0),
(43, 1, 4, 1, 0, 1, 0),
(44, 15, 26, 1, 0, 1, 0),
(45, 15, 2, 1, 0, 1, 0),
(46, 15, 27, 1, 0, 1, 0),
(47, 15, 28, 1, 0, 1, 0),
(48, 15, 29, 1, 0, 1, 0),
(49, 15, 4, 1, 0, 1, 0),
(50, 16, 17, 1, 0, 1, 0),
(51, 16, 30, 1, 0, 1, 0),
(52, 16, 31, 1, 0, 1, 0),
(53, 16, 2, 1, 0, 1, 0),
(54, 16, 1, 1, 0, 1, 0),
(55, 16, 9, 1, 0, 1, 0),
(56, 16, 4, 1, 0, 1, 0),
(57, 17, 32, 1, 0, 1, 0),
(58, 17, 1, 1, 0, 1, 0),
(59, 17, 2, 1, 0, 1, 0),
(60, 17, 33, 1, 0, 1, 0),
(61, 17, 34, 1, 0, 1, 0),
(62, 17, 35, 1, 0, 1, 0),
(63, 17, 4, 1, 0, 1, 0),
(64, 18, 1, 1, 0, 1, 0),
(65, 18, 2, 1, 0, 1, 0),
(66, 18, 36, 1, 0, 1, 0),
(67, 18, 37, 1, 0, 1, 0),
(68, 18, 4, 1, 0, 1, 0),
(69, 19, 19, 1, 0, 1, 0),
(70, 19, 31, 1, 0, 1, 0),
(71, 19, 38, 1, 0, 1, 0),
(72, 19, 11, 1, 0, 1, 0),
(73, 19, 2, 1, 0, 1, 0),
(74, 19, 1, 1, 0, 1, 0),
(75, 19, 4, 1, 0, 1, 0),
(76, 20, 1, 1, 0, 1, 0),
(77, 20, 2, 1, 0, 1, 0),
(78, 20, 39, 1, 0, 1, 0),
(79, 20, 9, 1, 0, 1, 0),
(80, 20, 10, 1, 0, 1, 0),
(81, 20, 4, 1, 0, 1, 0),
(82, 21, 40, 1, 0, 1, 0),
(83, 21, 41, 1, 0, 1, 0),
(84, 21, 42, 1, 0, 1, 0),
(85, 21, 31, 1, 0, 1, 0),
(86, 21, 2, 1, 0, 1, 0),
(87, 21, 4, 1, 0, 1, 0),
(88, 22, 42, 1, 0, 1, 0),
(89, 22, 43, 1, 0, 1, 0),
(90, 22, 44, 1, 0, 1, 0),
(91, 22, 2, 1, 0, 1, 0),
(92, 22, 4, 1, 0, 1, 0),
(93, 23, 45, 1, 0, 1, 0),
(94, 23, 29, 1, 0, 1, 0),
(95, 23, 2, 1, 0, 1, 0),
(96, 23, 31, 1, 0, 1, 0),
(97, 23, 10, 1, 0, 1, 0),
(98, 23, 4, 1, 0, 1, 0),
(99, 23, 46, 1, 0, 1, 0),
(100, 23, 34, 1, 0, 1, 0),
(101, 23, 2, 1, 0, 1, 0),
(102, 23, 1, 1, 0, 1, 0),
(103, 23, 37, 1, 0, 1, 0),
(104, 23, 8, 1, 0, 1, 0),
(105, 23, 4, 1, 0, 1, 0),
(106, 24, 47, 1, 0, 1, 0),
(107, 24, 48, 1, 0, 1, 0),
(108, 24, 49, 1, 0, 1, 0),
(109, 24, 10, 1, 0, 1, 0),
(110, 25, 50, 1, 0, 1, 0),
(111, 25, 7, 1, 0, 1, 0),
(112, 25, 9, 1, 0, 1, 0),
(114, 26, 49, 1, 0, 1, 0),
(117, 26, 43, 1, 0, 1, 0),
(118, 26, 35, 1, 0, 1, 0),
(119, 37, 49, 1, 0, 1, 0),
(120, 37, 29, 1, 0, 1, 0),
(121, 37, 9, 1, 0, 1, 0),
(126, 37, 10, 1, 0, 1, 0),
(127, 27, 49, 1, 0, 1, 0),
(128, 27, 29, 1, 0, 1, 0),
(129, 27, 9, 1, 0, 1, 0),
(133, 27, 10, 1, 0, 1, 0),
(135, 28, 7, 1, 0, 1, 0),
(138, 28, 49, 1, 0, 1, 0),
(139, 28, 10, 1, 0, 1, 0),
(146, 29, 30, 1, 0, 1, 0),
(147, 29, 7, 1, 0, 1, 0),
(148, 29, 9, 1, 0, 1, 0),
(149, 41, 49, 1, 0, 1, 0),
(150, 41, 9, 1, 0, 1, 0),
(151, 41, 29, 1, 0, 1, 0),
(153, 42, 49, 1, 0, 1, 0),
(155, 42, 5, 1, 0, 1, 0),
(156, 42, 46, 1, 0, 1, 0),
(157, 42, 37, 1, 0, 1, 0),
(160, 31, 45, 1, 0, 1, 0),
(161, 31, 29, 1, 0, 1, 0),
(163, 32, 45, 1, 0, 1, 0),
(164, 32, 29, 1, 0, 1, 0),
(166, 33, 45, 1, 0, 1, 0),
(167, 33, 29, 1, 0, 1, 0),
(186, 40, 80, 1, 0, 1, 0),
(187, 40, 81, 1, 0, 1, 0),
(201, 40, 7, 0, 0, 0, 1),
(202, 40, 49, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Structure de la table `association_produit_options`
--

CREATE TABLE IF NOT EXISTS `association_produit_options` (
  `produit_id` int(11) NOT NULL,
  `option_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `association_produit_options`
--

INSERT INTO `association_produit_options` (`produit_id`, `option_id`) VALUES
(40, 1),
(40, 2);

-- --------------------------------------------------------

--
-- Structure de la table `attribut_compte`
--

CREATE TABLE IF NOT EXISTS `attribut_compte` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_form` int(11) NOT NULL,
  `valeur_champ` varchar(255) NOT NULL,
  `defaut` bit(1) NOT NULL,
  `id_compte` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_compte` (`id_compte`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=354 ;

--
-- Contenu de la table `attribut_compte`
--

INSERT INTO `attribut_compte` (`id`, `id_form`, `valeur_champ`, `defaut`, `id_compte`) VALUES
(315, 1, 'male', b'1', 98),
(316, 2, 'Alfa', b'1', 98),
(317, 7, 'alfatest2014@gmail.com', b'1', 98),
(318, 3, 'Dimag', b'1', 98),
(319, 1, 'male', b'1', 99),
(320, 2, 'Damien', b'1', 99),
(321, 3, 'Chesneau', b'1', 99),
(322, 7, 'ches.damien@gmail.com', b'1', 99),
(323, 1, 'male', b'1', 100),
(324, 3, 'hh', b'1', 100),
(325, 2, 'll', b'1', 100),
(326, 6, '0156334589', b'1', 100),
(327, 4, '1980-01-01', b'1', 100),
(328, 7, 'test@live.fr', b'1', 100),
(329, 5, 'Rue General Leclerc 75014 Paris', b'1', 100),
(330, 8, 'C:fakepath2380a8038e1abaae48eb8dc1112e7b0.jpg', b'1', 100),
(331, 2, 'Legdani', b'1', 101),
(332, 3, 'Hamza', b'1', 101),
(333, 2, 'LEGDANI', b'1', 102),
(334, 3, 'Hamza', b'1', 102),
(335, 2, 'Chesneau', b'1', 103),
(336, 3, 'Damien', b'1', 103),
(337, 3, 'Hamza', b'1', 104),
(338, 1, 'female', b'1', 105),
(339, 3, 'Damien', b'1', 105),
(340, 2, 'Chesneau', b'1', 105),
(341, 4, '1992-07-05', b'1', 105),
(342, 5, '1 chemin de la grosse épine 27930 le mesnil fuguet', b'1', 105),
(343, 7, 'contact@damienchesneau.fr', b'1', 105),
(344, 6, '0638735706', b'1', 105),
(345, 8, 'C:fakepathaccueil.bmp', b'1', 105),
(346, 2, '', b'1', 106),
(347, 3, '', b'1', 106),
(348, 2, '', b'1', 107),
(349, 3, '', b'1', 107),
(350, 2, 'undefined', b'1', 108),
(351, 3, 'undefined', b'1', 108),
(352, 2, '', b'1', 109),
(353, 3, '', b'1', 109);

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE IF NOT EXISTS `categorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `priorite` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `categorie`
--

INSERT INTO `categorie` (`id`, `nom`, `priorite`) VALUES
(1, 'Entrées', 1),
(2, 'Plats', 2),
(3, 'Desserts', 3),
(4, 'Boissons', 4);

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE IF NOT EXISTS `commande` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `heurePriseCommande` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_table` int(11) NOT NULL,
  `id_type_commande` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `heurePriseCommandeKE` (`heurePriseCommande`),
  KEY `LienTypeCommande` (`id_type_commande`),
  KEY `LienTables` (`id_table`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Contenu de la table `commande`
--

INSERT INTO `commande` (`id`, `heurePriseCommande`, `id_table`, `id_type_commande`) VALUES
(1, '2014-05-27 11:42:34', 1, 1),
(2, '2014-05-27 11:44:24', 1, 1),
(3, '2014-05-27 12:09:45', 1, 1),
(4, '2014-05-27 12:24:04', 3, 1),
(5, '2014-05-27 13:39:38', 2, 1),
(6, '2014-05-27 13:48:10', 2, 1),
(7, '2014-05-27 13:49:10', 2, 1),
(8, '2014-05-28 11:26:16', 3, 1),
(9, '2014-05-28 11:29:07', 2, 1),
(10, '2014-05-28 12:42:21', 2, 1),
(11, '2014-05-28 13:43:07', 4, 1),
(12, '2014-05-28 14:13:13', 2, 1),
(13, '2014-05-28 14:25:33', 1, 1),
(14, '2014-05-28 14:49:00', 1, 1),
(15, '2014-05-28 14:51:14', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `commande_personne`
--

CREATE TABLE IF NOT EXISTS `commande_personne` (
  `id_commande` int(11) NOT NULL,
  `id_compte` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `have_pay` tinyint(1) NOT NULL,
  `heurePriseCommande` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_commade` (`id_commande`),
  KEY `id_compte` (`id_compte`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=37 ;

--
-- Contenu de la table `commande_personne`
--

INSERT INTO `commande_personne` (`id_commande`, `id_compte`, `id`, `have_pay`, `heurePriseCommande`) VALUES
(1, 2147483647, 1, 0, '2014-05-27 11:42:34'),
(1, 2147483647, 2, 0, '2014-05-27 11:42:34'),
(2, 2147483647, 3, 0, '2014-05-27 11:44:24'),
(2, 2147483647, 4, 0, '2014-05-27 11:44:24'),
(2, 2147483647, 5, 0, '2014-05-27 11:44:24'),
(2, 2147483647, 6, 0, '2014-05-27 11:44:24'),
(4, 2147483647, 7, 0, '2014-05-27 12:24:04'),
(4, 2147483647, 8, 0, '2014-05-27 12:24:04'),
(6, 2147483647, 9, 0, '2014-05-27 13:48:10'),
(6, 2147483647, 10, 0, '2014-05-27 13:48:10'),
(6, 2147483647, 11, 0, '2014-05-27 13:48:10'),
(6, 2147483647, 12, 0, '2014-05-27 13:48:10'),
(6, 2147483647, 13, 0, '2014-05-27 13:48:10'),
(6, 2147483647, 14, 0, '2014-05-27 13:48:10'),
(6, 2147483647, 15, 0, '2014-05-27 13:48:10'),
(7, 2147483647, 16, 0, '2014-05-27 13:49:10'),
(7, 2147483647, 17, 0, '2014-05-27 13:49:10'),
(9, 2147483647, 18, 0, '2014-05-28 11:29:07'),
(9, 2147483647, 19, 0, '2014-05-28 11:29:07'),
(9, 2147483647, 20, 0, '2014-05-28 11:29:07'),
(9, 2147483647, 21, 0, '2014-05-28 11:29:07'),
(10, 2147483647, 22, 0, '2014-05-28 12:42:22'),
(10, 2147483647, 23, 0, '2014-05-28 12:42:22'),
(10, 2147483647, 24, 0, '2014-05-28 12:42:22'),
(10, 2147483647, 25, 0, '2014-05-28 12:42:22'),
(10, 2147483647, 26, 0, '2014-05-28 12:42:22'),
(10, 2147483647, 27, 0, '2014-05-28 12:42:22'),
(10, 2147483647, 28, 0, '2014-05-28 12:42:22'),
(11, 2147483647, 29, 0, '2014-05-28 13:43:07'),
(11, 2147483647, 30, 0, '2014-05-28 13:43:07'),
(11, 2147483647, 31, 0, '2014-05-28 13:43:07'),
(11, 2147483647, 32, 0, '2014-05-28 13:43:07'),
(14, 108, 33, 0, '2014-05-28 14:49:00'),
(14, 108, 34, 0, '2014-05-28 14:49:00'),
(15, 100, 35, 0, '2014-05-28 14:51:15'),
(15, 100, 36, 0, '2014-05-28 14:51:15');

-- --------------------------------------------------------

--
-- Structure de la table `commande_produits`
--

CREATE TABLE IF NOT EXISTS `commande_produits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_commande` int(11) NOT NULL,
  `id_produit` int(11) NOT NULL,
  `heure_envoie` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `priorite` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_commande` (`id_commande`),
  KEY `id_produit` (`id_produit`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=65 ;

--
-- Contenu de la table `commande_produits`
--

INSERT INTO `commande_produits` (`id`, `id_commande`, `id_produit`, `heure_envoie`, `priorite`) VALUES
(1, 1, 14, '0000-00-00 00:00:00', 0),
(2, 1, 14, '0000-00-00 00:00:00', 0),
(3, 1, 24, '0000-00-00 00:00:00', 0),
(4, 1, 25, '0000-00-00 00:00:00', 0),
(5, 1, 26, '0000-00-00 00:00:00', 0),
(6, 1, 37, '0000-00-00 00:00:00', 0),
(7, 2, 14, '0000-00-00 00:00:00', 0),
(8, 2, 14, '0000-00-00 00:00:00', 0),
(9, 2, 24, '0000-00-00 00:00:00', 0),
(10, 2, 24, '0000-00-00 00:00:00', 0),
(11, 2, 25, '0000-00-00 00:00:00', 0),
(12, 3, 24, '0000-00-00 00:00:00', 0),
(13, 4, 14, '0000-00-00 00:00:00', 0),
(14, 4, 14, '0000-00-00 00:00:00', 0),
(15, 4, 14, '0000-00-00 00:00:00', 0),
(16, 5, 14, '0000-00-00 00:00:00', 0),
(17, 5, 24, '0000-00-00 00:00:00', 0),
(18, 5, 25, '0000-00-00 00:00:00', 0),
(19, 5, 26, '0000-00-00 00:00:00', 0),
(20, 6, 24, '0000-00-00 00:00:00', 0),
(21, 6, 24, '0000-00-00 00:00:00', 0),
(22, 6, 14, '0000-00-00 00:00:00', 0),
(23, 6, 14, '0000-00-00 00:00:00', 0),
(24, 7, 14, '0000-00-00 00:00:00', 0),
(25, 7, 14, '0000-00-00 00:00:00', 0),
(26, 7, 24, '0000-00-00 00:00:00', 0),
(27, 7, 24, '0000-00-00 00:00:00', 0),
(28, 7, 25, '0000-00-00 00:00:00', 0),
(29, 8, 14, '0000-00-00 00:00:00', 0),
(30, 8, 14, '0000-00-00 00:00:00', 0),
(31, 8, 14, '0000-00-00 00:00:00', 0),
(32, 8, 14, '0000-00-00 00:00:00', 0),
(33, 8, 24, '0000-00-00 00:00:00', 0),
(34, 8, 24, '0000-00-00 00:00:00', 0),
(35, 9, 14, '0000-00-00 00:00:00', 0),
(36, 9, 14, '0000-00-00 00:00:00', 0),
(37, 9, 24, '0000-00-00 00:00:00', 0),
(38, 9, 24, '0000-00-00 00:00:00', 0),
(39, 9, 25, '0000-00-00 00:00:00', 0),
(40, 9, 25, '0000-00-00 00:00:00', 0),
(41, 10, 14, '0000-00-00 00:00:00', 0),
(42, 10, 14, '0000-00-00 00:00:00', 0),
(43, 10, 14, '0000-00-00 00:00:00', 0),
(44, 10, 24, '0000-00-00 00:00:00', 0),
(45, 10, 24, '0000-00-00 00:00:00', 0),
(46, 10, 24, '0000-00-00 00:00:00', 0),
(47, 10, 25, '0000-00-00 00:00:00', 0),
(48, 11, 14, '0000-00-00 00:00:00', 0),
(49, 11, 14, '0000-00-00 00:00:00', 0),
(50, 11, 14, '0000-00-00 00:00:00', 0),
(51, 11, 37, '0000-00-00 00:00:00', 0),
(52, 11, 26, '0000-00-00 00:00:00', 0),
(53, 12, 14, '0000-00-00 00:00:00', 0),
(54, 12, 14, '0000-00-00 00:00:00', 0),
(55, 12, 24, '0000-00-00 00:00:00', 0),
(56, 12, 24, '0000-00-00 00:00:00', 0),
(57, 13, 14, '0000-00-00 00:00:00', 0),
(58, 13, 14, '0000-00-00 00:00:00', 0),
(59, 13, 24, '0000-00-00 00:00:00', 0),
(60, 13, 24, '0000-00-00 00:00:00', 0),
(61, 14, 14, '0000-00-00 00:00:00', 0),
(62, 14, 24, '0000-00-00 00:00:00', 0),
(63, 15, 14, '0000-00-00 00:00:00', 0),
(64, 15, 24, '0000-00-00 00:00:00', 0);

-- --------------------------------------------------------

--
-- Structure de la table `commande_produits_ingredients`
--

CREATE TABLE IF NOT EXISTS `commande_produits_ingredients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_ingredient` int(11) NOT NULL,
  `added` tinyint(1) NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  `id_commande_produit` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_ingredient` (`id_ingredient`),
  KEY `id_commande_produit` (`id_commande_produit`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `commande_produit_options`
--

CREATE TABLE IF NOT EXISTS `commande_produit_options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_option` int(11) NOT NULL,
  `id_option_value` int(11) NOT NULL,
  `id_commande_produits` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `compte`
--

CREATE TABLE IF NOT EXISTS `compte` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=110 ;

--
-- Contenu de la table `compte`
--

INSERT INTO `compte` (`id`, `password`) VALUES
(98, 'AVFB'),
(99, 'AVFB'),
(100, 'd9e6762dd1c8eaf6d61b3c6192fc408d4d6d5f1176d0c29169bc24e71c3f274ad27fcd5811b313d681f7e55ec02d73d499c95455b6b5bb503acf574fba8ffe85'),
(101, 'Visiteur'),
(102, 'Visiteur'),
(103, 'Visiteur'),
(104, 'Visiteur'),
(105, '9f56e5cd7f291665a8f8b018f701f48bcc2616af1743094ebff7b44dcc1849c6a01cdb42bba9949bce122882403e23bf6e66405d633cb1e9f75794b390041bad'),
(106, 'Visiteur'),
(107, 'Visiteur'),
(108, 'Visiteur'),
(109, 'Visiteur');

-- --------------------------------------------------------

--
-- Structure de la table `conseil`
--

CREATE TABLE IF NOT EXISTS `conseil` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `conseil_produit`
--

CREATE TABLE IF NOT EXISTS `conseil_produit` (
  `Conseil_ID` int(11) NOT NULL,
  `produits_ID` int(11) NOT NULL,
  PRIMARY KEY (`Conseil_ID`,`produits_ID`),
  KEY `FK_CONSEIL_PRODUIT_produits_ID` (`produits_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `entreprise`
--

CREATE TABLE IF NOT EXISTS `entreprise` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `logo` longblob,
  `nom` varchar(255) DEFAULT NULL,
  `telephone` varchar(13) NOT NULL,
  `theme` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `slogan` varchar(100) NOT NULL,
  `message` varchar(55) NOT NULL,
  `langue` tinyint(11) NOT NULL,
  `menus` tinyint(4) NOT NULL,
  `use_comptes` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `entreprise`
--

INSERT INTO `entreprise` (`id`, `logo`, `nom`, `telephone`, `theme`, `adresse`, `slogan`, `message`, `langue`, `menus`, `use_comptes`) VALUES
(5, NULL, 'La pizzéria du coin', '0125479652', 'style.css', '150 boulevard massèna 75013 Paris', 'La Sicile près de chez vous !', 'Pizzeria', 0, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `ingredient`
--

CREATE TABLE IF NOT EXISTS `ingredient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=84 ;

--
-- Contenu de la table `ingredient`
--

INSERT INTO `ingredient` (`id`, `nom`) VALUES
(1, 'Sauce tomate'),
(2, 'Mozzarella'),
(3, 'feuilles de basilic frais'),
(4, 'épices Del Arte'),
(5, 'Crème ricotta aux herbes'),
(6, 'Coppa'),
(7, 'tomates fraîches'),
(8, 'olives noires'),
(9, 'Roquette'),
(10, 'Copeaux de fromage italien'),
(11, 'Ciboulette'),
(12, 'Mariné à l’huile d’olive et basilic'),
(13, 'copeaux de fromage italien'),
(14, 'La vraie crème à l’italienne'),
(15, 'Coulis de framboise'),
(16, 'Sauce crème et miel'),
(17, 'Jambon cru'),
(18, 'fromage de chèvre'),
(19, 'Jambon'),
(20, 'Champignons'),
(21, 'Gorgonzola'),
(22, 'Fromage « Caciotta » aux herbes'),
(23, 'Fromage italien rapé'),
(24, 'Baba au rhum'),
(25, 'Créme fouetté vanillée'),
(26, 'Crème ricotta aux herbes'),
(27, 'Petites noix de Saint-Jacques'),
(28, 'Mélange d’épices citronné'),
(29, 'Bacon'),
(30, 'Artichauts'),
(31, 'Oeuf'),
(32, 'Cocktail de fruits de mer (queues de crevettes décortiquées, chair de moules, écrevisses rouges, tentacules et anneaux de calmar, anneaux d’encornet'),
(33, 'Petites noix de Saint-Jacques'),
(34, 'Persillade'),
(35, 'Citron'),
(36, 'Viande de boeuf'),
(37, 'Oignons rouges'),
(38, 'Crème fraiche'),
(39, 'minis involtini de speck à la ricotta'),
(40, 'Merguez de boeuf et mouton'),
(41, 'Chorizo de boeuf'),
(42, 'Poivrons grillés'),
(43, 'Mélange d’épices citronné'),
(44, 'Crème ricotta aux herbes'),
(45, 'Crème fraîche'),
(46, 'Thon'),
(47, 'Tartines de pain ciabatta aux olives agrémentées de crème ricotta aux herbes'),
(48, 'Mozzarella et fromage de chèvre'),
(49, 'Salade de saison'),
(50, 'Mozzarella di Bufala campana au pur lait de bufflonne'),
(51, 'huile d’olive et basilic'),
(52, 'Mélange de légumes à l’italienne'),
(53, 'Petites noix de Saint-Jacques et queues de crevettes poêlées'),
(54, 'émincés de poulet'),
(55, 'sauce caesars'),
(56, 'mélange d’épices et d’aromates (poivre, ail, coriandre, baies roses, quatre épices, échalote, thym)'),
(57, 'pains Del Arte'),
(58, 'Piadines (rouleaux de fine pâte à pizza garnis de crème ricotta aux herbes, roquette, tomates confites et saumon fumé)'),
(59, 'mozzarella di Bufala'),
(60, 'saumon fumé'),
(61, '4 tartines de pain ciabatta aux olives accompagnées de roquette'),
(62, 'd’une crème ricotta aux herbes et agrémentées de coppa'),
(63, 'saumon fumé gorgonzola et émincé de poulet'),
(64, 'tomates confites'),
(65, 'viande pur boeuf'),
(66, 'Pommes amaretto'),
(67, 'Banane'),
(68, 'crème fraîche et sauce au chocolat'),
(69, 'Glaces stracciatella'),
(70, 'Tartufo et sabayon dans 3 petits choux gourmands'),
(71, 'sauce au chocolat et crème fouettée vanillée'),
(72, 'Sorbet fraise'),
(73, 'glaces spagnola et citron meringuée'),
(75, 'crème fouettée vanillée'),
(76, 'coulis de framboise'),
(80, 'ingredient1'),
(81, 'ingredient2'),
(82, 'sauce roquefort'),
(83, 'sauce au poivre');

-- --------------------------------------------------------

--
-- Structure de la table `langues`
--

CREATE TABLE IF NOT EXISTS `langues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` int(11) NOT NULL,
  `gmt_level` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `label` (`label`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `MAJ_TABLES`
--

CREATE TABLE IF NOT EXISTS `MAJ_TABLES` (
  `nomTable` varchar(50) NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`nomTable`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `MAJ_TABLES`
--

INSERT INTO `MAJ_TABLES` (`nomTable`, `level`) VALUES
('entreprise', 24);

-- --------------------------------------------------------

--
-- Structure de la table `menu`
--

CREATE TABLE IF NOT EXISTS `menu` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOM` varchar(255) DEFAULT NULL,
  `PRIX` float DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `menu`
--

INSERT INTO `menu` (`ID`, `NOM`, `PRIX`) VALUES
(1, 'Menu de la semaine', 15.5),
(2, 'Presto', 22.9),
(3, 'Angelo', 10.7);

-- --------------------------------------------------------

--
-- Structure de la table `menu_produit`
--

CREATE TABLE IF NOT EXISTS `menu_produit` (
  `menu_ID` int(11) NOT NULL,
  `produit_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `menu_produit`
--

INSERT INTO `menu_produit` (`menu_ID`, `produit_ID`) VALUES
(1, 2),
(1, 1),
(1, 24),
(1, 25),
(1, 26),
(1, 30),
(1, 20),
(1, 21),
(1, 36),
(1, 35),
(1, 34),
(1, 38),
(2, 2),
(2, 1),
(2, 24),
(2, 25),
(2, 26),
(2, 30),
(2, 20),
(2, 21),
(2, 36),
(2, 35),
(2, 34),
(2, 38),
(3, 2),
(3, 1),
(3, 24),
(3, 25),
(3, 26),
(3, 30),
(3, 20),
(3, 21),
(3, 36),
(3, 35),
(3, 34),
(3, 38);

-- --------------------------------------------------------

--
-- Structure de la table `mode_de_reglement`
--

CREATE TABLE IF NOT EXISTS `mode_de_reglement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(20) NOT NULL,
  `url` varchar(55) NOT NULL,
  `redirict_url` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nom` (`nom`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `mode_de_reglement`
--

INSERT INTO `mode_de_reglement` (`id`, `nom`, `url`, `redirict_url`) VALUES
(1, 'Master Card', 'MasterCard_logo.png', 'paiment/mastercard.php'),
(2, 'Visa', 'visa_logo.jpg', 'paiment/visa.php'),
(3, 'PayPal', 'paypal_logo.jpg', 'paiment/paypal.php'),
(4, 'Moneo', 'moneo_logo.gif', 'paiment/moneo.php'),
(5, 'Bitcoin', 'bitcoin_logo.png', 'paiment/bitcoin.php');

-- --------------------------------------------------------

--
-- Structure de la table `options`
--

CREATE TABLE IF NOT EXISTS `options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `label` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `options`
--

INSERT INTO `options` (`id`, `nom`, `label`) VALUES
(1, 'Cuisson', 'cuisson :'),
(2, 'Sauce', 'sauce :');

-- --------------------------------------------------------

--
-- Structure de la table `option_possibilite`
--

CREATE TABLE IF NOT EXISTS `option_possibilite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `id_option` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Contenu de la table `option_possibilite`
--

INSERT INTO `option_possibilite` (`id`, `nom`, `id_option`) VALUES
(1, 'Bleu', 1),
(2, 'Saignant', 1),
(3, 'A point', 1),
(4, 'Bien cuit', 1),
(5, 'Sauce au poivre', 2),
(6, 'Sauce roquefort', 2),
(7, 'Sans sauce', 2);

-- --------------------------------------------------------

--
-- Structure de la table `parametre_application`
--

CREATE TABLE IF NOT EXISTS `parametre_application` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom_parametre` varchar(100) NOT NULL,
  `valeur_parametre` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `parametre_application`
--

INSERT INTO `parametre_application` (`id`, `nom_parametre`, `valeur_parametre`) VALUES
(1, 'Facebook', 1),
(2, 'Twitter', 1),
(3, 'Google+', 0);

-- --------------------------------------------------------

--
-- Structure de la table `param_form`
--

CREATE TABLE IF NOT EXISTS `param_form` (
  `id_form` int(10) NOT NULL AUTO_INCREMENT,
  `actif` tinyint(1) NOT NULL,
  `discrim` varchar(32) NOT NULL,
  `label` varchar(32) NOT NULL,
  `id_label_html` varchar(32) NOT NULL,
  `type_html` varchar(16) NOT NULL,
  `class_html` varchar(32) NOT NULL,
  `style_html` text,
  `ordre` smallint(6) NOT NULL,
  `id_html` varchar(32) NOT NULL,
  `file_template_html` varchar(100) NOT NULL,
  PRIMARY KEY (`id_form`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Contenu de la table `param_form`
--

INSERT INTO `param_form` (`id_form`, `actif`, `discrim`, `label`, `id_label_html`, `type_html`, `class_html`, `style_html`, `ordre`, `id_html`, `file_template_html`) VALUES
(1, 1, 'user', 'label.sexe', 'label_sexe_user', 'select', 'sexe_user', NULL, 2, 'sexe_user_id', 'selectHtml.html'),
(2, 1, 'user', 'label.nom', 'label_nom_user', 'text', 'nom_user', NULL, 4, 'nom_user_id', 'inputTypeText.html'),
(3, 1, 'user', 'label.prenom', 'label_prenom_user', 'text', 'prenom_user', NULL, 3, 'prenom_user_id', 'inputTypeText.html'),
(4, 1, 'user', 'label.dateNaissance', 'label_datenaissance_user', 'date', 'datenaissance_user', NULL, 5, 'datenaissance_user_id', 'inputTypeDate.html'),
(5, 1, 'user', 'label.adresse', 'label_adresse_user', 'textarea', 'adresse_user', NULL, 8, 'adresse_user_id', 'textAreaHtml.html'),
(6, 1, 'user', 'label.tel', 'label_tel_user', 'tel', 'tel_user', NULL, 9, 'tel_user_id', 'inputTypeTel.html'),
(7, 1, 'user', 'label.email', 'label_email_user', 'email', 'email_user', NULL, 6, 'email_user_id', 'inputTypeEmail.html'),
(8, 1, 'user', 'label.photo', 'label_photo_user', 'img', 'photo_user', NULL, 1, 'photo_user_id', 'inputTypeFile.html'),
(9, 1, 'user', 'label.password', 'label_password_user', 'password', 'password_user', NULL, 7, 'password_user_id', 'inputTypePassword.html');

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE IF NOT EXISTS `produit` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOM` varchar(255) DEFAULT NULL,
  `PRIX` float DEFAULT NULL,
  `CATEGORIE_ID` int(11) DEFAULT NULL,
  `sousCategorie` int(11) NOT NULL,
  `options` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_PRODUIT_CATEGORIE_ID` (`CATEGORIE_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=43 ;

--
-- Contenu de la table `produit`
--

INSERT INTO `produit` (`ID`, `NOM`, `PRIX`, `CATEGORIE_ID`, `sousCategorie`, `options`) VALUES
(1, 'Margarita', 15.4, 2, 4, 0),
(2, 'Italia', 13.6, 2, 4, 0),
(6, 'Chèvre et miel', 13.9, 2, 4, 0),
(7, 'Regina', 16.5, 2, 4, 0),
(8, '4 Formaggi', 15.6, 2, 4, 0),
(11, 'Heineken Pression', 3.2, 4, 8, 0),
(12, 'Affligem', 3.2, 4, 8, 0),
(13, 'Martini Prosecco', 3, 4, 9, 0),
(14, 'Salade roquette et copeaux de fromage italien', 6.3, 1, 1, 0),
(15, 'Terra e Mare (NUOVO)', 15.2, 2, 4, 0),
(16, 'Prosciutto', 14.2, 2, 4, 0),
(17, 'Frutti di Mare (NUOVO)', 12.2, 2, 4, 0),
(18, 'Con Carne', 12.2, 2, 4, 0),
(19, 'Speciale Pizzaiolo', 13.4, 2, 4, 0),
(20, 'Del Arte', 15.2, 2, 4, 0),
(21, 'Marocco', 15.82, 2, 4, 0),
(22, 'Salmone', 11.9, 2, 4, 0),
(23, 'Carbonara', 9.8, 2, 4, 0),
(24, 'Chèvre chaud à l’italienne', 6.4, 1, 2, 0),
(25, 'Tomates Mozzarella di Bufala', 6.8, 1, 2, 0),
(26, 'Piccolina Marina (NUOVO)', 5.8, 1, 2, 0),
(27, 'Insalata Caesar', 15.9, 2, 3, 0),
(28, 'Grande assiette de cicchetti', 6, 2, 3, 0),
(29, 'Piadines Salmone', 6, 2, 3, 0),
(30, 'Spaghetti alla bolognese', 5.3, 2, 5, 0),
(31, 'Tagliatelle alla carbonara', 5.3, 2, 5, 0),
(33, 'Pizza aux framboises', 8.7, 3, 7, 0),
(34, 'Coupe glacée 2 ou 3 parfums', 5.9, 3, 6, 0),
(35, 'Délice glacé aux fruits rouges', 4.2, 3, 6, 0),
(36, 'fruits rouges glacé', 4.2, 3, 6, 0),
(37, 'Piccolina Caesar', 5.8, 1, 2, 0),
(38, 'Profiteroles italiennes', 4.2, 3, 6, 0),
(40, 'Steack', 3, 2, 10, 1),
(41, 'Insalata Generosa (NUOVO)', 8.5, 2, 3, 0),
(42, 'Insalata Vesuvio', 5.3, 2, 3, 0);

-- --------------------------------------------------------

--
-- Structure de la table `souscategorie`
--

CREATE TABLE IF NOT EXISTS `souscategorie` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOM` varchar(255) DEFAULT NULL,
  `categorie_id` int(11) DEFAULT NULL,
  `priorite` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_SOUSCATEGORIE_CATEGORIE_ID` (`categorie_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Contenu de la table `souscategorie`
--

INSERT INTO `souscategorie` (`ID`, `NOM`, `categorie_id`, `priorite`) VALUES
(1, 'Salades', 1, 1),
(2, 'Antipasti', 1, 2),
(3, 'Spécialités', 2, 1),
(4, 'Pizzas', 2, 2),
(5, 'Pâtes', 2, 3),
(6, 'Glaces', 3, 1),
(7, 'Pizzas sucrées', 3, 2),
(8, 'Bières', 4, 1),
(9, 'Sodas', 4, 3),
(10, 'Viandes', 2, 4),
(11, 'Vins', 4, 2);

-- --------------------------------------------------------

--
-- Structure de la table `strings`
--

CREATE TABLE IF NOT EXISTS `strings` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lang` varchar(8) NOT NULL,
  `value` text NOT NULL,
  `key_lang` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Contenu de la table `strings`
--

INSERT INTO `strings` (`id`, `lang`, `value`, `key_lang`) VALUES
(1, 'fr_FR', 'Sexe', 'label.sexe'),
(2, 'fr_FR', 'Nom', 'label.nom'),
(3, 'fr_FR', 'Prenom', 'label.prenom'),
(4, 'fr_FR', 'Date de naissance', 'label.dateNaissance'),
(5, 'fr_FR', 'Adresse', 'label.adresse'),
(6, 'fr_FR', 'Téléphone', 'label.tel'),
(7, 'fr_FR', 'Email', 'label.email'),
(8, 'fr_FR', 'Photo', 'label.photo'),
(9, 'fr_FR', 'Sur place', 'typecommande.surplace'),
(10, 'fr_FR', 'A emporter', 'typecommande.aemporter'),
(11, 'fr_FR', 'Livraison', 'typecommande.livraison'),
(12, 'fr_FR', 'Réservation', 'typecommande.reservation');

-- --------------------------------------------------------

--
-- Structure de la table `tables`
--

CREATE TABLE IF NOT EXISTS `tables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Contenu de la table `tables`
--

INSERT INTO `tables` (`id`, `numero`) VALUES
(1, '10'),
(2, '11'),
(3, '12'),
(4, '13'),
(5, '14'),
(6, '15'),
(7, '16'),
(8, '17'),
(9, '18'),
(10, '19'),
(11, '21'),
(12, '22'),
(13, '23');

-- --------------------------------------------------------

--
-- Structure de la table `type_commandes`
--

CREATE TABLE IF NOT EXISTS `type_commandes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(150) NOT NULL,
  `actif` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `type_commandes`
--

INSERT INTO `type_commandes` (`id`, `label`, `actif`) VALUES
(1, 'typecommande.surplace', 1),
(2, 'typecommande.aemporter', 1),
(3, 'typecommande.livraison', 1),
(4, 'typecommande.reservation', 1);

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `attribut_compte`
--
ALTER TABLE `attribut_compte`
  ADD CONSTRAINT `attribut_compte_ibfk_3` FOREIGN KEY (`id_compte`) REFERENCES `compte` (`id`),
  ADD CONSTRAINT `attribut_compte_ibfk_4` FOREIGN KEY (`id_compte`) REFERENCES `compte` (`id`),
  ADD CONSTRAINT `attribut_compte_ibfk_1` FOREIGN KEY (`id_compte`) REFERENCES `compte` (`id`),
  ADD CONSTRAINT `attribut_compte_ibfk_2` FOREIGN KEY (`id_compte`) REFERENCES `compte` (`id`);

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `commande_ibfk_4` FOREIGN KEY (`id_table`) REFERENCES `tables` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `commande_ibfk_5` FOREIGN KEY (`id_type_commande`) REFERENCES `type_commandes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `commande_ibfk_2` FOREIGN KEY (`id_table`) REFERENCES `tables` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `commande_ibfk_3` FOREIGN KEY (`id_type_commande`) REFERENCES `type_commandes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `conseil_produit`
--
ALTER TABLE `conseil_produit`
  ADD CONSTRAINT `conseil_produit_ibfk_1` FOREIGN KEY (`Conseil_ID`) REFERENCES `conseil` (`ID`),
  ADD CONSTRAINT `conseil_produit_ibfk_2` FOREIGN KEY (`produits_ID`) REFERENCES `produit` (`ID`),
  ADD CONSTRAINT `FK_CONSEIL_PRODUIT_Conseil_ID` FOREIGN KEY (`Conseil_ID`) REFERENCES `conseil` (`ID`),
  ADD CONSTRAINT `FK_CONSEIL_PRODUIT_produits_ID` FOREIGN KEY (`produits_ID`) REFERENCES `produit` (`ID`);

--
-- Contraintes pour la table `produit`
--
ALTER TABLE `produit`
  ADD CONSTRAINT `produit_ibfk_1` FOREIGN KEY (`CATEGORIE_ID`) REFERENCES `souscategorie` (`ID`),
  ADD CONSTRAINT `FK_PRODUIT_CATEGORIE_ID` FOREIGN KEY (`CATEGORIE_ID`) REFERENCES `souscategorie` (`ID`);

--
-- Contraintes pour la table `souscategorie`
--
ALTER TABLE `souscategorie`
  ADD CONSTRAINT `souscategorie_ibfk_1` FOREIGN KEY (`categorie_id`) REFERENCES `categorie` (`id`),
  ADD CONSTRAINT `FK_SOUSCATEGORIE_CATEGORIE_ID` FOREIGN KEY (`categorie_id`) REFERENCES `categorie` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
