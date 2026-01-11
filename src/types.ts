export type Exercise = {
	id: string;
	name: string;
	seconds: number;
	image: string; // ruta en /public
};

export type Routine = {
	id: string;
	name: string;
	transitionSeconds: number;
	exercises: Exercise[];
};
