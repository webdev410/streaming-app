import React, { useState } from "react";
import ReactPlayer from "react-player";
import Chat from "./Chat";
import { Grid } from 'semantic-ui-react'

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
      <Grid>
      	<Grid.Column computer={10} tablet={ 16 } mobile={16}>
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
        </Grid.Column>
				<Grid.Column computer={6} tablet={ 16 } mobile={16}>
        <div className="six wide column subSection">
          <Chat />
        </div>
      </Grid.Column>
			</Grid>
    </div>
  );
}
