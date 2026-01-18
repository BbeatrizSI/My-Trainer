import { useMemo, useState } from "react";
import type { Routine } from "./types";
import { loadRoutines, saveRoutines } from "./stores/routines";
import { WorkoutPlayer } from "./components/WorkoutPlayer";
import { RoutineCard } from "./components/RoutineCard";

export default function App() {
	const [routines, setRoutines] = useState<Routine[]>(() => loadRoutines());
	const [selectedId, setSelectedId] = useState<string | null>(null);

	const selected = useMemo(
		() => routines.find((r) => r.id === selectedId) ?? null,
		[routines, selectedId]
	);

	function updateRoutine(next: Routine) {
		const updated = routines.map((r) => (r.id === next.id ? next : r));
		setRoutines(updated);
		saveRoutines(updated);
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
		<div className="min-h-full bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 p-4 md:p-6">
			<div className="max-w-4xl mx-auto">
				<div className="mb-6">
					<h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						My Trainer
					</h1>
					<p className="text-slate-600 mt-2 text-sm md:text-base">
						Selecciona una rutina para comenzar tu entrenamiento
					</p>
				</div>

				<div className="mt-6 flex flex-col gap-4">
					{routines.map((r) => (
						<RoutineCard
							key={r.id}
							routine={r}
							onStart={() => setSelectedId(r.id)}
							onUpdate={updateRoutine}
						/>
					))}
				</div>

				<div className="mt-8 text-xs text-slate-500 text-center">
					Imágenes en{" "}
					<span className="font-mono bg-slate-200 px-2 py-1 rounded">
						public/exercises
					</span>
				</div>
			</div>
		</div>
	);
}
