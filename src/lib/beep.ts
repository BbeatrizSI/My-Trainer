let audioCtx: AudioContext | null = null;

export function beep(freq = 880, durationMs = 120, volume = 0.08) {
	if (!audioCtx) audioCtx = new AudioContext();

	const ctx = audioCtx;
	const osc = ctx.createOscillator();
	const gain = ctx.createGain();

	osc.type = "sine";
	osc.frequency.value = freq;
	gain.gain.value = volume;

	osc.connect(gain);
	gain.connect(ctx.destination);

	osc.start();
	setTimeout(() => {
		osc.stop();
		osc.disconnect();
		gain.disconnect();
	}, durationMs);
}
