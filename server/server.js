const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

//Chat App Modifications
const server2 = require('http').createServer(app)
const io = require('socket.io')(server2)
const socketManage = require('./socketManage')(io)

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

io.on('connection', socketManage )

db.once("open", () => {
	server2.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
		console.log(
			`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
		);
	});
});