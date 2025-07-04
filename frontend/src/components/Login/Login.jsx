import React, { useState } from "react";
import { login } from "../../services/authService";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPass, setMostrarPass] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await login(email, password);
      if (data.token) {
        sessionStorage.setItem("token", data.token);  // 🔒 Guarda el token en sessionStorage
        onLogin(); // Avisar al padre
  
        // ✅ Mostrar alerta de éxito y redirigir cuando se cierre
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: 'Inicio de sesión exitoso',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          navigate("/"); // Cambia '/' por la ruta que quieras ir al terminar
        });
  
      } else {
        setError("Credenciales incorrectas");
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Credenciales incorrectas'
        });
      }
    } catch (error) {
      setError("Error al conectar con el servidor: " + error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Error al conectar con el servidor: " + error.message
      });
    }
  };
  

  return (
    <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100" style={{ position: "relative" }}>
      <div className="bg-overlay"></div>
      <div className="auth-page-content overflow-hidden pt-lg-5">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="card overflow-hidden">
                <div className="row g-0">
                  {/* Izquierda */}
                  <div className="col-lg-6">
                    <div className="p-lg-5 p-4 auth-one-bg h-100 position-relative">
                      <div className="bg-overlay"></div>
                      <div className="h-100 d-flex flex-column position-relative">
                        <div className="mb-4">
                          <a href="/" className="d-block">
                            <img src="../../assets/images/logo_fondo_2.png" alt="Logo" height={18} />
                          </a>
                        </div>
                        <div className="mt-auto text-white text-center">
                          <i className="ri-double-quotes-l display-4 text-success"></i>
                          <div id="qoutescarouselIndicators" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                              <button type="button" data-bs-target="#qoutescarouselIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                              <button type="button" data-bs-target="#qoutescarouselIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                              <button type="button" data-bs-target="#qoutescarouselIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner text-center text-white pb-5">
                              <div className="carousel-item active">
                                <p className="fs-15 fst-italic">" Great! Clean code, clean design, easy for customization. Thanks very much! "</p>
                              </div>
                              <div className="carousel-item">
                                <p className="fs-15 fst-italic">" The theme is really great with an amazing customer support. "</p>
                              </div>
                              <div className="carousel-item">
                                <p className="fs-15 fst-italic">" Great! Clean code, clean design, easy for customization. Thanks very much! "</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Derecha */}
                  <div className="col-lg-6">
                    <div className="p-lg-5 p-4">
                      <h5 className="text-primary">¡Bienvenido de nuevo!</h5>
                      <p className="text-muted">Inicia sesión para continuar.</p>
                      <form onSubmit={handleSubmit}>
                        {error && (
                          <div className="alert alert-danger" role="alert">
                            {error}
                          </div>
                        )}

                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">Correo electrónico</label>
                          <input type="email" className="form-control" id="email" placeholder="Ingresa tu correo"
                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <a href="/forgot-password" className="text-muted">¿Olvidaste tu contraseña?</a>
                          </div>
                          <label htmlFor="password" className="form-label">Contraseña</label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <input type={mostrarPass ? "text" : "password"}
                              className="form-control pe-5 password-input" placeholder="Ingresa tu contraseña" id="password"
                              value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button type="button" className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              onClick={() => setMostrarPass(!mostrarPass)}>
                              <i className={`ri-eye${mostrarPass ? '-off' : '-fill'} align-middle`}></i>
                            </button>
                          </div>
                        </div>

                        <div className="form-check mb-3">
                          <input className="form-check-input" type="checkbox" id="rememberMe" />
                          <label className="form-check-label" htmlFor="rememberMe">Recuérdame</label>
                        </div>

                        <div className="mt-4">
                          <button className="btn btn-success w-100" type="submit">Iniciar sesión</button>
                        </div>
                      </form>

                      <div className="mt-5 text-center">
                        <p className="mb-0">¿No tienes cuenta?{" "}
                          <Link to="/signup" className="fw-semibold text-primary text-decoration-underline">Regístrate</Link>
                        </p>
                      </div>
                    </div>
                  </div> {/* fin derecha */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
