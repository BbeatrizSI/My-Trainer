import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// Base path para GitHub Pages
// Si el repo es usuario.github.io, usar '/'
// Si el repo tiene nombre, usar '/nombre-repo/'
const base = process.env.VITE_BASE || "/";

export default defineConfig({
	base,
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: [
				"icons/icon-192.png",
				"icons/icon-512.png",
				"icons/apple-touch-icon.png",
			],
			manifest: {
				name: "My Trainer",
				short_name: "Trainer",
				description: "Entrenamiento por rutinas con temporizador",
				theme_color: "#0f172a",
				background_color: "#f8fafc",
				display: "standalone",
				orientation: "portrait",
				scope: base,
				start_url: base,
				lang: "es",
				icons: [
					{
						src: "icons/icon-192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "icons/icon-512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "icons/icon-512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
			workbox: {
				globPatterns: [
					"**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,json}",
				],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: "CacheFirst",
						options: {
							cacheName: "google-fonts-cache",
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
				],
			},
			devOptions: {
				enabled: true,
				type: "module",
			},
		}),
	],
});
