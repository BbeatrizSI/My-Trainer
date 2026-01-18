/**
 * Normaliza una ruta de imagen para que funcione con el base path de Vite
 * Ejemplo: "/exercises/image.png" -> "/My-Trainer/exercises/image.png" (en GitHub Pages)
 */
export function getImagePath(path: string): string {
	const base = import.meta.env.BASE_URL;
	
	// Si la ruta ya empieza con la base, retornarla tal cual
	if (path.startsWith(base)) {
		return path;
	}
	
	// Si la ruta empieza con /, reemplazar el / inicial con la base
	if (path.startsWith('/')) {
		return base + path.slice(1);
	}
	
	// Si no empieza con /, añadir la base
	return base + path;
}
