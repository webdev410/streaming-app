import React from "react";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./css/App.css";
import Events from "./pages/Events";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/index";
import Event from "./components/Event";
import Chat from "./components/Chat";
import Profile from "./pages/Profile";
import EventForm from "./components/EventForm/index";
import { StoreProvider } from "./utils/GlobalState";
import Success from "./pages/Success";
import OrderHistory from "./pages/OrderHistory";
import Detail from "./pages/Detail";
import Shop from "./pages/Shop";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
	uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem("id_token");
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<StoreProvider>
					<div className="viewWindow d-flex flex-column justify-content-between">
						<Navbar className="navHeight" />
						<div className="App">
							<Route exact path="/events">
								<Events />
							</Route>
							<Route exact path="/landing">
								<Landing />
							</Route>
							<Route exact path="/me">
								<Profile />
							</Route>
							<Route exact path="/event/:eventId">
								<Event />
							</Route>
							<Route exact path="/chat">
								<Chat />
							</Route>
							<Route exact path="/login">
								<Login />
							</Route>
							<Route exact path="/signup">
								<Signup />
							</Route>
							<Route exact path="/new-event">
								<EventForm />
							</Route>
							<Route exact path="/shop">
								<Shop />
							</Route>
							<Route exact path="/success" component={Success} />
							<Route
								exact
								path="/orderHistory"
								component={OrderHistory}
							/>
							<Route
								exact
								path="/products/:id"
								component={Detail}
							/>
							<Route
								exact
								path="/orders"
								component={OrderHistory}
							/>
						</div>
					</div>
				</StoreProvider>
			</Router>
		</ApolloProvider>
	);
}

export default App;
