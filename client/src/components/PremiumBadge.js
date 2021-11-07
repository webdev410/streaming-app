import React from "react";
import { Label } from "semantic-ui-react";

export default function PremiumBadge({ isPremiumContent }) {
	if (isPremiumContent) {
		return (
			<Label
				className={isPremiumContent === true ? "ui blue tag label" : ""}
				style={{ display: !isPremiumContent ? "none" : "" }}
			>
				PREMIUM EVENT
			</Label>
		);
	} else {
		return <Label className="ui green tag label">FREE EVENT</Label>;
	}
}
