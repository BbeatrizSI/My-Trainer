import { useState } from "react";
import type { Routine } from "../types";
import { ExerciseItem } from "./ExerciseItem";
import { DeleteRoutineModal } from "./DeleteRoutineModal";

type RoutineCardProps = {
	routine: Routine;
	onStart: () => void;
	onUpdate: (routine: Routine) => void;
	onDelete: () => void;
};

export function RoutineCard({ routine, onStart, onUpdate, onDelete }: RoutineCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	return (
		<div className="rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 hover:bg-slate-50/30">
			<div className="w-full">
				<div className="relative p-4 md:p-6 flex items-start gap-3">
					<button
						className="flex-1 min-w-0 text-left transition-all duration-200 group"
						onClick={() => setIsExpanded(!isExpanded)}
					>
						<div className="text-xl md:text-2xl font-bold text-slate-900 mb-2 line-clamp-2">
							{routine.name}
						</div>
						<div className="flex items-center mt-5 gap-3 flex-nowrap">
							<span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium whitespace-nowrap">
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
								{routine.exercises.length} Ejercicios
							</span>
							<span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium whitespace-nowrap">
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
								Transición {routine.transitionSeconds}s
							</span>
						</div>
					</button>

					<div className="flex items-center gap-3 shrink-0">
						<button
							className="px-4 md:px-5 py-2 md:py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 font-semibold shadow-md hover:shadow-lg active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base"
							onClick={(e) => {
								e.stopPropagation();
								onStart();
							}}
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
									d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span className="hidden sm:inline">Empezar</span>
						</button>

						<button
							className={`text-slate-400 hover:text-slate-600 transition-transform duration-300 shrink-0 ${
								isExpanded ? "rotate-180" : ""
							}`}
							onClick={(e) => {
								e.stopPropagation();
								setIsExpanded(!isExpanded);
							}}
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
						</button>
					</div>
				</div>

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
										className="w-14 px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-sm font-medium"
										value={routine.transitionSeconds}
										onChange={(e) =>
											onUpdate({
												...routine,
												transitionSeconds: Math.max(
													0,
													Number(e.target.value || 0)
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
									Ejercicios de la rutina:
								</h3>
								<div className="flex flex-col gap-3">
									{routine.exercises.map((ex, idx) => (
										<ExerciseItem
											key={ex.id}
											exercise={ex}
											index={idx}
											onUpdate={(updated) =>
												onUpdate({
													...routine,
													exercises: routine.exercises.map(
														(x) =>
															x.id === updated.id
																? updated
																: x
													),
												})
											}
										/>
									))}
								</div>
							</div>

							{/* Botón de eliminar rutina */}
							<button
								onClick={() => setShowDeleteModal(true)}
								className="w-full mt-4 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-medium active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-red-200"
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
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
								Eliminar rutina
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Modal de confirmación de eliminación */}
			{showDeleteModal && (
				<DeleteRoutineModal
					routineName={routine.name}
					onConfirm={() => {
						setShowDeleteModal(false);
						onDelete();
					}}
					onCancel={() => setShowDeleteModal(false)}
				/>
			)}
		</div>
	);
}
