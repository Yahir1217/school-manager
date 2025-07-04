-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-07-2025 a las 03:49:09
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `school_manager`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Antecedentes`
--

CREATE TABLE `Antecedentes` (
  `Id` int(11) NOT NULL,
  `AlumnoId` int(11) NOT NULL,
  `InstitutoOrigenId` int(11) NOT NULL,
  `Nivel` longtext NOT NULL,
  `Observaciones` longtext NOT NULL,
  `Logros` longtext NOT NULL,
  `Reportes` longtext NOT NULL,
  `FechaInicio` datetime(6) DEFAULT NULL,
  `FechaFin` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Avances`
--

CREATE TABLE `Avances` (
  `Id` int(11) NOT NULL,
  `AlumnoId` int(11) NOT NULL,
  `GradoActualId` int(11) NOT NULL,
  `GrupoActualId` int(11) NOT NULL,
  `Status` longtext NOT NULL,
  `FechaCambio` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Calificaciones`
--

CREATE TABLE `Calificaciones` (
  `Id` int(11) NOT NULL,
  `AlumnoId` int(11) NOT NULL,
  `MateriaId` int(11) NOT NULL,
  `GrupoId` int(11) NOT NULL,
  `Periodo` longtext NOT NULL,
  `Valor` decimal(65,30) DEFAULT NULL,
  `Reprobado` tinyint(1) NOT NULL,
  `Nivelacion` decimal(65,30) DEFAULT NULL,
  `AproboPeriodo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Documentos`
--

CREATE TABLE `Documentos` (
  `Id` int(11) NOT NULL,
  `AlumnoId` int(11) NOT NULL,
  `Nombre` longtext NOT NULL,
  `Url` longtext NOT NULL,
  `Tipo` longtext NOT NULL,
  `FechaSubida` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Grados`
--

CREATE TABLE `Grados` (
  `Id` int(11) NOT NULL,
  `Nombre` longtext NOT NULL,
  `Nivel` longtext NOT NULL,
  `TipoPeriodo` longtext NOT NULL,
  `Orden` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Grupos`
--

CREATE TABLE `Grupos` (
  `Id` int(11) NOT NULL,
  `Nombre` longtext NOT NULL,
  `CicloEscolar` longtext NOT NULL,
  `GradoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Horarios`
--

CREATE TABLE `Horarios` (
  `Id` int(11) NOT NULL,
  `GrupoId` int(11) NOT NULL,
  `MateriaId` int(11) NOT NULL,
  `DocenteId` int(11) NOT NULL,
  `DiaSemana` longtext NOT NULL,
  `HoraInicio` time(6) DEFAULT NULL,
  `HoraFin` time(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Institutos`
--

CREATE TABLE `Institutos` (
  `Id` int(11) NOT NULL,
  `Nombre` longtext NOT NULL,
  `Clave` longtext NOT NULL,
  `Direccion` longtext NOT NULL,
  `Telefono` longtext NOT NULL,
  `LogoUrl` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `LogrosReportes`
--

CREATE TABLE `LogrosReportes` (
  `Id` int(11) NOT NULL,
  `AlumnoId` int(11) NOT NULL,
  `InstitutoId` int(11) NOT NULL,
  `Tipo` longtext NOT NULL,
  `Descripcion` longtext NOT NULL,
  `Fecha` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Materias`
--

CREATE TABLE `Materias` (
  `Id` int(11) NOT NULL,
  `Nombre` longtext NOT NULL,
  `Clave` longtext DEFAULT NULL,
  `Creditos` int(11) DEFAULT NULL,
  `Tipo` longtext NOT NULL,
  `GradoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Notificaciones`
--

CREATE TABLE `Notificaciones` (
  `Id` int(11) NOT NULL,
  `UsuarioId` int(11) NOT NULL,
  `Titulo` longtext NOT NULL,
  `Mensaje` longtext NOT NULL,
  `Leido` tinyint(1) NOT NULL,
  `FechaEnvio` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--

CREATE TABLE `Usuarios` (
  `Id` int(11) NOT NULL,
  `NombreCompleto` longtext NOT NULL,
  `Correo` longtext NOT NULL,
  `Password` longtext NOT NULL,
  `Telefono` longtext DEFAULT NULL,
  `Rol` varchar(50) NOT NULL,
  `Estado` tinyint(1) NOT NULL,
  `Matricula` longtext DEFAULT NULL,
  `VerificarCorreo` datetime(6) DEFAULT NULL,
  `CodigoVerificacion` longtext DEFAULT NULL,
  `InstitutoId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `__EFMigrationsHistory`
--

CREATE TABLE `__EFMigrationsHistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `__EFMigrationsHistory`
--

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`) VALUES
('20250701022012_InitialCreate', '8.0.13');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Antecedentes`
--
ALTER TABLE `Antecedentes`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Antecedentes_AlumnoId` (`AlumnoId`),
  ADD KEY `IX_Antecedentes_InstitutoOrigenId` (`InstitutoOrigenId`);

--
-- Indices de la tabla `Avances`
--
ALTER TABLE `Avances`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Avances_AlumnoId` (`AlumnoId`),
  ADD KEY `IX_Avances_GradoActualId` (`GradoActualId`),
  ADD KEY `IX_Avances_GrupoActualId` (`GrupoActualId`);

--
-- Indices de la tabla `Calificaciones`
--
ALTER TABLE `Calificaciones`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Calificaciones_AlumnoId` (`AlumnoId`),
  ADD KEY `IX_Calificaciones_GrupoId` (`GrupoId`),
  ADD KEY `IX_Calificaciones_MateriaId` (`MateriaId`);

--
-- Indices de la tabla `Documentos`
--
ALTER TABLE `Documentos`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Documentos_AlumnoId` (`AlumnoId`);

--
-- Indices de la tabla `Grados`
--
ALTER TABLE `Grados`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `Grupos`
--
ALTER TABLE `Grupos`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Grupos_GradoId` (`GradoId`);

--
-- Indices de la tabla `Horarios`
--
ALTER TABLE `Horarios`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Horarios_DocenteId` (`DocenteId`),
  ADD KEY `IX_Horarios_GrupoId` (`GrupoId`),
  ADD KEY `IX_Horarios_MateriaId` (`MateriaId`);

--
-- Indices de la tabla `Institutos`
--
ALTER TABLE `Institutos`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `LogrosReportes`
--
ALTER TABLE `LogrosReportes`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_LogrosReportes_AlumnoId` (`AlumnoId`),
  ADD KEY `IX_LogrosReportes_InstitutoId` (`InstitutoId`);

--
-- Indices de la tabla `Materias`
--
ALTER TABLE `Materias`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Materias_GradoId` (`GradoId`);

--
-- Indices de la tabla `Notificaciones`
--
ALTER TABLE `Notificaciones`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Notificaciones_UsuarioId` (`UsuarioId`);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Usuarios_InstitutoId` (`InstitutoId`);

--
-- Indices de la tabla `__EFMigrationsHistory`
--
ALTER TABLE `__EFMigrationsHistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Antecedentes`
--
ALTER TABLE `Antecedentes`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Avances`
--
ALTER TABLE `Avances`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Calificaciones`
--
ALTER TABLE `Calificaciones`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Documentos`
--
ALTER TABLE `Documentos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Grados`
--
ALTER TABLE `Grados`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Grupos`
--
ALTER TABLE `Grupos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Horarios`
--
ALTER TABLE `Horarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Institutos`
--
ALTER TABLE `Institutos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `LogrosReportes`
--
ALTER TABLE `LogrosReportes`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Materias`
--
ALTER TABLE `Materias`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Notificaciones`
--
ALTER TABLE `Notificaciones`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Antecedentes`
--
ALTER TABLE `Antecedentes`
  ADD CONSTRAINT `FK_Antecedentes_Institutos_InstitutoOrigenId` FOREIGN KEY (`InstitutoOrigenId`) REFERENCES `Institutos` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Antecedentes_Usuarios_AlumnoId` FOREIGN KEY (`AlumnoId`) REFERENCES `Usuarios` (`Id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Avances`
--
ALTER TABLE `Avances`
  ADD CONSTRAINT `FK_Avances_Grados_GradoActualId` FOREIGN KEY (`GradoActualId`) REFERENCES `Grados` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Avances_Grupos_GrupoActualId` FOREIGN KEY (`GrupoActualId`) REFERENCES `Grupos` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Avances_Usuarios_AlumnoId` FOREIGN KEY (`AlumnoId`) REFERENCES `Usuarios` (`Id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Calificaciones`
--
ALTER TABLE `Calificaciones`
  ADD CONSTRAINT `FK_Calificaciones_Grupos_GrupoId` FOREIGN KEY (`GrupoId`) REFERENCES `Grupos` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Calificaciones_Materias_MateriaId` FOREIGN KEY (`MateriaId`) REFERENCES `Materias` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Calificaciones_Usuarios_AlumnoId` FOREIGN KEY (`AlumnoId`) REFERENCES `Usuarios` (`Id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Documentos`
--
ALTER TABLE `Documentos`
  ADD CONSTRAINT `FK_Documentos_Usuarios_AlumnoId` FOREIGN KEY (`AlumnoId`) REFERENCES `Usuarios` (`Id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Grupos`
--
ALTER TABLE `Grupos`
  ADD CONSTRAINT `FK_Grupos_Grados_GradoId` FOREIGN KEY (`GradoId`) REFERENCES `Grados` (`Id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Horarios`
--
ALTER TABLE `Horarios`
  ADD CONSTRAINT `FK_Horarios_Grupos_GrupoId` FOREIGN KEY (`GrupoId`) REFERENCES `Grupos` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Horarios_Materias_MateriaId` FOREIGN KEY (`MateriaId`) REFERENCES `Materias` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Horarios_Usuarios_DocenteId` FOREIGN KEY (`DocenteId`) REFERENCES `Usuarios` (`Id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `LogrosReportes`
--
ALTER TABLE `LogrosReportes`
  ADD CONSTRAINT `FK_LogrosReportes_Institutos_InstitutoId` FOREIGN KEY (`InstitutoId`) REFERENCES `Institutos` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_LogrosReportes_Usuarios_AlumnoId` FOREIGN KEY (`AlumnoId`) REFERENCES `Usuarios` (`Id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Materias`
--
ALTER TABLE `Materias`
  ADD CONSTRAINT `FK_Materias_Grados_GradoId` FOREIGN KEY (`GradoId`) REFERENCES `Grados` (`Id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Notificaciones`
--
ALTER TABLE `Notificaciones`
  ADD CONSTRAINT `FK_Notificaciones_Usuarios_UsuarioId` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuarios` (`Id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD CONSTRAINT `FK_Usuarios_Institutos_InstitutoId` FOREIGN KEY (`InstitutoId`) REFERENCES `Institutos` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
