import type { Routine } from "../types";

export const defaultRoutines: Routine[] = [
	{
		id: "legs-core-activation",
		name: "Activación Piernas y Core",
		transitionSeconds: 10,
		exercises: [
			{
				id: "front-leg-raise",
				name: "Pierna levantada hacia adelante",
				seconds: 60,
				image: "/exercises/pierna-adelante.png",
			},
			{
				id: "back-leg-raise",
				name: "Pierna levantada hacia atrás",
				seconds: 60,
				image: "/exercises/pierna-atras.png",
			},
			{
				id: "split-squat",
				name: "Sentadillas Split",
				seconds: 60,
				image: "/exercises/sentadilla-split.png",
			},
			{
				id: "air-squat",
				name: "Sentadillas de Aire",
				seconds: 30,
				image: "/exercises/squats-split.png",
			},
			{
				id: "squat-hold",
				name: "Postura de Cuclillas",
				seconds: 30,
				image: "/exercises/cuclillas.png",
			},
			{
				id: "jump-squat",
				name: "Sentadillas con salto",
				seconds: 30,
				image: "/exercises/sentadilla-salto.png",
			},
			{
				id: "narrow-squat-hold",
				name: "Postura Sentadilla Estrecha",
				seconds: 30,
				image: "/exercises/sentadilla-estrecha.png",
			},
		],
	},
];
