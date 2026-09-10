// Definimos la URL base para no repetirla en cada función
//*fetch son peticiones http

const API_URL = 'http://localhost:3000/api/inventario';

// Servicio para leer (GET)
export const obtenerMedicamentos = async () => {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error('Error al obtener el inventario');
    return await respuesta.json();
};

// Servicio para crear (POST)
export const crearMedicamento = async (nuevoDato) => {
    const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoDato)
    });
    if (!respuesta.ok) throw new Error('Error al guardar el medicamento');
    return await respuesta.json();
};

// Servicio para eliminar (DELETE)
export const eliminarMedicamento = async (id) => {
    // Notar cómo agregamos el ID al final de la URL
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!respuesta.ok) throw new Error('Error al eliminar el medicamento');
    return await respuesta.json();
};

// Servicio para actualizar (PUT)
export const actualizarMedicamento = async (id, datosActualizados) => {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosActualizados)
    });
    if (!respuesta.ok) throw new Error('Error al actualizar el medicamento');
    return await respuesta.json();
};
