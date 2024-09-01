import { useRef, useState } from "react";

type Props = {
	src: string;
};

const progressLimit = 1000;

export default function AudioFile({ src }: Props) {
	const getProgress = () => {
		const audio = audioRef.current;
		return audio ? (audio.currentTime / audio.duration) * progressLimit : 0;
	};

	const audioRef = useRef<HTMLAudioElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(getProgress());

	return (
		<>
			<audio ref={audioRef} src={src} className="p-2" controls onTimeUpdate={() => setProgress(getProgress())} />
			<div className="p-8">
				<div>
					<input
						type="range"
						value={progress}
						min={0}
						max={progressLimit}
						className="w-[200px] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
						onChange={(e) => {
							const audio = audioRef.current;
							if (audio) {
								audioRef.current.currentTime = (Number(e.target.value) / 1000) * audio.duration;
							}
						}}
					/>
				</div>
				<button
					type="button"
					className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 my-5"
					onClick={() => {
						if (isPlaying) audioRef.current?.pause();
						else audioRef.current?.play();
						setIsPlaying(!isPlaying);
					}}
				>
					{isPlaying ? "Pause" : "Play"}
				</button>
			</div>
		</>
	);
}
