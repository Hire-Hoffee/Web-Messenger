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

const GET_CHAT_DATA = gql`
  query GetChatData($chatId: Int!) {
    getChatData(chatId: $chatId) {
      id
      createdAt
      participants {
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

export { GET_USER_INFO, GET_USER_CHATS, GET_CHAT_DATA };
