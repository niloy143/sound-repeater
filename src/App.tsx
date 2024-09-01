import { useState } from "react";
import FileInput from "./components/file-input/file-input";
import AudioFile from "./components/audio-file/audio-file";

function App() {
	const [audioFile, setAudioFile] = useState<string | null>(null);

	const handleFile = (file: File) => {
		setAudioFile(URL.createObjectURL(file));
	};

	return (
		<>
			<div className="h-[100vh] flex justify-center items-center">
				<div className="bg-[#ddd] rounded-xl">
					<div>{audioFile ? <AudioFile src={audioFile} /> : <FileInput handleFile={handleFile} />}</div>
				</div>
			</div>
		</>
	);
}

export default App;
