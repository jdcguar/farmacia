const sucursalesRepository = require('../repositories/sucursalesRepository');

const obtenerSucursales = async (req, res) => {
    try {
        // El controlador ya no sabe nada de SQL, solo pide los datos
        const sucursales = await sucursalesRepository.obtenerTodasActivas();
        res.json(sucursales);
    } catch (err) {
        console.error('Error al obtener sucursales:', err);
        res.status(500).json({ error: 'Error al consultar las sucursales' });
    }
};

module.exports = { obtenerSucursales };