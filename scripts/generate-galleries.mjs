// scripts/generate-galleries.mjs
//
// Recorre la carpeta /photos de forma recursiva y genera src/data/galleries.json
// Cada carpeta puede ser:
//   - "galeria": contiene imágenes directamente (hoja del árbol)
//   - "categoria": contiene solo subcarpetas (nodo del árbol)
//
// El texto de cada nodo se lee de un archivo info.txt dentro de la carpeta.
// Formato de info.txt:
//   Primera línea  -> título
//   Resto del archivo -> descripción (puede tener varias líneas / párrafos)

import {
  readdirSync,
  readFileSync,
  existsSync,
  mkdirSync,
  writeFileSync,
} from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
// public/photos es tanto la carpeta de origen como la que Vite sirve como
// estáticos: así las rutas del JSON ("automocion/foto1.jpg") son directamente
// utilizables como <img src={`${BASE_URL}photos/${ruta}`} />
const PHOTOS_DIR = join(__dirname, "..", "public", "photos");
const OUTPUT_FILE = join(__dirname, "..", "src", "data", "galleries.json");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readInfoTxt(dirPath, fallbackTitle) {
  const infoPath = join(dirPath, "info.txt");
  if (!existsSync(infoPath)) {
    return { titulo: fallbackTitle, descripcion: "" };
  }
  const raw = readFileSync(infoPath, "utf-8").trim();
  const [firstLine, ...rest] = raw.split(/\r?\n/);
  return {
    titulo: firstLine?.trim() || fallbackTitle,
    descripcion: rest.join("\n").trim(),
  };
}

function isImage(fileName) {
  const ext = fileName.slice(fileName.lastIndexOf(".")).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

function processDir(dirPath) {
  const entries = readdirSync(dirPath, { withFileTypes: true });
  const subDirs = entries.filter((e) => e.isDirectory());
  const images = entries
    .filter((e) => e.isFile() && isImage(e.name))
    .map((e) => e.name)
    .sort();

  const folderName = dirPath.split("/").pop();
  const { titulo, descripcion } = readInfoTxt(dirPath, folderName);
  const slug = slugify(folderName);
  const rutaRelativa = relative(PHOTOS_DIR, dirPath).split("\\").join("/");

  // Si tiene imágenes directamente -> es una galería (hoja), aunque también
  // tenga subcarpetas raro no debería pasar, pero priorizamos "galeria".
  if (images.length > 0 && subDirs.length === 0) {
    return {
      type: "galeria",
      slug,
      titulo,
      descripcion,
      ruta: rutaRelativa,
      fotos: images.map((name) => `${rutaRelativa}/${name}`),
    };
  }

  // Si no tiene imágenes propias pero sí subcarpetas -> es una categoría
  if (subDirs.length > 0) {
    const items = subDirs
      .map((d) => processDir(join(dirPath, d.name)))
      .filter(Boolean);
    return {
      type: "categoria",
      slug,
      titulo,
      descripcion,
      ruta: rutaRelativa,
      items,
    };
  }

  // Carpeta vacía (ni imágenes ni subcarpetas): la ignoramos
  return null;
}

function main() {
  if (!existsSync(PHOTOS_DIR)) {
    console.error(`No existe la carpeta ${PHOTOS_DIR}`);
    process.exit(1);
  }

  const rootEntries = readdirSync(PHOTOS_DIR, { withFileTypes: true }).filter(
    (e) => e.isDirectory()
  );

  const tree = rootEntries
    .map((d) => processDir(join(PHOTOS_DIR, d.name)))
    .filter(Boolean)
    .sort((a, b) => a.titulo.localeCompare(b.titulo, "es"));

  const output = {
    generadoEn: new Date().toISOString(),
    categorias: tree,
  };

  mkdirSync(join(__dirname, "..", "src", "data"), { recursive: true });
  writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), "utf-8");

  console.log(`✔ Generado ${relative(process.cwd(), OUTPUT_FILE)}`);
  console.log(`  ${tree.length} categorías/galerías de nivel raíz encontradas`);
}

main();
