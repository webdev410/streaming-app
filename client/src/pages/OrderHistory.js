import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

function OrderHistory() {
	const { data } = useQuery(QUERY_ME);
	let user;

	if (data) {
		user = data.user;
	}

	return (
		<>
			<div className="ui raised padded container segment">
				<Link to="/shop">← Back to Products</Link>

				{user ? (
					<>
						<h2>
							Order History for {user.firstName} {user.lastName}
						</h2>
						{user.orders.map((order) => (
							<div key={order._id}>
								<h3>
									{new Date(
										parseInt(order.purchaseDate)
									).toLocaleDateString()}
								</h3>
								<div>
									{order.products.map(
										(
											{ _id, image, name, price },
											index
										) => (
											<div
												key={index}
												className="ui card"
											>
												<Link to={`/products/${_id}`}>
													<img
														alt={name}
														src={`/images/${image}`}
													/>
													<p>{name}</p>
												</Link>
												<div>
													<span>${price}</span>
												</div>
											</div>
										)
									)}
								</div>
							</div>
						))}
					</>
				) : null}
			</div>
		</>
	);
}

export default OrderHistory;
