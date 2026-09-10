import { useState, useEffect } from 'react';

const Inicio = () => {
  // variable de estado
  const [estadoApi, setEstadoApi] = useState('Conectando con el servidor...');

  // se ejecuta una sola vez al cargar la vista
  useEffect(() => {
    fetch('http://localhost:3000/api/status')
      .then(respuesta => respuesta.json())
      .then(datos => setEstadoApi(datos.message))
      .catch(error => setEstadoApi('Error: No se pudo conectar con el backend. ¿Está encendido?'));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Dashboard Principal</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-green-500">
        <h3 className="text-lg font-semibold text-gray-700">Estado de Conexión</h3>
        <p className="text-gray-600 mt-2 font-medium">{estadoApi}</p>
      </div>
    </div>
  );
};

export default Inicio;