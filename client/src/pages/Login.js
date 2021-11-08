import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Login = (props) => {
	const [formState, setFormState] = useState({ email: "", password: "" });
	const [login, { error, data }] = useMutation(LOGIN_USER);

	// update state based on form input changes
	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log(formState);
		try {
			const { data } = await login({
				variables: { ...formState },
			});

			console.log(JSON.stringify(data, null, 2));

			Auth.login(data.login.token);
		} catch (e) {
			console.error(e);
		}

		// clear form values
		setFormState({
			email: "",
			password: "",
		});
	};

	return (
		<div className="d-flex justify-content-center h-100">
			<div className="align-self-center ">
				<div className="boxShadow loginForm ">
					<div className="">
						<h2 className="ui header">Login</h2>
						<div>
							{data ? (
								<p>
									Success! You may now head{" "}
									<Link to="/">back to the homepage.</Link>
								</p>
							) : (
								<form
									className="ui form"
									onSubmit={handleFormSubmit}
								>
									<div className="">
										<input
											autoFocus
											placeholder="Your email"
											name="email"
											type="email"
											value={formState.email}
											onChange={handleChange}
											className="form-control m-2"
										/>
									</div>
									<div className="">
										<input
											className="form-control m-2"
											placeholder="******"
											name="password"
											type="password"
											value={formState.password}
											onChange={handleChange}
										/>
									</div>
									<button
										className="ui primary button mt-4"
										style={{ cursor: "pointer" }}
										type="submit"
									>
										Submit
									</button>
								</form>
							)}

							{error && (
								<div className="alert alert-danger m-3">
									{error.message}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
