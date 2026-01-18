import { getImagePath } from "../lib/imagePath";

type ExerciseImageProps = {
	src: string;
	alt: string;
};

export function ExerciseImage({ src, alt }: ExerciseImageProps) {
	return (
		<div className="flex items-center justify-center">
			<div className="w-18 h-18 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-white shadow-lg border-4 border-slate-200 overflow-hidden">
				<img
					src={getImagePath(src)}
					alt={alt}
					className="w-full h-full object-cover"
					loading="lazy"
					onError={() => console.log("IMG ERROR:", src)}
				/>
			</div>
		</div>
	);
}
