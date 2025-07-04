import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';  // <-- añade Navigate
import Login from './components/Login/Login';
import Layout from './components/Layout';
import MainView from './components/MainView';
import Perfil from './components/pages/Perfil';
import Register from './components/Login/Register';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => setLoggedIn(true);

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/signup" element={<Register />} />

      {/* Rutas protegidas dentro del Layout */}
      <Route
        path="/*"
        element={
          loggedIn ? (
            <Layout>
              <Routes>
                <Route path="/" element={<MainView />} />
                <Route path="/perfil" element={<Perfil />} />
              </Routes>
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
