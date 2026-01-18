type DeleteRoutineModalProps = {
	routineName: string;
	onConfirm: () => void;
	onCancel: () => void;
};

export function DeleteRoutineModal({
	routineName,
	onConfirm,
	onCancel,
}: DeleteRoutineModalProps) {
	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
				<div className="flex items-center gap-3 mb-4">
					<div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
						<svg
							className="w-6 h-6 text-red-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
					<h3 className="text-xl font-bold text-slate-900">
						¿Eliminar rutina?
					</h3>
				</div>

				<p className="text-slate-600 mb-1">
					¿Estás seguro de que quieres eliminar la rutina{" "}
					<span className="font-semibold text-slate-900">
						"{routineName}"
					</span>
					?
				</p>
				<p className="text-slate-600 mb-5">
					Esta acción no se puede deshacer.
				</p>
				<div className="flex gap-3">
					<button
						onClick={onCancel}
						className="flex-1 px-4 py-2.5 rounded-xl bg-slate-200 text-slate-800 hover:bg-slate-300 font-medium active:scale-[0.98] transition-all"
					>
						Cancelar
					</button>
					<button
						onClick={onConfirm}
						className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 font-medium active:scale-[0.98] transition-all"
					>
						Eliminar
					</button>
				</div>
			</div>
		</div>
	);
}
