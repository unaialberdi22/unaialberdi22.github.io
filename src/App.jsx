import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import NodePage from "./pages/NodePage.jsx";

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <Link to="/" className="site-title">
          Portfolio
        </Link>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* "*" captura rutas de cualquier profundidad, p.ej.
              /galeria/automocion/rally-catalunya-2024 */}
          <Route path="/galeria/*" element={<NodePage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <span>Generado a partir de /public/photos</span>
      </footer>
    </div>
  );
}
