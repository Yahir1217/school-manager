import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { crearUsuario } from "../../services/usuarioService"; // Ajusta la ruta según tu estructura

export default function Signup() {
  const navigate = useNavigate();

  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // limpia error anterior

    try {
      await crearUsuario({ NombreCompleto: nombreCompleto, Correo: correo, Password: password });
      navigate("/auth-signin-basic"); // redirige al login
    } catch (err) {
      setError("No se pudo registrar el usuario");
      console.error(err);
    }
  };

  return (
    <div className="auth-page-wrapper pt-5" style={{ height: "100vh", overflow: "hidden" }}>
      {/* auth page bg */}
      <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
        <div className="bg-overlay"></div>
        <div className="shape">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
          </svg>
        </div>
      </div>

      {/* auth page content */}
      <div className="auth-page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center mt-sm-5 mb-4 text-white-50">
              <a href="index.html" className="d-inline-block auth-logo">
                <img src="../../assets/images/logo_fondo_2.png" alt="Logo" height="100" />
              </a>
              <p className="mt-3 fs-15 fw-medium">School Manager</p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ marginTop: "-10px" }}>
                <div className="card-body p-3">
                  <div className="text-center mt-2 mb-3">
                    <h5 className="text-primary">Crear nueva cuenta</h5>
                    <p className="text-muted mb-0">Regístrate gratis ahora</p>
                  </div>

                  <div className="p-1 mt-3">
                    <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="useremail" className="form-label">
                          Correo electrónico <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="useremail"
                          placeholder="Ingresa tu correo"
                          required
                          value={correo}
                          onChange={(e) => setCorreo(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                          Nombre completo <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="Ingresa tu nombre"
                          required
                          value={nombreCompleto}
                          onChange={(e) => setNombreCompleto(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="password-input">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          className="form-control pe-5 password-input"
                          id="password-input"
                          placeholder="Ingresa tu contraseña"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      {error && <div className="alert alert-danger">{error}</div>}

                      <div className="mt-4">
                        <button className="btn btn-success w-100" type="submit">
                          Registrarse
                        </button>
                      </div>

                      <div className="mt-3 text-center">
                        <p className="mb-0">
                          ¿Ya tienes una cuenta?{" "}
                          <Link to="/auth-signin-basic" className="fw-semibold text-primary text-decoration-underline">
                            Iniciar sesión
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
                {/* end card body */}
              </div>
              {/* end card */}
            </div>
          </div>
        </div>
      </div>
      {/* end auth page content */}
    </div>
  );
}
