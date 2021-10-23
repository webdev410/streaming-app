import React, { useState } from "react";
import ReactPlayer from "react-player/twitch";
export default function Video() {
	const [videoUrl, setVideoUrl] = useState("");
	const handleInputChange = (e) => {
		// Getting the value and name of the input which triggered the change
		const { target } = e;

		const inputValue = target.value;
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
			<ReactPlayer url={videoUrl} />
			<iframe
				title={`${videoUrl}`}
				src={videoUrl}
				allowfullscreen="<allowfullscreen>"
			></iframe>
		</div>
	);
}
