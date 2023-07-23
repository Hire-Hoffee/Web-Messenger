import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!, $username: String!, $avatar: String) {
    userRegistration(
      userCredentials: { email: $email, password: $password, username: $username, avatar: $avatar }
    )
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    userLogin(userCredentials: { username: $username, password: $password })
  }
`;

export { REGISTER_USER, LOGIN_USER };
