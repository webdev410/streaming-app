import React from "react";

const CommentList = ({ comments = [] }) => {
	if (!comments.length) {
		return <h3>No Comments Yet</h3>;
	}

	return (
		<>
			<h3
				className="ui header"
				style={{ borderBottom: "1px dotted #1a1a1a" }}
			>
				Comments
			</h3>
			<div>
				{comments &&
					comments.map((comment) => (
						<div key={comment._id} className="userCommentRow">
							<div className="p-3 bg-dark text-light">
								<div className="card-header">
									{comment.commentAuthor} commented{" "}
									<span style={{ fontSize: "0.825rem" }}>
										on {comment.createdAt}
									</span>
								</div>
								<p className="userComment">
									{comment.commentText}
								</p>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default CommentList;
