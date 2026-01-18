type TimerDisplayProps = {
	minutes: string;
	seconds: string;
	progress: number;
};

export function TimerDisplay({
	minutes,
	seconds,
	progress,
}: TimerDisplayProps) {
	return (
		<>
			<div className="text-5xl md:text-7xl lg:text-8xl font-bold tabular-nums bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6">
				{minutes}:{seconds}
			</div>

			<div className="h-2 md:h-3 rounded-full bg-slate-200 overflow-hidden shadow-inner">
				<div
					className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-linear"
					style={{
						width: `${progress * 100}%`,
					}}
				/>
			</div>
		</>
	);
}
