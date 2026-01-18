import { useState } from "react";
import type { Routine, Exercise } from "../types";
import {
	exerciseCatalog,
	categories,
	type ExerciseCatalogItem,
} from "../data/exerciseCatalog";
import { ExerciseImage } from "./ExerciseImage";

export function RoutineCreator({
	onSave,
	onCancel,
}: {
	onSave: (routine: Routine) => void;
	onCancel: () => void;
}) {
	const [name, setName] = useState("");
	const [transitionSeconds, setTransitionSeconds] = useState(10);
	const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
	const [showCatalog, setShowCatalog] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<string>("Todas");

	const filteredExercises =
		selectedCategory === "Todas"
			? exerciseCatalog
			: exerciseCatalog.filter((ex) => ex.category === selectedCategory);

	function addExercise(item: ExerciseCatalogItem) {
		const newExercise: Exercise = {
			// eslint-disable-next-line react-hooks/purity
			id: `${item.id}-${Date.now()}`,
			name: item.name,
			seconds: item.defaultSeconds,
			image: item.image,
		};
		setSelectedExercises([...selectedExercises, newExercise]);
		setShowCatalog(false);
	}

	function removeExercise(id: string) {
		setSelectedExercises(selectedExercises.filter((ex) => ex.id !== id));
	}

	function updateExerciseSeconds(id: string, seconds: number) {
		setSelectedExercises(
			selectedExercises.map((ex) =>
				ex.id === id ? { ...ex, seconds } : ex
			)
		);
	}

	function moveExercise(index: number, direction: "up" | "down") {
		const newIndex = direction === "up" ? index - 1 : index + 1;
		if (newIndex < 0 || newIndex >= selectedExercises.length) return;

		const newExercises = [...selectedExercises];
		[newExercises[index], newExercises[newIndex]] = [
			newExercises[newIndex],
			newExercises[index],
		];
		setSelectedExercises(newExercises);
	}

	function handleSave() {
		if (!name.trim() || selectedExercises.length === 0) return;

		const routine: Routine = {
			id: `routine-${Date.now()}`,
			name: name.trim(),
			transitionSeconds,
			exercises: selectedExercises,
		};

		onSave(routine);
	}

	const totalSeconds = selectedExercises.reduce(
		(acc, ex) => acc + ex.seconds,
		0
	);
	const totalWithTransitions =
		totalSeconds + transitionSeconds * (selectedExercises.length - 1);

	return (
		<div className="min-h-full bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
			<header className="p-4 md:p-6 flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-sm">
				<button
					className="flex items-center gap-2 px-2 py-2 rounded-xl bg-slate-200 text-slate-800 hover:bg-slate-300 font-medium active:scale-[0.99] transition-all"
					onClick={onCancel}
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
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<h1 className="text-xl font-bold text-slate-900">
					Nueva Rutina
				</h1>

				<button
					className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] transition-all"
					onClick={handleSave}
					disabled={!name.trim() || selectedExercises.length === 0}
				>
					Guardar
				</button>
			</header>

			<main className="flex-1 p-4 md:p-6 max-w-4xl mx-auto w-full">
				{/* Configuración básica */}
				<div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 md:p-6 mb-4">
					<h2 className="text-lg font-bold text-slate-900 mb-4">
						Configuración
					</h2>

					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-slate-700 mb-2">
								Nombre de la rutina
							</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Ej: Mi Rutina Personalizada"
								className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div className="flex items-center gap-2 justify-between">
							<label className="block text-sm font-medium text-slate-700">
								Tiempo de transición (seg.)
							</label>
							<input
								type="number"
								value={transitionSeconds}
								onChange={(e) =>
									setTransitionSeconds(
										Math.max(
											0,
											parseInt(e.target.value) || 0
										)
									)
								}
								min="0"
								className="w-14 px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div className="flex gap-4 text-sm text-slate-600">
							<div>
								<span className="font-semibold">
									{selectedExercises.length}
								</span>{" "}
								ejercicios
							</div>
							<div>
								<span className="font-semibold">
									{Math.floor(totalWithTransitions / 60)}:
									{String(totalWithTransitions % 60).padStart(
										2,
										"0"
									)}
								</span>{" "}
								min totales
							</div>
						</div>
					</div>
				</div>

				{/* Lista de ejercicios seleccionados */}
				<div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 md:p-6 mb-4">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-lg font-bold text-slate-900">
							Ejercicios
						</h2>
						<button
							onClick={() => setShowCatalog(true)}
							className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 active:scale-[0.99] transition-all"
						>
							+ Añadir ejercicio
						</button>
					</div>

					{selectedExercises.length === 0 ? (
						<div className="text-center py-8 text-slate-500">
							<svg
								className="w-16 h-16 mx-auto mb-3 text-slate-300"
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
							<p>Aún no has añadido ejercicios</p>
							<p className="text-sm mt-1">
								Haz clic en "Añadir ejercicio" para empezar
							</p>
						</div>
					) : (
						<div className="space-y-3">
							{selectedExercises.map((exercise, idx) => (
								<div
									key={exercise.id}
									className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200"
								>
									<div className="flex flex-col gap-1">
										<button
											onClick={() =>
												moveExercise(idx, "up")
											}
											disabled={idx === 0}
											className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
										>
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
													d="M5 15l7-7 7 7"
												/>
											</svg>
										</button>
										<button
											onClick={() =>
												moveExercise(idx, "down")
											}
											disabled={
												idx ===
												selectedExercises.length - 1
											}
											className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
										>
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
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										</button>
									</div>

									<div className="w-16 h-16 flex-shrink-0">
										<ExerciseImage
											src={exercise.image}
											alt={exercise.name}
										/>
									</div>

									<div className="flex-1 min-w-0">
										<div className="font-medium text-slate-900 truncate">
											{exercise.name}
										</div>
										<div className="flex items-center gap-2 mt-1">
											<input
												type="number"
												value={exercise.seconds}
												onChange={(e) =>
													updateExerciseSeconds(
														exercise.id,
														Math.max(
															1,
															parseInt(
																e.target.value
															) || 1
														)
													)
												}
												min="1"
												className="w-14 px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
											/>
											<span className="text-sm text-slate-600">
												seg.
											</span>
										</div>
									</div>

									<button
										onClick={() =>
											removeExercise(exercise.id)
										}
										className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</button>
								</div>
							))}
						</div>
					)}
				</div>
			</main>

			{/* Modal de catálogo */}
			{showCatalog && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
						<div className="p-4 md:p-6 border-b border-slate-200">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-bold text-slate-900">
									Seleccionar Ejercicio
								</h2>
								<button
									onClick={() => setShowCatalog(false)}
									className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
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
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>

							<div className="flex gap-2 flex-wrap">
								<button
									onClick={() => setSelectedCategory("Todas")}
									className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
										selectedCategory === "Todas"
											? "bg-blue-600 text-white"
											: "bg-slate-100 text-slate-700 hover:bg-slate-200"
									}`}
								>
									Todas
								</button>
								{categories.map((cat) => (
									<button
										key={cat}
										onClick={() => setSelectedCategory(cat)}
										className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
											selectedCategory === cat
												? "bg-blue-600 text-white"
												: "bg-slate-100 text-slate-700 hover:bg-slate-200"
										}`}
									>
										{cat}
									</button>
								))}
							</div>
						</div>

						<div className="flex-1 overflow-y-auto p-4 md:p-6">
							<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
								{filteredExercises.map((item) => (
									<button
										key={item.id}
										onClick={() => addExercise(item)}
										className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all active:scale-[0.98]"
									>
										<div className="w-full aspect-square">
											<ExerciseImage
												src={item.image}
												alt={item.name}
											/>
										</div>
										<div className="text-sm font-medium text-slate-900 text-center">
											{item.name}
										</div>
										<div className="text-xs text-slate-600">
											{item.defaultSeconds}s
										</div>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
