// Layout.jsx
import React, { useEffect, useState } from "react";
import SidebarMenu from "./menu/SidebarMenu";
import Header from "./menu/Header";
import { obtenerUsuario } from "../services/usuarioService";
import './../App.css';

export default function Layout({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const data = await obtenerUsuario();

        setUsuario(data);
      } catch (error) {
        console.error("Error al cargar usuario:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarUsuario();
  }, []);

  if (cargando) {
    return <div className="text-center mt-5">Cargando datos de usuario...</div>;
  }

  return (
    <div id="layout-wrapper">
      <Header usuario={usuario} />
      <SidebarMenu usuario={usuario} />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">{children}</div>
        </div>
      </div>
    </div>
  );
}
