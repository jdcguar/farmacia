const API_URL = 'http://localhost:3000/api/sucursales';

export const obtenerSucursales = async () => {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error('Error al obtener el catálogo de sucursales');
    return await respuesta.json();
};