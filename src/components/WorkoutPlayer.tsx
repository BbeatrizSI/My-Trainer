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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		<div className="min-h-full bg-slate-100 text-slate-900 flex flex-col">
			<header className="p-4 flex items-center justify-between">
				<button
					className="flex items-center gap-2 px-3 py-2 rounded-xl
               bg-slate-200 text-slate-800
               hover:bg-slate-300
               font-medium
               active:scale-[0.99]"
					onClick={() => {
						setRunning(false);
						onExit();
					}}
				>
					✕<span className="hidden sm:inline">Salir</span>
				</button>

				<div className="text-sm text-slate-500 truncate">
					{routine.name}
				</div>
			</header>

			<main className="flex-1 px-4 pb-4 flex flex-col gap-4">
				<div className="rounded-2xl bg-white shadow-sm p-4">
					<div className="text-slate-500 text-sm">
						{phase === "exercise"
							? "Ejercicio"
							: phase === "transition"
							? "Transición"
							: "Fin"}
					</div>
					<div className="text-xl font-semibold mt-1">
						{title}
					</div>

					{phase !== "finished" && (
						<>
							<div className="mt-3 text-6xl font-bold tabular-nums">
								{mm}:{ss}
							</div>

							<div className="mt-4 h-2 rounded-full bg-slate-200 overflow-hidden">
								<div
									className="h-full bg-blue-600"
									style={{
										width: `${progress * 100}%`,
									}}
								/>
							</div>
						</>
					)}
				</div>

				{phase === "exercise" && current?.image && (
					<div className="rounded-2xl overflow-hidden bg-slate-100 shadow-sm flex items-center justify-center py-2">
						<img
							src={current.image}
							alt={current.name}
							className="w-72 h-72 object-contain rounded-full bg-slate-100"
						/>
					</div>
				)}

				{phase !== "finished" && (
					<div className="rounded-2xl bg-blue-50 border border-blue-200 p-4">
						<div className="text-xs uppercase tracking-wide text-blue-600 font-semibold">
							Siguiente
						</div>
						<div className="mt-1 text-lg font-semibold text-slate-900">
							{next ? next.name : "Fin"}
						</div>
					</div>
				)}

				<div className="mt-auto grid grid-cols-3 gap-3">
					{!running ? (
						<button
							className="col-span-2 py-3 rounded-2xl bg-blue-500 font-semibold active:scale-[0.99]"
							onClick={handleStart}
							disabled={phase === "finished"}
						>
							Empezar
						</button>
					) : (
						<button
							className="col-span-2 py-3 rounded-2xl bg-amber-500 text-slate-950 font-semibold active:scale-[0.99]"
							onClick={() => setRunning(false)}
						>
							Pausa
						</button>
					)}

					<button
						className="py-3 rounded-2xl bg-slate-200 text-slate-800 font-semibold active:scale-[0.99]"
						onClick={skip}
					>
						Saltar
					</button>

					<button
						className="col-span-3 py-3 rounded-2xl bg-slate-200 text-slate-700 active:scale-[0.99]"
						onClick={handleReset}
					>
						Reiniciar
					</button>
				</div>
			</main>
		</div>
	);
}
