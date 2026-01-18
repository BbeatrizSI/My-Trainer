type WorkoutControlsProps = {
	running: boolean;
	finished: boolean;
	onStart: () => void;
	onPause: () => void;
	onSkip: () => void;
	onReset: () => void;
};

export function WorkoutControls({
	running,
	finished,
	onStart,
	onPause,
	onSkip,
	onReset,
}: WorkoutControlsProps) {
	return (
		<div className="mt-auto grid grid-cols-3 gap-2 md:gap-4">
			{!running ? (
				<button
					className="col-span-2 py23 md:py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold active:scale-[0.99] shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-md md:text-base"
					onClick={onStart}
					disabled={finished}
				>
					<svg
						className="w-6 h-6 md:w-5 md:h-5"
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
			) : (
				<button
					className="col-span-2 py-3 md:py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold active:scale-[0.99] shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-md md:text-base"
					onClick={onPause}
				>
					<svg
						className="w-6 h-6 md:w-5 md:h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					Pausa
				</button>
			)}

			<button
				className="py-3 md:py-4 rounded-2xl bg-white border-2 border-slate-300 text-slate-800 font-semibold active:scale-[0.99] shadow-sm hover:shadow-md hover:border-slate-400 transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base"
				onClick={onSkip}
			>
				<svg
					className="w-6 h-6 md:w-5 md:h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M13 7l5 5m0 0l-5 5m5-5H6"
					/>
				</svg>
				<span className="hidden sm:inline">Saltar</span>
			</button>

			<button
				className="col-span-3 py-2.5 md:py-3 rounded-2xl bg-white border-2 border-slate-300 text-slate-700 font-semibold active:scale-[0.99] shadow-sm hover:shadow-md hover:border-slate-400 transition-all duration-200 flex items-center justify-center gap-2 text-md md:text-base"
				onClick={onReset}
			>
				<svg
					className="w-5 h-5 md:w-5 md:h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
					/>
				</svg>
				Reiniciar
			</button>
		</div>
	);
}
