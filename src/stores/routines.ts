import type { Routine } from "../types";
import { defaultRoutines } from "../data/defaultRoutines";

const KEY = "my_trainer_routines_v1";

export function loadRoutines(): Routine[] {
	const raw = localStorage.getItem(KEY);
	if (!raw) return defaultRoutines;

	try {
		const parsed = JSON.parse(raw) as Routine[];
		return Array.isArray(parsed) && parsed.length
			? parsed
			: defaultRoutines;
	} catch {
		return defaultRoutines;
	}
}

export function saveRoutines(routines: Routine[]) {
	localStorage.setItem(KEY, JSON.stringify(routines));
}
