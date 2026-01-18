import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// @ts-expect-error - virtual:pwa-register es un módulo virtual de Vite
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
	onNeedRefresh() {
		console.log("Nueva versión disponible. Recarga la página para actualizar.");
	},
	onOfflineReady() {
		console.log("Aplicación lista para funcionar offline.");
	},
});

// Opcional: exponer la función de actualización para uso futuro
if (import.meta.env.DEV) {
	// @ts-expect-error - Exponer en desarrollo para testing
	window.updateSW = updateSW;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
