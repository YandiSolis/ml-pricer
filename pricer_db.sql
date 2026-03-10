-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-03-2026 a las 20:40:52
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pricer_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_precios`
--

CREATE TABLE `historial_precios` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial_precios`
--

INSERT INTO `historial_precios` (`id`, `producto_id`, `precio`, `fecha_registro`) VALUES
(29, 7, 15399.00, '2026-02-27 05:44:28'),
(31, 7, 15399.00, '2026-02-27 05:49:15'),
(42, 7, 16599.00, '2026-03-02 13:17:54'),
(47, 7, 16599.00, '2026-03-02 13:34:53'),
(52, 7, 16599.00, '2026-03-02 13:54:31'),
(57, 7, 16199.00, '2026-03-03 01:44:44'),
(58, 8, 10790.00, '2026-03-03 13:25:57'),
(60, 8, 10790.00, '2026-03-03 13:26:06'),
(61, 8, 10790.00, '2026-03-03 13:26:08'),
(62, 8, 10790.00, '2026-03-03 13:26:09'),
(67, 7, 16199.00, '2026-03-03 13:35:14'),
(68, 8, 10790.00, '2026-03-03 13:35:15'),
(69, 9, 696.00, '2026-03-03 13:37:19'),
(70, 10, 1141.00, '2026-03-03 13:37:37'),
(71, 7, 16199.00, '2026-03-04 04:26:17'),
(72, 8, 10790.00, '2026-03-04 04:26:18'),
(73, 9, 696.00, '2026-03-04 04:26:18'),
(74, 10, 1156.00, '2026-03-04 04:26:19'),
(75, 7, 16199.00, '2026-03-04 04:41:19'),
(76, 8, 10790.00, '2026-03-04 04:41:20'),
(77, 9, 696.00, '2026-03-04 04:41:21'),
(78, 10, 1156.00, '2026-03-04 04:41:22'),
(79, 7, 16199.00, '2026-03-04 04:56:17'),
(80, 8, 10790.00, '2026-03-04 04:56:18'),
(81, 9, 696.00, '2026-03-04 04:56:19'),
(82, 10, 1156.00, '2026-03-04 04:56:19'),
(83, 7, 16599.00, '2026-03-04 13:21:54'),
(84, 8, 10790.00, '2026-03-04 13:21:54'),
(85, 9, 696.00, '2026-03-04 13:21:55'),
(86, 10, 1190.00, '2026-03-04 13:21:55'),
(87, 7, 16599.00, '2026-03-04 13:36:54'),
(88, 8, 10790.00, '2026-03-04 13:36:54'),
(89, 9, 696.00, '2026-03-04 13:36:55'),
(90, 10, 1190.00, '2026-03-04 13:36:56'),
(91, 7, 16599.00, '2026-03-04 13:51:54'),
(92, 8, 10790.00, '2026-03-04 13:51:55'),
(93, 9, 696.00, '2026-03-04 13:52:05'),
(94, 10, 1190.00, '2026-03-04 13:52:05'),
(95, 7, 16599.00, '2026-03-04 14:06:55'),
(96, 8, 10790.00, '2026-03-04 14:06:56'),
(97, 9, 696.00, '2026-03-04 14:06:57'),
(98, 10, 1190.00, '2026-03-04 14:06:58'),
(99, 11, 29849.00, '2026-03-04 18:31:19'),
(100, 7, 16599.00, '2026-03-04 18:31:52'),
(101, 8, 10790.00, '2026-03-04 18:31:53'),
(102, 9, 696.00, '2026-03-04 18:31:53'),
(103, 10, 1190.00, '2026-03-04 18:31:54'),
(104, 11, 22849.00, '2026-03-04 18:31:55'),
(105, 7, 16599.00, '2026-03-04 18:36:45'),
(106, 8, 10790.00, '2026-03-04 18:36:46'),
(107, 9, 696.00, '2026-03-04 18:36:47'),
(108, 10, 1190.00, '2026-03-04 18:36:47'),
(109, 11, 22849.00, '2026-03-04 18:36:48'),
(110, 7, 16599.00, '2026-03-04 18:49:08'),
(111, 8, 10790.00, '2026-03-04 18:49:08'),
(112, 9, 696.00, '2026-03-04 18:49:09'),
(113, 10, 1190.00, '2026-03-04 18:49:10'),
(114, 11, 19273.00, '2026-03-04 18:49:11'),
(115, 7, 16599.00, '2026-03-04 18:51:45'),
(116, 8, 10790.00, '2026-03-04 18:51:46'),
(117, 9, 696.00, '2026-03-04 18:51:46'),
(118, 10, 1190.00, '2026-03-04 18:51:47'),
(119, 11, 19273.00, '2026-03-04 18:51:48'),
(120, 7, 16599.00, '2026-03-04 19:22:13'),
(121, 8, 10790.00, '2026-03-04 19:22:14'),
(122, 9, 696.00, '2026-03-04 19:22:14'),
(123, 10, 1190.00, '2026-03-04 19:22:16'),
(124, 11, 14212.00, '2026-03-04 19:22:17'),
(125, 7, 16599.00, '2026-03-04 19:37:23'),
(126, 8, 10790.00, '2026-03-04 19:37:24'),
(127, 9, 696.00, '2026-03-04 19:37:25'),
(128, 10, 1190.00, '2026-03-04 19:37:25'),
(129, 11, 14212.00, '2026-03-04 19:37:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `precio_actual` decimal(10,2) DEFAULT NULL,
  `url_mercadolibre` text DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `imagen_url` text DEFAULT NULL,
  `vendedor` varchar(255) DEFAULT NULL,
  `precio_inicial` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `usuario_id`, `nombre`, `precio_actual`, `url_mercadolibre`, `fecha_registro`, `imagen_url`, `vendedor`, `precio_inicial`) VALUES
