import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

const CommentForm = ({ eventId }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: { eventId, commentText },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3 className="ui header">Comments</h3>
      <p
        className={`m-0 ${
          characterCount === 280 || error ? 'text-danger' : ''
        }`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="ui form"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <input
            name="commentText"
            placeholder="Add your comment..."
            value={commentText}
            className=""
            style={{ lineHeight: '1.5' }}
            onChange={handleChange}
          ></input>
        </div>

        <button className="ui primary button" type="submit">
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
