import { useMemo, useState } from "react";
import type { Routine } from "./types";
import { loadRoutines, saveRoutines } from "./stores/routines";
import { WorkoutPlayer } from "./components/WorkoutPlayer";
import { RoutineCard } from "./components/RoutineCard";
import { RoutineCreator } from "./components/RoutineCreator";

export default function App() {
	const [routines, setRoutines] = useState<Routine[]>(() => loadRoutines());
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [creating, setCreating] = useState(false);

	const selected = useMemo(
		() => routines.find((r) => r.id === selectedId) ?? null,
		[routines, selectedId]
	);

	function updateRoutine(next: Routine) {
		const updated = routines.map((r) => (r.id === next.id ? next : r));
		setRoutines(updated);
		saveRoutines(updated);
	}

	function addRoutine(routine: Routine) {
		const updated = [...routines, routine];
		setRoutines(updated);
		saveRoutines(updated);
		setCreating(false);
	}

	function deleteRoutine(id: string) {
		const updated = routines.filter((r) => r.id !== id);
		setRoutines(updated);
		saveRoutines(updated);
	}

	if (creating) {
		return (
			<RoutineCreator
				onSave={addRoutine}
				onCancel={() => setCreating(false)}
			/>
		);
	}

	if (selected) {
		return (
			<WorkoutPlayer
				routine={selected}
				onExit={() => setSelectedId(null)}
			/>
		);
	}

	return (
		<div className="min-h-full bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 p-2 md:p-6">
			<div className="max-w-4xl mx-auto">
			<div className="mb-6 p-4 md:p-6">
				<h1 className="text-4xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mt-4 text-transparent">
					My Trainer
				</h1>
				<p className="text-slate-600 mt-2 text-sm md:text-base">
					Selecciona una rutina para comenzar
				</p>
			</div>

			<button
				onClick={() => setCreating(true)}
				className="w-full mb-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2"
			>
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					/>
				</svg>
				Crear Nueva Rutina
			</button>

			<div className="mt-6 flex flex-col gap-4">
				{routines.map((r) => (
					<RoutineCard
						key={r.id}
						routine={r}
						onStart={() => setSelectedId(r.id)}
						onUpdate={updateRoutine}
						onDelete={() => deleteRoutine(r.id)}
					/>
				))}
			</div>
		</div>
		</div>
	);
}
