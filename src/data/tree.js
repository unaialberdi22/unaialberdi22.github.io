import data from "./galleries.json";

export const categorias = data.categorias ?? [];

/**
 * Busca un nodo (categoría o galería) a partir de un array de slugs,
 * p.ej. ["automocion", "rally-catalunya-2024"]
 */
export function findNodeBySlugPath(slugPath) {
  let nivel = categorias;
  let nodo = null;

  for (const slug of slugPath) {
    nodo = nivel.find((n) => n.slug === slug);
    if (!nodo) return null;
    nivel = nodo.items ?? [];
  }

  return nodo;
}

/** Construye el breadcrumb (título + ruta) para un array de slugs */
export function buildBreadcrumb(slugPath) {
  const crumbs = [];
  let nivel = categorias;
  let acumulado = [];

  for (const slug of slugPath) {
    const nodo = nivel.find((n) => n.slug === slug);
    if (!nodo) break;
    acumulado = [...acumulado, slug];
    crumbs.push({ titulo: nodo.titulo, path: acumulado.join("/") });
    nivel = nodo.items ?? [];
  }

  return crumbs;
}
