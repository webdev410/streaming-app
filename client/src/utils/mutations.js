import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				name
				username
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser(
		$name: String!
		$username: String!
		$email: String!
		$password: String!
	) {
		addUser(
			name: $name
			username: $username
			email: $email
			password: $password
		) {
			token
			user {
				_id
				username
			}
		}
	}
`;
export const ADD_EVENT = gql`
	mutation addEvent(
		$eventTitle: String!
		$eventDescription: String!
		$eventLink: String
		$eventDate: String
		$isPremiumContent: Boolean!
		$category: String
	) {
		addEvent(
			eventTitle: $eventTitle
			eventDescription: $eventDescription
			eventLink: $eventLink
			category: $category
			eventDate: $eventDate
			isPremiumContent: $isPremiumContent
		) {
			_id
			eventTitle
			eventDescription
			eventLink
			eventDate
			isPremiumContent
			category
		}
	}
`;

export const ADD_ORDER = gql`
	mutation addOrder($products: [ID]!) {
		addOrder(products: $products) {
			purchaseDate
			products {
				_id
				name
				description
				price
				quantity
			}
		}
	}
`;

export const ADD_COMMENT = gql`
	mutation addComment($eventId: ID!, $commentText: String!) {
		addComment(eventId: $eventId, commentText: $commentText) {
			_id
			eventTitle
			createdAt
			comments {
				_id
				commentText
				createdAt
			}
		}
	}
`;
export const ADD_LIKE = gql`
	mutation addLike($eventId: ID!) {
		addLike(eventId: $eventId) {
			likes {
				username
			}
		}
	}
`;

export const UPGRADE_USER = gql`
	mutation upgrade($userId: ID!) {
		upgrade(userId: $userId) {
			user {
				_id
				username
				isPremium
			}
		}
	}
`;
