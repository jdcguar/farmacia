import { useState, useEffect } from 'react';
// Importamos nuestra nueva capa de servicios
import { obtenerMedicamentos, crearMedicamento, eliminarMedicamento, actualizarMedicamento } from '../services/inventarioService';

const Inventario = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoDato, setNuevoDato] = useState({ nombre: '', stock: '', sucursal: '' });
  const [idEditando, setIdEditando] = useState(null);

  // Ahora la vista solo llama al servicio, no sabe nada de URLs ni de fetch
  const cargarInventario = () => {
    obtenerMedicamentos()
      .then(data => {
        setMedicamentos(data);
        setCargando(false);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    cargarInventario();
  }, []);

const guardarMedicamento = (e) => {
  e.preventDefault();

  if (idEditando) {
    actualizarMedicamento(idEditando, nuevoDato)
      .then(() => {
        setNuevoDato({ nombre: '', stock: '', sucursal: '' });
        setIdEditando(null);
        setMostrarFormulario(false);
        cargarInventario();
      })
      .catch(err => console.error('Error al actualizar:', err));
  } else {
    crearMedicamento(nuevoDato)
      .then(() => {
        setNuevoDato({ nombre: '', stock: '', sucursal: '' });
        setMostrarFormulario(false);
        cargarInventario();
      })
      .catch(err => console.error('Error al guardar:', err));
  }
};

  const handleEliminar = (id, nombre) => {
    // Pedimos confirmación al usuario
    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar el medicamento: ${nombre}?`);

    if (confirmar) {
      eliminarMedicamento(id)
        .then(() => {
          // Si se borró con éxito, recargamos la tabla
          cargarInventario();
        })
        .catch(err => console.error('Error al eliminar:', err));
    }
  };

  const handleEditar = (item) => {
    setNuevoDato({ nombre: item.NOMBRE, stock: item.STOCK, sucursal: item.SUCURSAL });
    setIdEditando(item.ID);
    setMostrarFormulario(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Control de Inventario</h2>
        <button 
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
        >
          {mostrarFormulario ? 'Cancelar' : '+ Nuevo Medicamento'}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Registrar Nuevo Medicamento</h3>
          <form onSubmit={guardarMedicamento} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Nombre</label>
              <input 
                type="text" required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={nuevoDato.nombre}
                onChange={(e) => setNuevoDato({...nuevoDato, nombre: e.target.value})}
              />
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-600 mb-1">Stock</label>
              <input 
                type="number" required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={nuevoDato.stock}
                onChange={(e) => setNuevoDato({...nuevoDato, stock: e.target.value})}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Sucursal</label>
              <select 
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={nuevoDato.sucursal}
                onChange={(e) => setNuevoDato({...nuevoDato, sucursal: e.target.value})}
              >
                <option value="">Seleccione...</option>
                <option value="Central">Central</option>
                <option value="Norte">Norte</option>
                <option value="Sur">Sur</option>
              </select>
            </div>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors h-[42px]">
              Guardar
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-700">
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">Medicamento</th>
              <th className="p-4 font-semibold">Stock</th>
              <th className="p-4 font-semibold">Sucursal</th>
              <th className="p-4 font-semibold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr><td colSpan="5" className="p-6 text-center text-gray-500">Cargando datos...</td></tr>
            ) : medicamentos.length === 0 ? (
              <tr><td colSpan="5" className="p-6 text-center text-gray-500">No hay registros.</td></tr>
            ) : (
              medicamentos.map((item) => (
                <tr key={item.ID} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-600">#{item.ID}</td>
                  <td className="p-4 font-medium text-gray-800">{item.NOMBRE}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${item.STOCK < 20 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {item.STOCK} unidades
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{item.SUCURSAL}</td>
                  <td className="p-4 text-center space-x-4">
                    <button onClick={() => handleEditar(item)} className="text-blue-500 hover:text-blue-700 font-medium transition-colors">Editar</button>
                    <button onClick={() => handleEliminar(item.ID, item.NOMBRE)} className="text-red-500 hover:text-red-700 font-medium transition-colors"> Eliminar </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventario;