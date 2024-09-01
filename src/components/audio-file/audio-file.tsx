import { useEffect, useRef, useState } from "react";

// @ts-expect-error not a typescript package
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./styles.css";

type Props = {
	src: string;
};

const MAX = 1000;
const MIN = 0;
const RANGE_INPUT_ID = "range_input";
const INDICATOR_ID = "progress_indicator";

export default function AudioFile({ src }: Props) {
	const getProgress = () => {
		const audio = audioRef.current;
		return audio ? (audio.currentTime / audio.duration) * MAX : 0;
	};

	const audioRef = useRef<HTMLAudioElement>(null);
	const [progress, setProgress] = useState(getProgress());
	const [range, setRange] = useState([MIN, MAX / 2]);

	useEffect(() => {
		if (progress < range[0] || progress > range[1]) {
			setProgress(range[0]);
			const audio = audioRef.current;
			if (audio) {
				audioRef.current.currentTime = (range[0] / 1000) * audio.duration;
			}
		}
	}, [progress, range]);

	return (
		<div>
			<div className="px-[20px] pt-[20px] flex justify-center">
				<audio ref={audioRef} src={src} className="p-2" controls onTimeUpdate={() => setProgress(getProgress())} />
			</div>
			<div className="p-[20px] w-[1040px]">
				<div>
					<RangeSlider
						id={INDICATOR_ID}
						min={MIN}
						max={MAX}
						value={[0, progress]}
						thumbsDisabled={[true, false]}
						rangeSlideDisabled={true}
						onInput={(values: number[]) => {
							const audio = audioRef.current;
							if (audio) {
								audioRef.current.currentTime = (Number(values[1]) / 1000) * audio.duration;
							}
						}}
					/>
					<RangeSlider
						id={RANGE_INPUT_ID}
						min={MIN}
						max={MAX}
						value={range}
						onInput={(values: number[]) => {
							setRange(values);
						}}
					/>
				</div>
			</div>
		</div>
	);
}
