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
      id
      createdAt
      participants {
        id
        username
        avatar
        isOnline
      }
      messages {
        id
        content
        createdAt
        sender {
          username
        }
      }
    }
  }
`;

const GET_CHAT_DATA = gql`
  query GetChatData($chatId: Int!) {
    getChatData(chatId: $chatId) {
      id
      createdAt
      participants {
        id
        username
        avatar
        isOnline
      }
      messages {
        id
        content
        createdAt
        sender {
          username
        }
      }
    }
  }
`;

const SEARCH_USERS = gql`
  query SearchUsers($userName: String!) {
    searchUsers(userName: $userName) {
      id
      avatar
      username
    }
  }
`;

export { GET_USER_INFO, GET_USER_CHATS, GET_CHAT_DATA, SEARCH_USERS };
