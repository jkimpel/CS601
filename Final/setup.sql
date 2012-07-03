CREATE TABLE `Meeting` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(127) DEFAULT NULL,
  `Time` time DEFAULT NULL,
  `Day` int(11) DEFAULT NULL,
  `Address` varchar(127) DEFAULT NULL,
  `Zip` int(11) DEFAULT NULL,
  `IsOpen` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

INSERT INTO `Meeting` (`id`, `Name`, `Time`, `Day`, `Address`, `Zip`, `IsOpen`)
VALUES
	(1, 'Who\'s An Addict', '10:30:00', 6, '299 Broadway', 2474, 1);
INSERT INTO `Meeting` (`id`, `Name`, `Time`, `Day`, `Address`, `Zip`, `IsOpen`)
VALUES
	(2, 'Nightmare On Elm Street', '06:00:00', 2, 'Elm', 2144, 1);
INSERT INTO `Meeting` (`id`, `Name`, `Time`, `Day`, `Address`, `Zip`, `IsOpen`)
VALUES
	(3, 'Test', '01:30:00', 4, 'Blarb', 11111, 0);
INSERT INTO `Meeting` (`id`, `Name`, `Time`, `Day`, `Address`, `Zip`, `IsOpen`)
VALUES
	(4, 'Never Alone Group', '06:00:00', 3, '11 Garden St.', 2138, 1);
