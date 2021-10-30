import React from "react";
import { Label } from "semantic-ui-react";

export default function PremiumBadge({ isPremiumContent }) {
	return (
		<Label
			className={isPremiumContent === true ? "ui blue tag label" : ""}
			style={{ display: !isPremiumContent ? "none" : "" }}
		>
			PREMIUM EVENT
		</Label>
	);
}
