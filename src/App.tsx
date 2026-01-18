import { useMemo, useState } from "react";
import type { Routine } from "./types";
import { loadRoutines, saveRoutines } from "./stores/routines";
import { WorkoutPlayer } from "./components/WorkoutPlayer";
import { getImagePath } from "./lib/imagePath";

export default function App() {
	const [routines, setRoutines] = useState<Routine[]>(() => loadRoutines());
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [expandedRoutines, setExpandedRoutines] = useState<Set<string>>(
		new Set()
	);

	const selected = useMemo(
		() => routines.find((r) => r.id === selectedId) ?? null,
		[routines, selectedId]
	);

	function toggleRoutine(id: string) {
		setExpandedRoutines((prev) => {
			const next = new Set(prev);
			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			return next;
		});
	}

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
					{routines.map((r) => {
						const isExpanded = expandedRoutines.has(r.id);
						return (
							<div
								key={r.id}
								className="rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200"
							>
								<button
									className="w-full p-5 md:p-6 flex items-center justify-between gap-4 hover:bg-slate-50 transition-all duration-200 group"
									onClick={() => toggleRoutine(r.id)}
								>
									<div className="min-w-0 flex-1 text-left">
										<div className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
											{r.name}
										</div>
										<div className="flex items-center gap-3 flex-wrap">
											<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
													/>
												</svg>
												{r.exercises.length} ejercicios
											</span>
											<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
												Transición {r.transitionSeconds}s
											</span>
										</div>
									</div>

									<div className="flex items-center gap-3 shrink-0">
										<button
											className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 font-semibold shadow-md hover:shadow-lg active:scale-[0.97] transition-all duration-200 flex items-center gap-2"
											onClick={(e) => {
												e.stopPropagation();
												setSelectedId(r.id);
											}}
										>
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											Empezar
										</button>
										<div
											className={`text-slate-400 group-hover:text-slate-600 transition-transform duration-300 ${
												isExpanded ? "rotate-180" : ""
											}`}
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
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										</div>
									</div>
								</button>

								{isExpanded && (
									<div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-slate-200 bg-slate-50/50 transition-all duration-300 ease-in-out">
										<div className="pt-5 md:pt-6 space-y-6">
											<div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
												<label className="text-sm font-semibold text-slate-700 mb-3 block">
													⏱️ Tiempo de transición
												</label>

												<div className="flex gap-3 items-center">
													<input
														type="number"
														min={0}
														className="w-32 px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-sm font-medium"
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
													<span className="text-slate-600 text-sm font-medium">
														segundos entre ejercicios
													</span>
												</div>
											</div>

											<div>
												<h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
													<svg
														className="w-5 h-5 text-blue-600"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
														/>
													</svg>
													Ejercicios de la rutina
												</h3>
												<div className="flex flex-col gap-3">
													{r.exercises.map((ex, idx) => (
														<div
															key={ex.id}
															className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all duration-200"
														>
															<div className="flex items-center justify-between gap-4">
																<div className="flex items-center gap-4 min-w-0 flex-1">
																	<div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs text-slate-500 font-medium">
																		{idx + 1}
																	</div>
																	<div className="min-w-0 flex-1">
																		<div className="font-semibold text-slate-900 mb-3">
																			{ex.name}
																		</div>
																		<div className="flex items-center gap-3">
																			<div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden flex-shrink-0">
																				<img
																					src={getImagePath(ex.image)}
																					alt={ex.name}
																					className="w-full h-full object-cover"
																					loading="lazy"
																					onError={() =>
																						console.log(
																							"IMG ERROR:",
																							ex.image
																						)
																					}
																				/>
																			</div>
																			<div className="text-xs text-slate-500 font-mono truncate max-w-[200px]">
																				{ex.image}
																			</div>
																		</div>
																	</div>
																</div>

																<div className="flex items-center gap-2 shrink-0">
																	<label className="text-xs font-medium text-slate-600 whitespace-nowrap">
																		Tiempo s.
																	</label>
																	<input
																		type="number"
																		min={5}
																		step={5}
																		className="w-14 px-2 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-right tabular-nums font-semibold text-slate-900"
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
															</div>
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						);
					})}
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
