import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_COMMENT } from "../../utils/mutations";

import Auth from "../../utils/auth";

const CommentForm = ({ eventId }) => {
	const [commentText, setCommentText] = useState("");
	const [characterCount, setCharacterCount] = useState(0);

	const [addComment, { error }] = useMutation(ADD_COMMENT);

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await addComment({
				variables: {
					eventId,
					commentText,
					commentAuthor: Auth.getProfile().data.username,
				},
			});

			setCommentText("");
		} catch (err) {
			console.error(err);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		if (name === "commentText" && value.length <= 280) {
			setCommentText(value);
			setCharacterCount(value.length);
		}
	};

	return (
		<div>
			<h4>Add a comment</h4>

			{Auth.loggedIn() ? (
				<>
					<p
						className={`m-0 ${
							characterCount === 280 || error ? "text-danger" : ""
						}`}
					>
						Character Count: {characterCount}/280
						{error && <span className="ml-2">{error.message}</span>}
					</p>
					<form className="ui form" onSubmit={handleFormSubmit}>
						<div className="field">
							<input
								name="commentText"
								placeholder="Add your comment..."
								value={commentText}
								className=""
								style={{
									lineHeight: "1.5",
									resize: "vertical",
								}}
								onChange={handleChange}
							></input>
						</div>

						<div className="col-12 col-lg-3">
							<button className="ui primary button" type="submit">
								Add Comment
							</button>
						</div>
					</form>
				</>
			) : (
				<p>
					Sorry, you need to be logged in. Please{" "}
					<Link to="/login">login</Link> or{" "}
					<Link to="/signup">signup.</Link>
				</p>
			)}
		</div>
	);
};

export default CommentForm;
