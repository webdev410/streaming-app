const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type User {
		_id: ID
		name: String
		username: String
		email: String
		password: String
		isPremium: Boolean
		createdAt: String
		events: [Event]
		orders: [Order]
	}

	type Event {
		_id: ID
		eventTitle: String
		eventDescription: String
		eventLink: String
		isPublished: Boolean
		isPremiumContent: Boolean
		eventDate: String
		createdAt: String
		user: User
		category: String
		likes: [User]
		comments: [Comment]
	}

	type Product {
		_id: ID
		name: String
		description: String
		image: String
		quantity: Int
		price: Float
		# category: Category
	}

	type Order {
		_id: ID
		purchaseDate: String
		products: [Product]
	}

	type Checkout {
		session: ID
	}

	type Category {
		_id: ID
		name: String
	}

	type Comment {
		_id: ID
		commentText: String
		commentAuthor: String
		createdAt: String
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		user(username: String!): User
		me: User
		events: [Event]
		event(eventId: ID!): Event
		categories: [Category]
		products(category: ID, name: String): [Product]
		product(_id: ID!): Product
		order(_id: ID!): Order
		checkout(products: [ID]!): Checkout
	}

	type Mutation {
		addUser(
			name: String!
			username: String!
			email: String!
			password: String!
		): Auth
		login(email: String!, password: String!): Auth
		addEvent(
			eventTitle: String!
			eventDescription: String!
			eventLink: String
			eventDate: String
			isPremiumContent: Boolean!
			category: String
		): Event
		addOrder(products: [ID]!): Order
		updateUser(
			firstName: String
			lastName: String
			email: String
			password: String
		): User
		updateProduct(_id: ID!, quantity: Int!): Product
		addComment(eventId: ID!, commentText: String!): Event
		removeEvent(eventId: ID!): Event
		removeComment(eventId: ID!, commentId: ID!): Event
		upgrade(userId: ID!): User
		addLike(eventId: ID!): Event
	}
`;

module.exports = typeDefs;
