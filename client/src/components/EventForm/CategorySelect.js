import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";

const CategorySelect = () => {
	const [selectedCategory, setSelectedCategory] = useState("");
	const { loading: loading1, data } = useQuery(QUERY_CATEGORIES);
	const categories = data?.categories || [];

	const handleCategorySelect = (event) => {
		event.preventDefault();
		setSelectedCategory({ selectedCategory: event.target.value });
		console.log(selectedCategory);
		// setFormState({ ...formState, category: selectedCategory });
	};

	console.log(categories);
	return (
		<div>
			{loading1 ? (
				<div>Loading...</div>
			) : (
				<select
					value=""
					name="category"
					onChange={handleCategorySelect}
				>
					{categories.map((category) => (
						<option
							key={category._id}
							name="category"
							value={selectedCategory}
						>
							{category.name}
						</option>
					))}
				</select>
			)}
		</div>
	);
};
export default CategorySelect;
