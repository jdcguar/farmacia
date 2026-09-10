import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importamos nuestras páginas desde la nueva carpeta
import Inicio from './pages/Inicio';
import Inventario from './pages/Inventario';
import Auditoria from './pages/Auditoria';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        
        {/* Menú Lateral (Sidebar) */}
        <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl z-10">
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-xl font-bold tracking-wider text-blue-400">FARMACIAS PRO</h1>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link to="/" className="block py-3 px-4 rounded-lg transition-colors hover:bg-blue-600 hover:text-white">
              Inicio
            </Link>
            <Link to="/inventario" className="block py-3 px-4 rounded-lg transition-colors hover:bg-blue-600 hover:text-white">
              Inventario
            </Link>
            <Link to="/auditoria" className="block py-3 px-4 rounded-lg transition-colors hover:bg-blue-600 hover:text-white">
              Auditoría
            </Link>
          </nav>
        </aside>

        {/* Área Central Dinámica */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/auditoria" element={<Auditoria />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;