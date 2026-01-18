export type ExerciseCatalogItem = {
	id: string;
	name: string;
	image: string;
	category: string;
	defaultSeconds: number;
};

export const exerciseCatalog: ExerciseCatalogItem[] = [
	// Core y Abdominales
	{
		id: "abs-crunch",
		name: "Abdominales Crunch",
		image: "/exercises/abs-crunch.png",
		category: "Core",
		defaultSeconds: 30,
	},
	{
		id: "crunch",
		name: "Crunch",
		image: "/exercises/crunch.png",
		category: "Core",
		defaultSeconds: 30,
	},
	{
		id: "v-position",
		name: "Posición V",
		image: "/exercises/v-position.png",
		category: "Core",
		defaultSeconds: 30,
	},
	{
		id: "leg-lift",
		name: "Elevación de Piernas",
		image: "/exercises/leg-lift.png",
		category: "Core",
		defaultSeconds: 30,
	},
	{
		id: "leg-lift-side",
		name: "Elevación Lateral de Piernas",
		image: "/exercises/leg-lift-side.png",
		category: "Core",
		defaultSeconds: 30,
	},

	// Planks
	{
		id: "hand-plank",
		name: "Plancha sobre Manos",
		image: "/exercises/hand-plank.png",
		category: "Planchas",
		defaultSeconds: 30,
	},
	{
		id: "elbow-plank",
		name: "Plancha sobre Codos",
		image: "/exercises/elbow-plank.png",
		category: "Planchas",
		defaultSeconds: 30,
	},
	{
		id: "side-plank",
		name: "Plancha Lateral",
		image: "/exercises/side-plank.png",
		category: "Planchas",
		defaultSeconds: 30,
	},
	{
		id: "arm-plank",
		name: "Plancha con Brazo",
		image: "/exercises/arm-plank.png",
		category: "Planchas",
		defaultSeconds: 30,
	},
	{
		id: "hand-leg-plank",
		name: "Plancha con Pierna Elevada",
		image: "/exercises/hand-leg-plank.png",
		category: "Planchas",
		defaultSeconds: 30,
	},
	{
		id: "elbow-leg-plank",
		name: "Plancha de Codo con Pierna",
		image: "/exercises/elbow-leg-plank.png",
		category: "Planchas",
		defaultSeconds: 30,
	},
	{
		id: "side-leg-plank",
		name: "Plancha Lateral con Pierna",
		image: "/exercises/side-leg-plank.png",
		category: "Planchas",
		defaultSeconds: 30,
	},
	{
		id: "reverse-plank",
		name: "Plancha Invertida",
		image: "/exercises/reverse-plank.png",
		category: "Planchas",
		defaultSeconds: 30,
	},
	{
		id: "reverse-plank-leg",
		name: "Plancha Invertida con Pierna",
		image: "/exercises/reverse-plank-leg.png",
		category: "Planchas",
		defaultSeconds: 30,
	},
	{
		id: "bird-plank",
		name: "Plancha de Pájaro",
		image: "/exercises/bird-plank.png",
		category: "Planchas",
		defaultSeconds: 30,
	},

	// Piernas - Sentadillas
	{
		id: "squats",
		name: "Sentadillas",
		image: "/exercises/squats.png",
		category: "Piernas",
		defaultSeconds: 30,
	},
	{
		id: "squat-hold",
		name: "Sentadilla Isométrica",
		image: "/exercises/squat-hold.png",
		category: "Piernas",
		defaultSeconds: 30,
	},
	{
		id: "jumping-squats",
		name: "Sentadillas con Salto",
		image: "/exercises/jumping-squats.png",
		category: "Piernas",
		defaultSeconds: 30,
	},
	{
		id: "narrow-squat",
		name: "Sentadilla Estrecha",
		image: "/exercises/narrow-squat.png",
		category: "Piernas",
		defaultSeconds: 30,
	},
	{
		id: "squats-split",
		name: "Sentadilla Split",
		image: "/exercises/squats-split.png",
		category: "Piernas",
		defaultSeconds: 30,
	},
	{
		id: "sumo-squat-hold",
		name: "Sentadilla Sumo Isométrica",
		image: "/exercises/sumo-squat-hold.png",
		category: "Piernas",
		defaultSeconds: 30,
	},
	{
		id: "sumo-hold",
		name: "Postura Sumo",
		image: "/exercises/sumo-hold.png",
		category: "Piernas",
		defaultSeconds: 30,
	},
	{
		id: "side-squat-hold",
		name: "Sentadilla Lateral",
		image: "/exercises/side-squat-hold.png",
		category: "Piernas",
		defaultSeconds: 30,
	},
	{
		id: "wall-sit",
		name: "Silla en la Pared",
		image: "/exercises/wall-sit.png",
		category: "Piernas",
		defaultSeconds: 30,
	},

	// Piernas - Estocadas
	{
		id: "lunge",
		name: "Estocada",
		image: "/exercises/lunge.png",
		category: "Piernas",
		defaultSeconds: 30,
	},
	{
		id: "lunge-hold",
		name: "Estocada Isométrica",
		image: "/exercises/lunge-hold.png",
		category: "Piernas",
		defaultSeconds: 30,
	},
	{
		id: "reverse-lunge",
		name: "Estocada Inversa",
		image: "/exercises/reverse-lunge.png",
		category: "Piernas",
		defaultSeconds: 30,
	},
	{
		id: "side-plunge",
		name: "Estocada Lateral",
		image: "/exercises/side-plunge.png",
		category: "Piernas",
		defaultSeconds: 30,
	},

	// Piernas - Otros
	{
		id: "single-leg",
		name: "Pierna Única Elevada",
		image: "/exercises/single-leg.png",
		category: "Piernas",
		defaultSeconds: 60,
	},
	{
		id: "high-leg",
		name: "Elevación de Rodillas",
		image: "/exercises/high-leg.png",
		category: "Piernas",
		defaultSeconds: 30,
	},

	// Glúteos
	{
		id: "bridge",
		name: "Puente de Glúteos",
		image: "/exercises/bridge.png",
		category: "Glúteos",
		defaultSeconds: 30,
	},
	{
		id: "bridge-leg",
		name: "Puente con Pierna Elevada",
		image: "/exercises/bridge-leg.png",
		category: "Glúteos",
		defaultSeconds: 30,
	},
	{
		id: "butt",
		name: "Activación de Glúteos",
		image: "/exercises/butt.png",
		category: "Glúteos",
		defaultSeconds: 30,
	},
	{
		id: "butt-4",
		name: "Activación Glúteos en 4",
		image: "/exercises/butt-4.png",
		category: "Glúteos",
		defaultSeconds: 30,
	},

	// Brazos y Hombros
	{
		id: "push-up",
		name: "Flexiones",
		image: "/exercises/push-up.png",
		category: "Brazos",
		defaultSeconds: 30,
	},
	{
		id: "spider-pushup",
		name: "Flexiones Araña",
		image: "/exercises/spider-pushup.png",
		category: "Brazos",
		defaultSeconds: 30,
	},
	{
		id: "triceps",
		name: "Fondos de Tríceps",
		image: "/exercises/triceps.png",
		category: "Brazos",
		defaultSeconds: 30,
	},
	{
		id: "bend-elbows",
		name: "Flexión de Codos",
		image: "/exercises/bend-elbows.png",
		category: "Brazos",
		defaultSeconds: 30,
	},
	{
		id: "wall-arms",
		name: "Brazos en Pared",
		image: "/exercises/wall-arms.png",
		category: "Brazos",
		defaultSeconds: 30,
	},

	// Pecho
	{
		id: "pecs",
		name: "Pectorales",
		image: "/exercises/pecs.png",
		category: "Pecho",
		defaultSeconds: 30,
	},

	// Espalda
	{
		id: "back",
		name: "Extensión de Espalda",
		image: "/exercises/back.png",
		category: "Espalda",
		defaultSeconds: 30,
	},
	{
		id: "superman",
		name: "Superman",
		image: "/exercises/superman.png",
		category: "Espalda",
		defaultSeconds: 30,
	},
	{
		id: "bird-dog",
		name: "Pájaro-Perro",
		image: "/exercises/bird-dog.png",
		category: "Espalda",
		defaultSeconds: 30,
	},

	// Yoga/Poses
	{
		id: "dog",
		name: "Perro Boca Abajo",
		image: "/exercises/dog.png",
		category: "Yoga",
		defaultSeconds: 30,
	},
	{
		id: "cow-cat",
		name: "Gato-Vaca",
		image: "/exercises/cow-cat.png",
		category: "Yoga",
		defaultSeconds: 60,
	},
	{
		id: "baby",
		name: "Postura del Niño",
		image: "/exercises/baby.png",
		category: "Yoga",
		defaultSeconds: 60,
	},
	{
		id: "snake",
		name: "Postura de la Cobra",
		image: "/exercises/snake.png",
		category: "Yoga",
		defaultSeconds: 30,
	},
	{
		id: "pigeon",
		name: "Postura de la Paloma",
		image: "/exercises/pigeon.png",
		category: "Yoga",
		defaultSeconds: 60,
	},
	{
		id: "lizzard",
		name: "Postura del Lagarto",
		image: "/exercises/lizzard.png",
		category: "Yoga",
		defaultSeconds: 60,
	},
	{
		id: "bug",
		name: "Postura del Insecto",
		image: "/exercises/bug.png",
		category: "Yoga",
		defaultSeconds: 30,
	},
	{
		id: "bulldog",
		name: "Postura del Bulldog",
		image: "/exercises/bulldog.png",
		category: "Yoga",
		defaultSeconds: 30,
	},
	{
		id: "cross",
		name: "Cruz/Cruce",
		image: "/exercises/cross.png",
		category: "Yoga",
		defaultSeconds: 30,
	},

	// Estiramientos - Cuello y Hombros
	{
		id: "neck-side",
		name: "Estiramiento de Cuello Lateral",
		image: "/exercises/neck-side.png",
		category: "Estiramientos",
		defaultSeconds: 60,
	},
	{
		id: "scalps",
		name: "Estiramiento de Trapecios",
		image: "/exercises/scalps.png",
		category: "Estiramientos",
		defaultSeconds: 45,
	},
	{
		id: "shoulders",
		name: "Estiramiento de Hombros",
		image: "/exercises/shoulders.png",
		category: "Estiramientos",
		defaultSeconds: 60,
	},
	{
		id: "arm-hug",
		name: "Abrazo de Brazos",
		image: "/exercises/arm-hug.png",
		category: "Estiramientos",
		defaultSeconds: 60,
	},

	// Estiramientos - Pecho
	{
		id: "open-chest",
		name: "Apertura de Pecho",
		image: "/exercises/open-chest.png",
		category: "Estiramientos",
		defaultSeconds: 60,
	},
	{
		id: "open-pec",
		name: "Apertura Pectoral",
		image: "/exercises/open-pec.png",
		category: "Estiramientos",
		defaultSeconds: 60,
	},
	{
		id: "door-pecs",
		name: "Estiramiento de Pectorales en Marco",
		image: "/exercises/door-pecs.png",
		category: "Estiramientos",
		defaultSeconds: 60,
	},
	{
		id: "up-arms",
		name: "Brazos Arriba",
		image: "/exercises/up-arms.png",
		category: "Estiramientos",
		defaultSeconds: 30,
	},

	// Estiramientos - Columna
	{
		id: "spine-twist",
		name: "Torsión de Columna",
		image: "/exercises/spine-twist.png",
		category: "Estiramientos",
		defaultSeconds: 60,
	},

	// Estiramientos - Caderas
	{
		id: "butterfly",
		name: "Mariposa",
		image: "/exercises/butterfly.png",
		category: "Estiramientos",
		defaultSeconds: 90,
	},
	{
		id: "butterfly-sit",
		name: "Mariposa Sentada",
		image: "/exercises/butterfly-sit.png",
		category: "Estiramientos",
		defaultSeconds: 90,
	},
	{
		id: "butterfly-bend",
		name: "Mariposa con Flexión",
		image: "/exercises/butterfly-bend.png",
		category: "Estiramientos",
		defaultSeconds: 90,
	},
	{
		id: "knee-hug",
		name: "Abrazo de Rodilla",
		image: "/exercises/knee-hug.png",
		category: "Estiramientos",
		defaultSeconds: 60,
	},

	// Estiramientos - Piernas
	{
		id: "harmstring",
		name: "Estiramiento de Isquiotibiales",
		image: "/exercises/harmstring.png",
		category: "Estiramientos",
		defaultSeconds: 90,
	},
	{
		id: "quad",
		name: "Estiramiento de Cuádriceps",
		image: "/exercises/quad.png",
		category: "Estiramientos",
		defaultSeconds: 60,
	},
	{
		id: "touch-floor",
		name: "Tocar el Suelo",
		image: "/exercises/touch-floor.png",
		category: "Estiramientos",
		defaultSeconds: 60,
	},
	{
		id: "touch-foot",
		name: "Tocar el Pie",
		image: "/exercises/touch-foot.png",
		category: "Estiramientos",
		defaultSeconds: 60,
	},
	{
		id: "touch-toe",
		name: "Tocar los Dedos",
		image: "/exercises/touch-toe.png",
		category: "Estiramientos",
		defaultSeconds: 60,
	},
	{
		id: "touch-toes-sit",
		name: "Tocar Dedos Sentado",
		image: "/exercises/touch-toes-sit.png",
		category: "Estiramientos",
		defaultSeconds: 90,
	},
	{
		id: "wide-floor",
		name: "Piernas Abiertas al Suelo",
		image: "/exercises/wide-floor.png",
		category: "Estiramientos",
		defaultSeconds: 60,
	},

	// Estiramientos - Muñecas
	{
		id: "wrist",
		name: "Estiramiento de Muñecas",
		image: "/exercises/wrist.png",
		category: "Estiramientos",
		defaultSeconds: 45,
	},
];

export const categories = [
	"Core",
	"Planchas",
	"Piernas",
	"Glúteos",
	"Brazos",
	"Pecho",
	"Espalda",
	"Yoga",
	"Estiramientos",
] as const;
