import { Link, useParams } from "react-router-dom";
import { findNodeBySlugPath, buildBreadcrumb } from "../data/tree.js";
import NodeCard from "../components/NodeCard.jsx";
import PhotoGrid from "../components/PhotoGrid.jsx";

export default function NodePage() {
  // El "*" de la ruta /galeria/* llega como un único string tipo
  // "automocion/rally-catalunya-2024"
  const params = useParams();
  const slugPath = (params["*"] ?? "").split("/").filter(Boolean);
  const nodo = findNodeBySlugPath(slugPath);
  const crumbs = buildBreadcrumb(slugPath);

  if (!nodo) {
    return (
      <div className="empty-state">
        <p>No se ha encontrado esta galería.</p>
        <Link to="/">← Volver al inicio</Link>
      </div>
    );
  }

  const parentPath = slugPath.slice(0, -1).join("/");

  return (
    <div className="node-page">
      <nav className="breadcrumb">
        <Link to="/">Inicio</Link>
        {crumbs.map((c, i) => (
          <span key={c.path}>
            {" / "}
            {i === crumbs.length - 1 ? (
              <span>{c.titulo}</span>
            ) : (
              <Link to={`/galeria/${c.path}`}>{c.titulo}</Link>
            )}
          </span>
        ))}
      </nav>

      <h1>{nodo.titulo}</h1>
      {nodo.descripcion && (
        <p className="node-page__description">{nodo.descripcion}</p>
      )}

      {nodo.type === "categoria" ? (
        <div className="node-grid">
          {nodo.items.map((item) => (
            <NodeCard key={item.slug} nodo={item} basePath={slugPath.join("/")} />
          ))}
        </div>
      ) : (
        <PhotoGrid fotos={nodo.fotos} />
      )}
    </div>
  );
}
