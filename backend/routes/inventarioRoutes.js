const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');

// Definimos qué función del controlador se ejecuta en cada ruta
router.get('/', inventarioController.obtenerInventario);
router.post('/', inventarioController.crearMedicamento);
router.delete('/:id', inventarioController.eliminarMedicamento);
router.put('/:id', inventarioController.actualizarMedicamento);

module.exports = router;