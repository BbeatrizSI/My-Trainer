import type { Exercise } from "../types";
import { getImagePath } from "../lib/imagePath";

type ExerciseItemProps = {
	exercise: Exercise;
	index: number;
	onUpdate: (exercise: Exercise) => void;
};

export function ExerciseItem({
	exercise,
	index,
	onUpdate,
}: ExerciseItemProps) {
	return (
		<div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all duration-200">
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-4 min-w-0 flex-1">
					<div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs text-slate-500 font-medium">
						{index + 1}
					</div>
					<div className="min-w-0 flex-1">
						<div className="font-semibold text-slate-900 mb-3">
							{exercise.name}
						</div>
						<div className="flex items-center gap-3">
							<div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden flex-shrink-0">
								<img
									src={getImagePath(exercise.image)}
									alt={exercise.name}
									className="w-full h-full object-cover"
									loading="lazy"
									onError={() =>
										console.log("IMG ERROR:", exercise.image)
									}
								/>
							</div>
							<div className="text-xs text-slate-500 font-mono truncate max-w-[200px]">
								{exercise.image}
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
						value={exercise.seconds}
						onChange={(e) => {
							const nextSeconds = Math.max(
								5,
								Number(e.target.value || 5)
							);
							onUpdate({
								...exercise,
								seconds: nextSeconds,
							});
						}}
					/>
				</div>
			</div>
		</div>
	);
}
