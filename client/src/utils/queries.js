import { gql } from "@apollo/client";

export const QUERY_USER = gql`
	query user($username: String!) {
		user(username: $username) {
			_id
			name
			username
			email
			isPremium
			orders {
				_id
				purchaseDate
				products {
					_id
					name
					description
					price
					quantity
					image
				}
			}
		}
	}
`;

export const QUERY_ME = gql`
	query me {
		me {
			_id
			name
			username
			email
			isPremium
			orders {
				_id
				purchaseDate
				products {
					_id
					name
					description
					price
					quantity
					image
				}
			}
			events {
				_id
				eventTitle
				eventDescription
				isPremiumContent
				category
			}
		}
	}
`;

export const QUERY_EVENTS = gql`
	query events {
		events {
			_id
			eventTitle
			eventDescription
			eventLink
			eventDate
			createdAt
			isPublished
			isPremiumContent
			category
			likes {
				_id
			}

			comments {
				commentText
			}
			user {
				_id
				name
				email
				username
			}
		}
	}
`;

export const QUERY_SINGLE_EVENT = gql`
	query getSingleEvent($eventId: ID!) {
		event(eventId: $eventId) {
			_id
			eventTitle
			eventDescription
			eventDate
			eventLink
			createdAt
			isPremiumContent
			category
			likes {
				_id
			}
			comments {
				_id
				commentText
				commentAuthor
				createdAt
			}
		}
	}
`;

export const QUERY_PRODUCTS = gql`
	query getProducts($category: ID) {
		products(category: $category) {
			_id
			name
			description
			price
			quantity
			image
		}
	}
`;

export const QUERY_CHECKOUT = gql`
	query getCheckout($products: [ID]!) {
		checkout(products: $products) {
			session
		}
	}
`;

export const QUERY_ALL_PRODUCTS = gql`
	{
		products {
			_id
			name
			description
			price
			quantity
		}
	}
`;

export const QUERY_CATEGORIES = gql`
	query categories {
		categories {
			_id
			name
		}
	}
`;
