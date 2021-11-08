import React from "react";
import { Link } from "react-router-dom";
const ConditionalLink = ({ children, to, condition }) =>
	!!condition && to ? (
		<Link className="btn btn-secondary" to={to}>
			<h6>{children}</h6>
		</Link>
	) : (
		<h6 className="btn btn-secondary disabled">{children}</h6>
	);

export default ConditionalLink;
