import React from "react";
import { Link } from "react-router-dom";
const ConditionalLink = ({ children, to, condition }) =>
	!!condition && to ? (
		<Link to={to}>
			<h2>{children}</h2>
		</Link>
	) : (
		<h2>{children}</h2>
	);

export default ConditionalLink;
