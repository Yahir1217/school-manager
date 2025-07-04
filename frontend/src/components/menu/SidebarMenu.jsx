import React from "react";
import { Link } from "react-router-dom";

export default function SidebarMenu() {
  const sidebarStyle = {
    backgroundColor: "#fff",
    minHeight: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    width: 280,
    overflowY: "auto",
    zIndex: 1000,
    borderRight: "none",
    boxShadow: "none",
  };

  // Texto más grande
  const textStyle = { 
    color: "#6c757d", 
    fontSize: '16px', 
    display: 'flex', 
    alignItems: 'center' 
  };

  // Iconos más grandes
  const iconStyle = { 
    color: "#6c757d", 
    marginRight: 10, 
    fontSize: '20px' 
  };

  return (
    <div style={sidebarStyle}>
      <div style={{ height: 60 }} className="d-flex align-items-center">
        <Link to="/inicio" className="d-flex align-items-center">
          <span className="logo-sm">
            <img src="../../assets/images/logo_fondo_2.png" alt="Logo pequeño" height={50} />
          </span>
        </Link>
      </div>

      <div className="container-fluid" style={{ paddingRight: 0 }}>
        <ul className="navbar-nav">
          {/* 🔹 General */}
          <li className="menu-title mt-3 mb-1 px-3 text-uppercase fw-bold small" style={{ color: "#adb5bd" }}>
            General
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link" style={textStyle}>
              <i className="las la-home" style={iconStyle}></i> Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/calendario" className="nav-link" style={textStyle}>
              <i className="las la-calendar" style={iconStyle}></i> Calendario
            </Link>
          </li>

          {/* 🔹 Alumnos */}
          <li className="menu-title mt-3 mb-1 px-3 text-uppercase fw-bold small" style={{ color: "#adb5bd" }}>
            Alumnos
          </li>
          <li className="nav-item">
            <Link to="/alumnos" className="nav-link" style={textStyle}>
              <i className="las la-user-graduate" style={iconStyle}></i> Lista de Alumnos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/alumnos/inscripciones" className="nav-link" style={textStyle}>
              <i className="las la-clipboard-list" style={iconStyle}></i> Inscripciones
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/alumnos/calificaciones" className="nav-link" style={textStyle}>
              <i className="las la-chart-line" style={iconStyle}></i> Calificaciones
            </Link>
          </li>

          {/* 🔹 Profesores */}
          <li className="menu-title mt-3 mb-1 px-3 text-uppercase fw-bold small" style={{ color: "#adb5bd" }}>
            Profesores
          </li>
          <li className="nav-item">
            <Link to="/profesores" className="nav-link" style={textStyle}>
              <i className="las la-chalkboard-teacher" style={iconStyle}></i> Lista de Profesores
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profesores/horarios" className="nav-link" style={textStyle}>
              <i className="las la-clock" style={iconStyle}></i> Horarios
            </Link>
          </li>

          {/* 🔹 Administración */}
          <li className="menu-title mt-3 mb-1 px-3 text-uppercase fw-bold small" style={{ color: "#adb5bd" }}>
            Administración
          </li>
          <li className="nav-item">
            <Link to="/usuarios" className="nav-link" style={textStyle}>
              <i className="las la-users" style={iconStyle}></i> Usuarios
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/roles" className="nav-link" style={textStyle}>
              <i className="las la-user-shield" style={iconStyle}></i> Roles
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/reportes" className="nav-link" style={textStyle}>
              <i className="las la-file-alt" style={iconStyle}></i> Reportes
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
