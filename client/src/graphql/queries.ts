import { gql } from "@apollo/client";

const GET_USER_INFO = gql`
  query GetUserInfo($username: String!) {
    getUserInfo(userName: $username) {
      email
      username
      avatar
      createdAt
      isOnline
    }
  }
`;

const GET_USER_CHATS = gql`
  query GetUserChats($username: String!) {
    getUserChats(userName: $username) {
      participants {
        username
        avatar
        isOnline
      }
      messages {
        content
        sender {
          username
        }
      }
    }
  }
`;

export { GET_USER_INFO, GET_USER_CHATS };
