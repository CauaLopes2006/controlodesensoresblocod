-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 16-Jan-2026 às 09:51
-- Versão do servidor: 8.4.7
-- versão do PHP: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de dados: `sensores`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `humidade`
--

DROP TABLE IF EXISTS `humidade`;
CREATE TABLE IF NOT EXISTS `humidade` (
  `id_humidade` int NOT NULL,
  `humi_min` int NOT NULL,
  `humi_max` int NOT NULL,
  `humi_atual` int NOT NULL,
  PRIMARY KEY (`id_humidade`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `temperatura`
--

DROP TABLE IF EXISTS `temperatura`;
CREATE TABLE IF NOT EXISTS `temperatura` (
  `id_temperatura` int NOT NULL,
  `temp_min` decimal(2,1) NOT NULL,
  `temp_max` decimal(2,1) NOT NULL,
  `data_inicial` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_temperatura`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
