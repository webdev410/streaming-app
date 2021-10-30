import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";

import { Dropdown } from "semantic-ui-react";
import Loader from "../../components/Loader";

const CategorySelect = () => {
	const { loading, data } = useQuery(QUERY_CATEGORIES);

	const categories = data?.categories || [];

	console.log(categories);
	return (
		<main>
			{loading ? (
				<div>Loading...</div>
			) : (
				<select name="category">
					{categories.map((category) => (
						<option key={category._id} value={category.name}>
							{category.name}
						</option>
					))}
				</select>
			)}
		</main>
	);
};
export default CategorySelect;
