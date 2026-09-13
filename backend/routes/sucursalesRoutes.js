const express = require('express');
const router = express.Router();
const sucursalesController = require('../controllers/sucursalesController');

// Definimos qué función del controlador se ejecuta en cada ruta
router.get('/', sucursalesController.obtenerSucursales);

module.exports = router;
