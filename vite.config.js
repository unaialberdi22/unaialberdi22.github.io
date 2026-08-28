import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANTE: cambia "portfolio-fotos" por el nombre real de tu repositorio
// de GitHub. Si tu repo es "usuario.github.io" (página raíz), pon base: "/".
export default defineConfig({
  base: "/",
  plugins: [react()],
  publicDir: "public",
});
