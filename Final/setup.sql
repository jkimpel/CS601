
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

INSERT INTO `Meeting` (`id`, `Name`, `Time`, `Day`, `Address`, `Zip`, `IsOpen`, `Latitude`, `Longitude`) VALUES 
('1', 'Who\'s An Addict', '10:30:00', '6', '299 Broadway', '2474', '1', '42.41427', '-71.15015'),
('2', 'Nightmare On Elm Street', '06:00:00', '2', 'Elm', '2144', '1', '42.39383', '-71.12088'),
('3', 'Test', '01:30:00', '4', 'Blarb', '11111', '0', '42.39747', '-71.11816'),
('4', 'Never Alone Group', '06:00:00', '3', '11 Garden St.', '2138', '1', '42.375874', '-71.12074'),
('5', 'Unknown', '06:00:00', '1', '115 Mill St.', '2478', '1', '42.394313', '-71.191321'),
('6', 'Foo', '07:00:00', '0', '1 Main St.', '2119', '0', '42', '-71');