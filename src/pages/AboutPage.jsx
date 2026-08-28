import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="static-page">
      <h1>Sobre mí</h1>
      <p className="static-page__lead">
        [Aquí va tu presentación: quién eres, qué tipo de fotografía haces y
        qué te motiva a hacerla.]
      </p>

      <div className="static-page__body">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Llevo
          [X años] fotografiando [temática: paisajes, automoción, retrato...],
          buscando siempre [tu enfoque o estilo personal]. Cada proyecto es
          una excusa para [qué te aporta la fotografía].
        </p>
        <p>
          Trabajo principalmente con [equipo/cámara], y me interesa
          especialmente [aspecto técnico o creativo que te distinga]. Puedes
          ver algunos de mis trabajos recientes en la sección{" "}
          <Link to="/">Portfolio</Link>.
        </p>
        <p>
          Si quieres saber más sobre algún proyecto o simplemente charlar de
          fotografía, no dudes en escribirme desde la página de{" "}
          <Link to="/contacto">Contacto</Link>.
        </p>
      </div>
    </div>
  );
}
