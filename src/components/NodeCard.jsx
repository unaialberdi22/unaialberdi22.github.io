import { Link } from "react-router-dom";

// Miniatura: primera foto de la galería, o de la primera sub-galería
// encontrada si es una categoría (recursivo, poco profundo en la práctica)
function findCoverPhoto(nodo) {
  if (nodo.type === "galeria") return nodo.fotos?.[0] ?? null;
  for (const item of nodo.items ?? []) {
    const cover = findCoverPhoto(item);
    if (cover) return cover;
  }
  return null;
}

export default function NodeCard({ nodo, basePath }) {
  const cover = findCoverPhoto(nodo);
  const href = `/galeria/${basePath ? basePath + "/" : ""}${nodo.slug}`;
  const count =
    nodo.type === "galeria"
      ? `${nodo.fotos.length} foto${nodo.fotos.length === 1 ? "" : "s"}`
      : `${nodo.items.length} elemento${nodo.items.length === 1 ? "" : "s"}`;

  return (
    <Link to={href} className="node-card">
      <div className="node-card__thumb">
        {cover ? (
          <img
            src={`${import.meta.env.BASE_URL}photos/${cover}`}
            alt={nodo.titulo}
            loading="lazy"
          />
        ) : (
          <div className="node-card__thumb node-card__thumb--empty" />
        )}
      </div>
      <div className="node-card__info">
        <h3>{nodo.titulo}</h3>
        <span className="node-card__count">{count}</span>
      </div>
    </Link>
  );
}
