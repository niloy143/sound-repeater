import { useState } from "react";
import FileInput from "./components/file-input/file-input";
import AudioFile from "./components/audio-file/audio-file";

function App() {
	const [audioFile, setAudioFile] = useState<string | null>(null);

	const handleFile = (file: File) => {
		setAudioFile(URL.createObjectURL(file));
	};

	return audioFile ? <AudioFile src={audioFile} /> : <FileInput handleFile={handleFile} />;
}

export default App;
