import { useEffect, useMemo, useRef, useState } from "react";
import type { Routine } from "../types";
import { beep } from "../lib/beep";

type Phase = "exercise" | "transition" | "finished";

export function WorkoutPlayer({
	routine,
	onExit,
}: {
	routine: Routine;
	onExit: () => void;
}) {
	const [index, setIndex] = useState(0);
	const [phase, setPhase] = useState<Phase>("exercise");
	const [running, setRunning] = useState(false);
	const [remaining, setRemaining] = useState(
		routine.exercises[0]?.seconds ?? 0
	);

	const tickRef = useRef<number | null>(null);

	const current = routine.exercises[index];
	const next = routine.exercises[index + 1];

	const title = useMemo(() => {
		if (phase === "transition") return "Transición";
		if (phase === "finished") return "¡Rutina terminada!";
		return current?.name ?? "";
	}, [phase, current]);

	function clearTick() {
		if (tickRef.current) window.clearInterval(tickRef.current);
		tickRef.current = null;
	}

	useEffect(() => {
		if (!running) {
			clearTick();
			return;
		}
		clearTick();
		tickRef.current = window.setInterval(
			() => setRemaining((r) => r - 1),
			1000
		);
		return clearTick;
	}, [running]);

	useEffect(() => {
		if (!running) return;
		if (remaining > 0) return;

		beep(880, 120);

		if (phase === "exercise") {
			if (index === routine.exercises.length - 1) {
				setPhase("finished");
				setRunning(false);
				return;
			}
			setPhase("transition");
			setRemaining(routine.transitionSeconds);
			return;
		}

		if (phase === "transition") {
			setPhase("exercise");
			setIndex((i) => i + 1);
			setRemaining(routine.exercises[index + 1].seconds);
		}
	}, [remaining, running, phase, index, routine]);

	useEffect(() => {
		if (phase !== "exercise") return;
		const ex = routine.exercises[index];
		if (ex) setRemaining(ex.seconds);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [index]);

	function handleStart() {
		// “desbloquea” audio en móviles al primer tap
		beep(440, 60, 0.0001);
		setRunning(true);
	}

	function handleReset() {
		setRunning(false);
		setPhase("exercise");
		setIndex(0);
		setRemaining(routine.exercises[0]?.seconds ?? 0);
	}

	function skip() {
		if (phase === "finished") return;

		beep(660, 100);

		if (phase === "exercise") {
			if (index === routine.exercises.length - 1) {
				setPhase("finished");
				setRunning(false);
			} else {
				setPhase("transition");
				setRemaining(routine.transitionSeconds);
			}
			return;
		}

		if (phase === "transition") {
			setPhase("exercise");
			setIndex((i) => i + 1);
			setRemaining(routine.exercises[index + 1].seconds);
		}
	}

	const total = Math.max(
		1,
		phase === "exercise"
			? current?.seconds ?? 1
			: routine.transitionSeconds
	);
	const progress = Math.min(1, Math.max(0, remaining) / total);

	const mm = String(Math.floor(Math.max(0, remaining) / 60)).padStart(
		2,
		"0"
	);
	const ss = String(Math.max(0, remaining) % 60).padStart(2, "0");

	return (
		<div className="min-h-full bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 flex flex-col">
			<header className="p-4 md:p-6 flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-sm">
				<button
					className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200 text-slate-800 hover:bg-slate-300 font-medium active:scale-[0.99] transition-all duration-200 shadow-sm"
					onClick={() => {
						setRunning(false);
						onExit();
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
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
					<span className="hidden sm:inline">Salir</span>
				</button>

				<div className="text-base md:text-lg font-semibold text-slate-900 truncate max-w-[60%]">
					{routine.name}
				</div>
				<div className="w-20"></div>
			</header>

			<main className="flex-1 px-4 md:px-6 pb-4 md:pb-6 flex flex-col gap-6 max-w-4xl mx-auto w-full">
				<div className="mt-6 rounded-2xl bg-white shadow-md border border-slate-200 p-6 md:p-8">
					<div className="flex items-center gap-2 mb-2">
						{phase === "exercise" && (
							<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
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
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/>
								</svg>
								Ejercicio
							</span>
						)}
						{phase === "transition" && (
							<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
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
								Transición
							</span>
						)}
						{phase === "finished" && (
							<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
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
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								Completado
							</span>
						)}
					</div>
					<div className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
						{title}
					</div>

					{phase !== "finished" && (
						<>
							<div className="text-7xl md:text-8xl font-bold tabular-nums bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
								{mm}:{ss}
							</div>

							<div className="h-3 rounded-full bg-slate-200 overflow-hidden shadow-inner">
								<div
									className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-linear"
									style={{
										width: `${progress * 100}%`,
									}}
								/>
							</div>
						</>
					)}

					{phase === "finished" && (
						<div className="text-center py-8">
							<div className="text-6xl mb-4">🎉</div>
							<div className="text-xl font-semibold text-slate-700">
								¡Rutina completada!
							</div>
						</div>
					)}
				</div>

				{phase === "exercise" && current?.image && (
					<div className="flex items-center justify-center">
						<div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white shadow-lg border-4 border-slate-200 overflow-hidden">
							<img
								src={current.image}
								alt={current.name}
								className="w-full h-full object-cover"
								loading="lazy"
								onError={() =>
									console.log("IMG ERROR:", current.image)
								}
							/>
						</div>
					</div>
				)}

				{phase !== "finished" && next && (
					<div className="rounded-2xl bg-white shadow-md border border-slate-200 p-4 md:p-5">
						<div className="flex items-center gap-2 mb-2">
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
									d="M13 7l5 5m0 0l-5 5m5-5H6"
								/>
							</svg>
							<div className="text-xs uppercase tracking-wide text-blue-600 font-semibold">
								Siguiente
							</div>
						</div>
						<div className="text-lg md:text-xl font-bold text-slate-900">
							{next.name}
						</div>
					</div>
				)}

				<div className="mt-auto grid grid-cols-3 gap-3 md:gap-4">
					{!running ? (
						<button
							className="col-span-2 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold active:scale-[0.99] shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
							onClick={handleStart}
							disabled={phase === "finished"}
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
					) : (
						<button
							className="col-span-2 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold active:scale-[0.99] shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
							onClick={() => setRunning(false)}
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
									d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							Pausa
						</button>
					)}

					<button
						className="py-4 rounded-2xl bg-white border-2 border-slate-300 text-slate-800 font-semibold active:scale-[0.99] shadow-sm hover:shadow-md hover:border-slate-400 transition-all duration-200 flex items-center justify-center gap-2"
						onClick={skip}
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
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							/>
						</svg>
						<span className="hidden sm:inline">Saltar</span>
					</button>

					<button
						className="col-span-3 py-3 rounded-2xl bg-white border-2 border-slate-300 text-slate-700 font-semibold active:scale-[0.99] shadow-sm hover:shadow-md hover:border-slate-400 transition-all duration-200 flex items-center justify-center gap-2"
						onClick={handleReset}
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
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
						Reiniciar
					</button>
				</div>
			</main>
		</div>
	);
}
