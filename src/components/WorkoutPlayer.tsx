import { useEffect, useMemo, useRef, useState } from "react";
import type { Routine } from "../types";
import { beep } from "../lib/beep";
import { PhaseBadge } from "./PhaseBadge";
import { TimerDisplay } from "./TimerDisplay";
import { ExerciseImage } from "./ExerciseImage";
import { WorkoutControls } from "./WorkoutControls";

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

	// Pitidos en los últimos 3 segundos
	useEffect(() => {
		if (!running) return;
		if (phase === "finished") return;
		
		// Pitar en 3, 2 y 1 segundo restante
		if (remaining === 3 || remaining === 2 || remaining === 1) {
			beep(880, 120);
		}
	}, [remaining, running, phase]);

	useEffect(() => {
		if (!running) return;
		if (remaining > 0) return;

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
					className="flex items-center gap-2 px-2 py-2 rounded-xl bg-slate-200 text-slate-800 hover:bg-slate-300 font-medium active:scale-[0.99] transition-all duration-200 shadow-sm"
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

				<div className="text-base md:text-lg ms-2 font-semibold text-slate-900 truncate max-w-[60%]">
					{routine.name}
				</div>
				<div className="w-20"></div>
			</header>

			<main className="flex-1 px-3 md:px-6 pb-3 md:pb-6 flex flex-col gap-3 md:gap-6 max-w-4xl mx-auto w-full">
				<div className="mt-3 md:mt-6 rounded-2xl bg-white shadow-md border border-slate-200 p-4 md:p-8">
					<div className="flex items-center gap-2 mb-2">
						<PhaseBadge phase={phase} />
					</div>
					<div className="text-lg md:text-2xl lg:text-3xl font-bold text-slate-900 mb-4 md:mb-6">
						{title}
					</div>

					{phase !== "finished" && (
						<TimerDisplay
							minutes={mm}
							seconds={ss}
							progress={progress}
						/>
					)}

					{phase === "finished" && (
						<div className="text-center py-6 md:py-8">
							<div className="text-5xl md:text-6xl mb-4">🎉</div>
							<div className="text-lg md:text-xl font-semibold text-slate-700">
								¡Rutina completada!
							</div>
						</div>
					)}
				</div>

				{phase === "exercise" && current?.image && (
					<div className="flex items-center justify-center">
						<div className="w-52 h-52 flex items-center justify-center">
							<ExerciseImage src={current.image} alt={current.name} />
						</div>
					</div>
				)}

				{phase !== "finished" && next && (
					<div className="rounded-2xl bg-white shadow-md border border-slate-200 p-3 ps-5 md:p-5">
						<div className="flex items-center gap-2 mb-2">
							<svg
								className="w-4 h-4 md:w-5 md:h-5 text-blue-600"
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
						<div className="text-base md:text-lg lg:text-xl font-bold text-slate-900">
							{next.name}
						</div>
					</div>
				)}

				<WorkoutControls
					running={running}
					finished={phase === "finished"}
					onStart={handleStart}
					onPause={() => setRunning(false)}
					onSkip={skip}
					onReset={handleReset}
				/>
			</main>
		</div>
	);
}
