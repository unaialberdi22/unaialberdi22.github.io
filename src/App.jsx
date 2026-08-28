import { Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import NodePage from "./pages/NodePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import DossiersPage from "./pages/DossiersPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

// Clase activa para los enlaces del menú (subrayado con el color de acento)
function navLinkClass({ isActive }) {
  return isActive ? "nav-link nav-link--active" : "nav-link";
}

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <NavLink to="/" className="site-logo" end>
          {/* Espacio reservado para el logo. Sustituye este bloque por
              <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Tu nombre" />
              cuando tengas el archivo listo. */}
          <span className="site-logo__mark" aria-hidden="true">
            ⌘
          </span>
          <span className="site-logo__text">Portfolio</span>
        </NavLink>

        <nav className="site-nav">
          <NavLink to="/" className={navLinkClass} end>
            Portfolio
          </NavLink>
          <NavLink to="/sobre-mi" className={navLinkClass}>
            Sobre mí
          </NavLink>
          <NavLink to="/dossieres" className={navLinkClass}>
            Dossieres
          </NavLink>
          <NavLink to="/contacto" className={navLinkClass}>
            Contacto
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* "*" captura rutas de cualquier profundidad, p.ej.
              /galeria/automocion/rally-catalunya-2024 */}
          <Route path="/galeria/*" element={<NodePage />} />
          <Route path="/sobre-mi" element={<AboutPage />} />
          <Route path="/dossieres" element={<DossiersPage />} />
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <span>Generado a partir de /public/photos</span>
      </footer>
    </div>
  );
}
