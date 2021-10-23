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
		category: Category
		likes: [User]
		comments: [Comment]
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
		getEvent(eventId: ID): Event
	}

	type Mutation {
		addUser(
			name: String!
			username: String!
			email: String!
			password: String!
		): Auth
		login(email: String!, password: String!): Auth
	}
`;

module.exports = typeDefs;
