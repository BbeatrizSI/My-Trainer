import { useMemo, useState } from "react";
import type { Routine } from "./types";
import { loadRoutines, saveRoutines } from "./stores/routines";
import { WorkoutPlayer } from "./components/WorkoutPlayer";

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
		<div className="min-h-full bg-slate-100 text-slate-900 p-4">
			<h1 className="text-2xl font-bold">My Trainer</h1>
			<p className="text-slate-500 mt-1">Selecciona una rutina</p>

			<div className="mt-4 flex flex-col gap-4">
				{routines.map((r) => (
					<div
						key={r.id}
						className="rounded-2xl  bg-white p-4 shadow-sm"
					>
						<div className="flex items-start justify-between gap-3">
							<div className="min-w-0">
								<div className="text-lg font-semibold truncate">
									{r.name}
								</div>
								<div className="text-sm text-slate-500">
									{r.exercises.length} ejercicios •
									transición {r.transitionSeconds}s
								</div>
							</div>

							<button
								className="px-3 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 font-semibold active:scale-[0.99]"
								onClick={() => setSelectedId(r.id)}
							>
								Empezar
							</button>
						</div>

						<div className="mt-4 border-t border-slate-800 pt-4">
							<label className="text-sm font-medium text-slate-700">
								Transición (segundos)
							</label>

							<div className="mt-2 flex gap-2 items-center">
								<input
									type="number"
									min={0}
									className="w-28 input-sm"
									value={r.transitionSeconds}
									onChange={(e) =>
										updateRoutine({
											...r,
											transitionSeconds:
												Math.max(
													0,
													Number(
														e.target
															.value ||
															0
													)
												),
										})
									}
								/>
								<span className="text-slate-500 text-sm">
									entre ejercicios
								</span>
							</div>

							<div className="mt-4 flex flex-col gap-3">
								{r.exercises.map((ex, idx) => (
									<div
										key={ex.id}
										className="flex items-center justify-between gap-3"
									>
										<div className="min-w-0">
											<div className="font-medium truncate">
												{idx + 1}. {ex.name}
											</div>
											<div className="flex items-center justify-start gap-3">
												<img
													src={ex.image}
													alt={ex.name}
													className="w-12 h-12 rounded-xl bg-slate-100 object-contain border rounded-full border-slate-800"
													loading="lazy"
													onError={() =>
														console.log(
															"IMG ERROR:",
															ex.image
														)
													}
												/>
												<div className="text-xs text-slate-400 truncate">
													{ex.image}
												</div>
											</div>
										</div>

										<input
											type="number"
											min={5}
											step={5}
											className="w-24 shrink-0 input-sm text-right tabular-nums"
											value={ex.seconds}
											onChange={(e) => {
												const nextSeconds =
													Math.max(
														5,
														Number(
															e
																.target
																.value ||
																5
														)
													);
												updateRoutine({
													...r,
													exercises:
														r.exercises.map(
															(
																x
															) =>
																x.id ===
																ex.id
																	? {
																			...x,
																			seconds: nextSeconds,
																	  }
																	: x
														),
												});
											}}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="mt-6 text-xs text-slate-500">
				Imágenes en{" "}
				<span className="font-mono">public/exercises</span>
			</div>
		</div>
	);
}
