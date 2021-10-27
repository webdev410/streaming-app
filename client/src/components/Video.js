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
		<div className="ui raised padded container segment">
			<h2 className="ui header">Video Component</h2>

			{/* <button className="ui submit button" onClick={setWebDev}>See WebDev410's Stream</button> */}
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
		</div>
	);
}
