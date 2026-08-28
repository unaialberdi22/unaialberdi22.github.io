import { categorias } from "../data/tree.js";
import NodeCard from "../components/NodeCard.jsx";

export default function HomePage() {
  if (categorias.length === 0) {
    return (
      <div className="empty-state">
        <p>
          Todavía no hay galerías. Añade carpetas con fotos dentro de{" "}
          <code>public/photos</code> y ejecuta{" "}
          <code>npm run generate</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="node-grid">
      {categorias.map((nodo) => (
        <NodeCard key={nodo.slug} nodo={nodo} />
      ))}
    </div>
  );
}
