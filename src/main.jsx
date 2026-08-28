import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ConfigProvider, App as AntApp } from "antd";
import esES from "antd/locale/es_ES";
import App from "./App.jsx";
import { antdTheme } from "./theme.js";
import "./styles.css";

// Usamos HashRouter (URLs tipo /#/galeria/x) porque GitHub Pages no soporta
// rutas "limpias" del lado del servidor: al recargar /galeria/x directamente
// devolvería un 404. Con hash, todo se resuelve del lado del cliente.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider theme={antdTheme} locale={esES}>
      <AntApp>
        <HashRouter>
          <App />
        </HashRouter>
      </AntApp>
    </ConfigProvider>
  </React.StrictMode>
);