(7, 1, 'Laptop Gamer Hp Victus 15.6\'\' Amd Ryzen 7 7445hs 16gb Ram 512 Ssd Nvidia GeForce RTX 4050', 16599.00, 'https://www.mercadolibre.com.mx/laptop-gamer-hp-victus-156-amd-ryzen-7-7445hs-16gb-ram-512-ssd-nvidia-geforce-rtx-4050/p/MLM53049202#polycard_client=search-desktop&search_layout=grid&position=18&type=product&tracking_id=cc4571f9-d2c1-4850-881c-63d9d8b6b3fb&wid=MLM2443526569&sid=search', '2026-02-27 05:44:28', 'https://http2.mlstatic.com/D_NQ_NP_902015-MLA99986838999_112025-O.webp', 'Tienda Oficial', 15399.00),
(8, 1, 'Consola Ps5 1 Tb: Astro Bot Y Gran Turismo 7 Blanco', 10790.00, 'https://www.mercadolibre.com.mx/consola-ps5-1-tb-astro-bot-y-gran-turismo-7-blanco/p/MLM59802463#polycard_client=recommendations_home_navigation-trend-recommendations&reco_backend=machinalis-homes-univb&wid=MLM4321296196&reco_client=home_navigation-trend-recommendations&reco_item_pos=0&reco_backend_type=function&reco_id=6a6a4abc-ec8d-4593-98d3-85a0d85062b2&sid=recos&c_id=/home/navigation-trend-recommendations/element&c_uid=8d0dac76-2405-4363-9cc6-2903ad3cb058', '2026-03-03 13:25:57', 'https://http2.mlstatic.com/D_NQ_NP_688800-MLA94378047872_102025-O.webp', 'Tienda Oficial', 10790.00),
(9, 1, 'Monteratillo® Juego De Cuchillos profesionales Organizador Para Cocina 19 Piezas Con Base De Madera Gris Color Juego De Cuchillos De Cocina Acero Inoxidable set de cuchillos,set cuchillos cocina', 696.00, 'https://www.mercadolibre.com.mx/monteratillo-juego-de-cuchillos-profesionales-organizador-para-cocina-19-piezas-con-base-de-madera-gris-color-juego-de-cuchillos-de-cocina-acero-inoxidable-set-de-cuchillosset-cuchillos-cocina/p/MLM44961967#polycard_client=recommendations_home_second-crosselling-function-recommendations&reco_backend=second_crosselling_function&wid=MLM2209696883&reco_client=home_second-crosselling-function-recommendations&reco_item_pos=3&reco_backend_type=function&reco_id=5aa87923-4246-410d-b3fe-d31252c25ee8&sid=recos&c_id=/home/second-crosselling-function-recommendations/element&c_uid=8564396f-d277-43fc-a492-29efbbfdb61d', '2026-03-03 13:37:19', 'https://http2.mlstatic.com/D_NQ_NP_882764-MLA104705422757_012026-O.webp', 'Tienda Oficial', 696.00),
(10, 1, 'Ventilador De Torre Weluvfit Con Control Remoto 5 Velocidad Temporizador de 12 Horas Gris Plata Color Ventiladores Torre Para Dormitorio, Cocina, Oficina', 1190.00, 'https://www.mercadolibre.com.mx/ventilador-de-torre-weluvfit-con-control-remoto-5-velocidad-temporizador-de-12-horas-gris-plata-color-ventiladores-torre-para-dormitorio-cocina-oficina/p/MLM45404628#polycard_client=recommendations_home_trend-function-recommendations&reco_backend=trend_function&wid=MLM2625035649&reco_client=home_trend-function-recommendations&reco_item_pos=1&reco_backend_type=function&reco_id=43e9a1ba-bc87-4581-bd75-a0662e5e5f7b&sid=recos&c_id=/home/trend-recommendations/element&c_uid=01d8b831-0019-46ae-b69a-d1053bfdd889', '2026-03-03 13:37:37', 'https://http2.mlstatic.com/D_NQ_NP_700230-MLA100988264170_122025-O.webp', 'Tienda Oficial', 1141.00),
(11, 1, 'Pluma Bic P/fino Cristal Azul C/12 (Usado)', 14212.00, 'https://articulo.mercadolibre.com.mx/MLM-2720564463-pluma-bic-pfino-cristal-azul-c12-_JM', '2026-03-04 18:31:19', 'https://http2.mlstatic.com/D_NQ_NP_654942-MLA106199976623_012026-O-pluma-bic-pfino-cristal-azul-c12.webp', 'Tienda Oficial', 29849.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sistema_logs`
--

CREATE TABLE `sistema_logs` (
  `id` int(11) NOT NULL,
  `evento` varchar(255) DEFAULT NULL,
  `detalles` text DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sistema_logs`
--

INSERT INTO `sistema_logs` (`id`, `evento`, `detalles`, `fecha`) VALUES
(1, 'Manual', 'Jonathan actualizó.', '2026-03-04 19:22:17'),
(2, 'Manual', 'Jonathan actualizó.', '2026-03-04 19:37:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `rol` varchar(20) DEFAULT 'usuario',
  `suspendido` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `password`, `fecha_registro`, `rol`, `suspendido`) VALUES
(1, '2230189@upv.edu.mx', '$2b$10$ZOHZlrYu.8T4ErIDJQ0rhOsAsQ0/TU7BYmzVJ9251rOo2GXPpafFe', '2026-02-26 19:00:47', 'usuario', 0),
(2, 'admin1@upv.edu.mx', '$2b$10$T44Xs98EpKLKp5wx4/1CdeLy/AASR39D52Bo0XXfInn4hoSMH9q.O', '2026-03-04 19:28:06', 'admin', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `historial_precios`
--
ALTER TABLE `historial_precios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `sistema_logs`
--
ALTER TABLE `sistema_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `historial_precios`
--
ALTER TABLE `historial_precios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `sistema_logs`
--
ALTER TABLE `sistema_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial_precios`
--
ALTER TABLE `historial_precios`
  ADD CONSTRAINT `historial_precios_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
