import React, { useState } from "react";
import ReactPlayer from "react-player";
export default function Video() {
	const [videoUrl, setVideoUrl] = useState("");
	const handleInputChange = (e) => {
		// Getting the value and name of the input which triggered the change
		const { target } = e;

		const inputValue = target.value;
		setVideoUrl(inputValue);
	};
	const setWebDev = (e) => {
		// Getting the value and name of the input which triggered the change
		e.preventDefault();
		const inputValue = "https://www.twitch.tv/webdev410";
		setVideoUrl(inputValue);
	};
	return (
		<div>
			<h1>Video Component</h1>
			<p>Paste your twitch link here</p>
			<form action="#">
				<input
					value={videoUrl}
					type="text"
					name="videoUrl"
					onChange={handleInputChange}
					placeholder="Video Link"
				/>
			</form>
			<button onClick={setWebDev}>See WebDev410's Stream</button>
			<ReactPlayer url={videoUrl} />
		</div>
	);
}
