const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const inventarioRoutes = require('./routes/inventarioRoutes');

const app = express();

// Configuración estricta de orígenes permitidos
const corsOptions = {
    origin: 'http://localhost:5173', // Solo acepta peticiones del entorno de desarrollo
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// Ruta base de estado
app.get('/api/status', (req, res) => {
    res.json({ message: 'API de Farmacias funcionando correctamente' });
});

// Registrar módulos (aquí iremos agregando los futuros como Auditoría)
app.use('/api/inventario', inventarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});