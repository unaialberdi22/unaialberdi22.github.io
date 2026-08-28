# Portfolio de fotos

Web estática (React + Vite) que genera automáticamente páginas de galería a
partir de la estructura de carpetas dentro de `public/photos`. Pensada para
publicarse en GitHub Pages.

## Cómo añadir fotos nuevas

1. Crea una carpeta dentro de `public/photos` (o una subcarpeta dentro de una
   categoría ya existente, para anidar niveles: `public/photos/automocion/mi-evento-nuevo`).
2. Mete las fotos ahí dentro.
3. Añade un `info.txt` con este formato:

   ```
   Título de la galería
   Descripción, puede ocupar varias líneas
   y varios párrafos si quieres.
   ```

4. Haz commit y push a `main`. **No hace falta nada más**: el workflow de
   GitHub Actions (`.github/workflows/deploy.yml`) genera el JSON, compila el
   proyecto y lo publica solo.

### Reglas de la estructura

- Una carpeta con imágenes dentro (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`)
  se convierte en una **galería**.
- Una carpeta que solo contiene subcarpetas se convierte en una
  **categoría**, y cada subcarpeta se procesa igual (recursivo, sin límite de
  profundidad). Así puedes tener `automocion / rally-2024 / dia-1` si algún
  día quieres ese nivel extra.
- El `info.txt` es opcional; si no existe se usa el nombre de la carpeta como
  título.

## Desarrollo local

```bash
npm install
npm run dev
```

`npm run dev` regenera automáticamente `src/data/galleries.json` antes de
arrancar (via el script `predev`). Si añades fotos con el servidor ya
arrancado, ejecuta `npm run generate` a mano o reinicia `npm run dev`.

## Primer despliegue (configuración única)

1. Cambia `base: "/portfolio-fotos/"` en `vite.config.js` por el nombre real
   de tu repositorio (o `"/"` si el repo se llama `tu-usuario.github.io`).
2. Crea el repositorio en GitHub y haz push de este proyecto a `main`.
3. En GitHub: **Settings → Pages → Source → GitHub Actions**. No hace falta
   elegir rama ni carpeta, el workflow ya incluido se encarga de todo.
4. A partir de aquí, cada push a `main` despliega solo.

## Estructura del proyecto

```
public/photos/          ← única fuente de verdad: fotos + info.txt
scripts/generate-galleries.mjs   ← script que recorre public/photos y genera:
src/data/galleries.json          ← árbol de categorías/galerías (autogenerado)
src/pages/HomePage.jsx           ← listado raíz
src/pages/NodePage.jsx           ← categoría o galería, según la URL
src/components/NodeCard.jsx      ← tarjeta de categoría/galería
src/components/PhotoGrid.jsx     ← grid de fotos + lightbox
.github/workflows/deploy.yml     ← build + deploy automático
```

## Notas

- Las rutas usan `HashRouter` (`/#/galeria/...`) para evitar 404 al recargar
  en GitHub Pages, que no soporta rutas del lado del servidor.
- Si las fotos pesan mucho, considera generar miniaturas antes de subirlas
  (con `sharp`, por ejemplo) — no está incluido en esta versión para
  mantenerla simple.
