const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type User {
		_id: ID
		name: String
		username: String
		email: String
		password: String
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
