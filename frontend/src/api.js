const API_URL = import.meta.env.VITE_API_URL;

export async function getMaterias() {
  const response = await fetch(`${API_URL}/api/materias`);
  if (!response.ok) {
    throw new Error('Error al obtener materias');
  }
  return response.json();
}
