import React, { useState } from 'react';
import { login } from '../services/authService'; // si usas servicio separado

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Login exitoso');
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
        console.error(error);
        alert('Error al conectar con el servidor: ' + error.message);
      }
      
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Correo:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="tu@email.com"
          />
        </label>
        <br /><br />
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="********"
          />
        </label>
        <br /><br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
