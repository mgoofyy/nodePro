-- MySQL dump 10.13  Distrib 5.6.16, for osx10.6 (x86_64)
--
-- Host: localhost    Database: oneWord
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.10-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `ow_profile_userid` int(20) NOT NULL AUTO_INCREMENT,
  `ow_profile_nickname` varchar(12) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ow_profile_place` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `ow_profile_sex` int(1) DEFAULT '2',
  `ow_profile_age` int(3) DEFAULT '1',
  `ow_profile_signature` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `ow_profile_phone` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `ow_profile_userType` int(1) DEFAULT '0',
  `ow_profile_lock` int(1) DEFAULT '0',
  `ow_profile_password` varchar(64) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ow_profile_userid`)
) ENGINE=InnoDB AUTO_INCREMENT=10014 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_sign_info`
--

DROP TABLE IF EXISTS `user_sign_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_sign_info` (
  `ow_profile_userid` int(20) NOT NULL,
  `ow_account_from` int(1) DEFAULT '0',
  `ow_account_last_login` int(20) DEFAULT NULL,
  `ow_account_signup_time` int(20) DEFAULT NULL,
  `ow_account_online_time` int(20) DEFAULT '0',
  `ow_account_devices` varchar(20) DEFAULT NULL,
  `ow_account_device_type` int(1) DEFAULT NULL,
  PRIMARY KEY (`ow_profile_userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-06 17:36:31
