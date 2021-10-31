import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import Jumbotron from "../components/Jumbotron";
import { ADD_ORDER, UPGRADE_USER } from "../utils/mutations";
import { useParams } from "react-router-dom";
import { idbPromise } from "../utils/helpers";

function Success() {
	const [addOrder] = useMutation(ADD_ORDER);
	const { session_id } = useParams();

	useEffect(() => {
		async function saveOrder() {
			const cart = await idbPromise("cart", "get");
			const products = cart.map((item) => item._id);

			if (products.length) {
				const { data } = await addOrder({ variables: { products } });
				const productData = data.addOrder.products;

				productData.forEach((item) => {
					idbPromise("cart", "delete", item);
				});
			}

			// call new mutation to change boolean
			// call new mutation to change boolean and pass session_id

			setTimeout(() => {
				window.location.assign("/");
			}, 3000);
		}

		saveOrder();
	}, [addOrder]);

	return (
		<div className="ui raised padded container segment">
			<Jumbotron>
				<h1 className="ui header">Success!</h1>
				<h2 className="ui header">Thank you for your purchase!</h2>
				<h2 className="ui header">You will now be redirected to the home page</h2>
			</Jumbotron>
		</div>
	);
}

export default Success;
