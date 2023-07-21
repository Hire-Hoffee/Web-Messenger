import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!, $username: String!, $avatar: String) {
    createUser(
      userData: { email: $email, password: $password, username: $username, avatar: $avatar }
    )
  }
`;

export { CREATE_USER };
