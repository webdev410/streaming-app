import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

import { Table } from "semantic-ui-react";

const Profile = () => {
	const { username: userParam } = useParams();

	const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
		variables: { username: userParam },
	});

	const user = data?.me || data?.user || {};
	// redirect to personal profile page if username is yours
	if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
		return <Redirect to="/me" />;
	}

	if (loading) {
		return <div className="ui centered raised card">Loading...</div>;
	}

	if (!user?.username) {
		return (
			<h4>
				You need to be logged in to see this. Use the navigation links
				above to sign up or log in!
			</h4>
		);
	}
	const ordersArray = user.orders;
	console.log("ordersArray", ordersArray);
	return (
		<div className="ui raised padded container segment">
			<h2 className="ui header">
				{userParam ? `${user.username}'s` : "Your"} Profile
			</h2>
			<Table celled striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<Table.HeaderCell>Username</Table.HeaderCell>
						<Table.HeaderCell>Email</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell collapsing>{user.name}</Table.Cell>
						<Table.Cell collapsing>{user.username}</Table.Cell>
						<Table.Cell collapsing>{user.email}</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
			<Table celled striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Order #</Table.HeaderCell>
						<Table.HeaderCell>Purchase Date</Table.HeaderCell>
						<Table.HeaderCell>Product Name</Table.HeaderCell>
						<Table.HeaderCell>Product Price</Table.HeaderCell>
						<Table.HeaderCell>Product Description</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{user.orders.map((order) => (
						<Table.Row>
							<Table.Cell collapsing>{order._id}</Table.Cell>
							<Table.Cell collapsing>
								{order.purchaseDate}
							</Table.Cell>
							{order.products.map((product) => (
								<>
									<Table.Cell collapsing>
										{product.price}
									</Table.Cell>
									<Table.Cell collapsing>
										{product.name}
									</Table.Cell>
									<Table.Cell collapsing>
										{product.description}
									</Table.Cell>
								</>
							))}
						</Table.Row>
					))}
				</Table.Body>
			</Table>

			<h3>Orders</h3>
			{user.orders.map((order) => (
				<div className="orderDiv" key={order._id}>
					<p>
						<span>Order Number: </span>
						{order._id}
					</p>
					<p>
						<span>Purchase Date:</span>
						{order.purchaseDate}
					</p>
					{order.products.map((product) => (
						<div key={product._id}>
							<h4>
								<span>Product Name: </span>
								{product.name}
							</h4>
							<p>
								<span>Product Description: </span>
								{product.description}
							</p>
							<p>
								<span>Product Price: </span>
								{product.price}
							</p>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default Profile;
