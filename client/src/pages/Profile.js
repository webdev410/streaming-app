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
		<div className="d-flex justify-content-center">
			<div className="col-12 col-md-8">
				<div className="boxShadow">
					<h2 className="card-title">
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
								<Table.Cell collapsing>
									{user.username}
								</Table.Cell>
								<Table.Cell collapsing>{user.email}</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
				</div>
				<div className="boxShadow">
					<h3>Orders</h3>
					{user.orders.length === 0 ? (
						<h5>
							You have no orders. Become a{" "}
							<a href="/shop">premium member</a> today!
						</h5>
					) : (
						<Table celled striped>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>Order #</Table.HeaderCell>
									<Table.HeaderCell>
										Purchase Date
									</Table.HeaderCell>
									<Table.HeaderCell>
										Product Name
									</Table.HeaderCell>
									<Table.HeaderCell>
										Product Price
									</Table.HeaderCell>
									<Table.HeaderCell>
										Product Description
									</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{user.orders.map((order) => (
									<Table.Row>
										<Table.Cell>{order._id}</Table.Cell>
										<Table.Cell>
											{order.purchaseDate}
										</Table.Cell>
										{order.products.map((product) => (
											<>
												<Table.Cell>
													{product.name}
												</Table.Cell>
												<Table.Cell>
													{product.price}
												</Table.Cell>
												<Table.Cell>
													{product.description}
												</Table.Cell>
											</>
										))}
									</Table.Row>
								))}
							</Table.Body>
						</Table>
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;
