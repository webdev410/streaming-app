import React from "react";
import { Label } from "semantic-ui-react";

export default function PremiumBadge({ isPremiumContent }) {
	if (isPremiumContent) {
		return (
			<Label
				className={
					isPremiumContent === true ? "ui blue tag label m-4" : ""
				}
				style={{ display: !isPremiumContent ? "none" : "" }}
			>
				PREMIUM EVENT
			</Label>
		);
	} else {
		return <Label className="ui green tag label m-4">FREE EVENT</Label>;
	}
}
