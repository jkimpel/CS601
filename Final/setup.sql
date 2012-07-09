
CREATE TABLE `Meeting` (
   `id` int(11) unsigned not null auto_increment,
   `Name` varchar(127),
   `Time` time,
   `Day` int(11),
   `Address` varchar(127),
   `Zip` int(11),
   `IsOpen` tinyint(1),
   `Latitude` double,
   `Longitude` double,
   PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=7;

INSERT INTO `Meeting` (`id`, `Name`, `Time`, `Day`, `Address`, `Zip`, `IsOpen`, `Latitude`, `Longitude`)
VALUES
	(1, 'Who\'s An Addict', '10:30:00', 6, '299 Broadway', 2474, 1, 42.41427, -71.15015),
	(2, 'Nightmare On Elm Street', '18:00:00', 2, 'Russell and Elm', 2144, 1, 42.39383, -71.12088),
	(3, 'Sharing In The Square', '18:30:00', 1, '5 Magazine St.', 2139, 1, 42.36514, -71.104975),
	(4, 'Never Alone Group', '18:00:00', 3, '11 Garden St.', 2138, 1, 42.375874, -71.12074),
	(5, 'Passages', '18:00:00', 1, '115 Mill St.', 2478, 1, 42.394313, -71.191321),
	(6, 'Recovery At High Noon', '12:00:00', 1, '5 Callendar St', 2139, 1, 42.365663, -71.111283),
	(7, 'Why It Works', '18:30:00', 0, '1493 Cambridge St', 2139, 1, 42.374826, -71.104181),
	(8, 'Men Will Be Men', '11:30:00', 0, '7 Temple St', 2139, 1, 42.366884, -71.104159),
	(9, 'Neon 12 Step Group', '10:00:00', 0, '330 Mt. Auburn St', 2138, 0, 42.374778, -71.133728),
	(10, 'Together We Can', '19:00:00', 2, '1555 Massachusetts Ave.', 2138, 0, 42.37825, -71.119673),
	(11, 'Recovery At High Noon', '12:00:00', 2, '5 Callendar St', 2139, 1, 42.365663, -71.111283),
	(12, 'Recovery At High Noon', '12:00:00', 3, '5 Callendar St', 2139, 1, 42.365663, -71.111283),
	(13, 'Recovery At High Noon', '12:00:00', 4, '5 Callendar St', 2139, 1, 42.365663, -71.111283),
	(14, 'Recovery At High Noon', '12:00:00', 5, '5 Callendar St', 2139, 1, 42.365663, -71.111283),
	(15, 'Express Yourself', '19:30:00', 4, '1555 Massachusetts Ave', 2138, 1, 42.37825, -71.119673),
	(16, 'Ladies Let\'s Talk About It', '18:30:00', 4, '46 Pleasant St', 2139, 0, 42.364062, -71.108515),
	(17, 'You\'re Not Alone', '19:00:00', 5, '5 Magazine St', 2139, 1, 42.36514, -71.104975),
	(18, 'Easy Does It', '12:00:00', 6, '7 Temple St', 2139, 1, 42.366884, -71.104159);
