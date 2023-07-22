import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!, $username: String!, $avatar: String) {
    userRegistration(
      userCredentials: { email: $email, password: $password, username: $username, avatar: $avatar }
    )
  }
`;

export { REGISTER_USER };
