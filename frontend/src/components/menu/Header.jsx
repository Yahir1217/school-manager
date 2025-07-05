import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export default function Header({ usuario }) {
  const [notiAbierta, setNotiAbierta] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const panelRef = useRef(null);

  const notificaciones = usuario?.notificaciones || [];
  const noLeidasCount = notificaciones.filter(n => !n.leido).length;

  const toggleNotificaciones = () => {
    setNotiAbierta(!notiAbierta);
  };

  const nombreUsuario = usuario?.nombreCompleto || "Usuario";
  const emailUsuario = usuario?.correo || "correo@dominio.com";

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.dropdown-container')) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showDropdown]);

  // Cierra al dar clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setNotiAbierta(false);
      }
    };

    if (notiAbierta) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notiAbierta]);

  // Panel que irá al portal
  const notificacionesPanel = (
    <div
      ref={panelRef}
      style={{
        position: 'fixed',
        top: '60px',       // altura de tu header
        right: '50px',     // ajusta la posición a la izquierda
        width: '350px',
        maxHeight: '400px',
        overflowY: 'auto',
        backgroundColor: 'white',
        boxShadow: '0 0 15px rgba(0,0,0,0.2)',
        borderRadius: '8px',
        zIndex: 3000,
        padding: '10px'
      }}
    >
      <div data-simplebar style={{ maxHeight: 300 }} className="pe-2">
        {notificaciones.length === 0 && (
          <div className="text-center py-3">No tienes notificaciones</div>
        )}

        {notificaciones.map(noti => (
          <div key={noti.id} className="text-reset notification-item d-block dropdown-item position-relative">
            <div className="d-flex">
              <div className="avatar-xs me-3 flex-shrink-0">
                <span className={`avatar-title rounded-circle fs-16 ${noti.leido ? 'bg-secondary text-white' : 'bg-info-subtle text-info'}`}>
                  <i className="bx bx-bell"></i>
                </span>
              </div>
              <div className="flex-grow-1">
                <a href="#!" className="stretched-link">
                  <h6 className="mt-0 mb-2 lh-base">{noti.titulo}</h6>
                </a>
                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                  <span>
                    <i className="mdi mdi-clock-outline"></i>{" "}
                    {new Date(noti.fechaEnvio).toLocaleString()}
                  </span>
                </p>
                <p>{noti.mensaje}</p>
              </div>
              <div className="px-2 fs-15">
                <div className="form-check notification-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={noti.leido} 
                    readOnly
                    id={`notification-check-${noti.id}`}
                  />
                  <label className="form-check-label" htmlFor={`notification-check-${noti.id}`}></label>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="my-3 text-center view-all">
          <button type="button" className="btn btn-soft-success waves-effect waves-light">
            Ver todas las notificaciones <i className="ri-arrow-right-line align-middle"></i>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header id="page-topbar" style={{ position: 'relative', zIndex: 1000 }}>
        <div className="layout-width">
          <div className="navbar-header d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="navbar-brand-box horizontal-logo"></div>
            </div>

            <div className="d-flex align-items-center" style={{ marginRight: '40px' }}>
              <div className="topbar-head-dropdown me-2 header-item">
                <button 
                  type="button" 
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  onClick={toggleNotificaciones}
                >
                  <i className="bx bx-bell fs-22"></i>
                  {noLeidasCount > 0 && (
                    <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                      {noLeidasCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="header-item topbar-user position-relative dropdown-container">
                <button 
                  className="btn" 
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                      style={{ width: 40, height: 40 }}
                    >
                      {nombreUsuario.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-start ms-xl-2">
                      <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{nombreUsuario}</span>
                      <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">{emailUsuario}</span>
                    </span>
                  </span>
                </button>

                {showDropdown && (
                  <div
                    style={{
                      overflowY: 'auto',
                      backgroundColor: 'white',
                      boxShadow: '0 0 15px rgba(0,0,0,0.2)',
                      borderRadius: '8px',
                      zIndex: 3000,
                      padding: '10px',
                      position: 'absolute',
                      top: '100%',
                      right: '0',
                      width: '300px'
                    }}
                  >
                    <div className="px-2 pt-2">
                      <ul className="nav nav-tabs dropdown-tabs nav-tabs-custom" id="profileTab" role="tablist">
                        <li className="nav-item waves-effect waves-light">
                          <a className="nav-link active" data-bs-toggle="tab" href="#profile-tab" role="tab" aria-selected="true">
                            Perfil
                          </a>
                        </li>
                        <li className="nav-item waves-effect waves-light">
                          <a className="nav-link" data-bs-toggle="tab" href="#settings-tab" role="tab" aria-selected="false">
                            Configuración
                          </a>
                        </li>
                        <li className="nav-item waves-effect waves-light">
                          <a className="nav-link" data-bs-toggle="tab" href="#logout-tab" role="tab" aria-selected="false">
                            Cerrar sesión
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="tab-content position-relative" id="profileTabContent">
                      <div className="tab-pane fade show active py-2 ps-2" id="profile-tab" role="tabpanel">
                        <p>Contenido del perfil</p>
                      </div>
                      <div className="tab-pane fade py-2 ps-2" id="settings-tab" role="tabpanel">
                        <p>Contenido de configuración</p>
                      </div>
                      <div className="tab-pane fade py-2 ps-2" id="logout-tab" role="tabpanel">
                        <p>Contenido de cerrar sesión</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Renderizamos el panel fuera del header */}
      {notiAbierta && ReactDOM.createPortal(
        notificacionesPanel,
        document.body
      )}
    </>
  );
}
