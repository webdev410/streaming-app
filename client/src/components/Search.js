import React from "react";

export default function Search() {
	return (
		<div className="six wide column">
			<div className="ui action input">
				<input type="text" placeholder="Search..." />
				<button class="ui icon button">
			    <i class="search icon"></i>
  			</button>
			</div>
		</div>
	);
}
