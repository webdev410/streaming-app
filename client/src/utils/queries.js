import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      name
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      username
      email
      events {
        _id
        eventTitle
        eventDescription
      }
    }
  }
`;

export const QUERY_EVENTS = gql`
  query events {
    events {
      _id
      eventTitle
      eventDescription
	  user {
		  _id
		  name
		  email
		  username
	  }
    }
  }
`;
