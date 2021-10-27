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

	return (
		<div className="ui raised padded container segment">
			<h2 className="ui header">Video Component</h2>

			<form className="ui form" action="#">
				<input
					className="field"
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
