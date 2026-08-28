// src/theme.js
//
// Dirección de diseño: portfolio editorial, no dashboard.
// Paleta: casi negro con un acento cálido tipo "revelado analógico".
// Tipografía: Fraunces (serif con carácter, buena en cursiva) para
// titulares, Inter para todo lo demás. Nada de azul #1677ff de fábrica,
// nada de border-radius=6 genérico.

export const palette = {
  bg: "#111113",
  bgElevated: "#18181b",
  border: "#2a2a2e",
  text: "#ededf0",
  textDim: "#9a9aa2",
  accent: "#e2c799", // dorado cálido, evoca luz de tungsteno / revelado
};

export const antdTheme = {
  token: {
    colorPrimary: palette.accent,
    colorBgBase: palette.bg,
    colorBgContainer: palette.bgElevated,
    colorBorder: palette.border,
    colorText: palette.text,
    colorTextSecondary: palette.textDim,
    colorLink: palette.accent,
    colorLinkHover: "#f0dbb0",
    borderRadius: 2, // casi recto: look de galería, no de app de gestión
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontFamilyCode: '"Inter", monospace',
  },
  components: {
    Image: {
      // el visor de pantalla completa hereda el fondo casi negro
      colorBgMask: "rgba(8, 8, 9, 0.92)",
    },
  },
};
