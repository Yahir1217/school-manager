import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Configura una instancia para reutilizar
const api = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token automáticamente
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * Crea un nuevo usuario
 */
export async function crearUsuario(data) {
  try {
    const res = await api.post('usuarios', data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al crear usuario');
  }
}

/**
 * Edita un usuario existente
 */
export async function editarUsuario(id, data) {
  try {
    const res = await api.put(`usuarios/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al editar usuario');
  }
}

/**
 * Obtiene los datos del usuario autenticado
 */
export async function obtenerUsuario() {
  try {
    const res = await api.get('usuarios/detalle');
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener datos del usuario');
  }
}
