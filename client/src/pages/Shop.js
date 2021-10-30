import React from "react";
import ProductList from "../components/ProductList";

import Cart from "../components/Cart";

export default function Shop() {
	return (
		<div className="ui raised padded container segment">
			<ProductList />
			<Cart />
		</div>
	);
}
