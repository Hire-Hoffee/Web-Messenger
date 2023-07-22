const gqlSchema = `#graphql
type User {
  id: Int!
  email: String!
  password: String!
  username: String!
  avatar: String
  createdAt: String!
  isOnline: Boolean!
  token: String
}

type Message {
  id: Int!
  content: String!
  createdAt: String!
  sender: User!
  receiver: User!
}

type Chat {
  id: Int!
  createdAt: String!
  participants: [User!]!
  messages: [Message!]!
}

type Query {
  getUser(userName: String!): User
  getChats(userId: Int!): [Chat!]!
  getChat(chatId: Int!): Chat!
}

input UserData {
  email: String!
  password: String!
  username: String!
  avatar: String
}

input MessageData {
  content: String!
  senderId: Int!
  receiverId: Int!
  chatId: Int!
}

input ChatData {
  senderId: Int!
  receiverId: Int!
  firstMessageContent: String!
}

type Mutation {
  userRegistration(userCredentials: UserData!): String!
  createMessage(messageData: MessageData!): String!
  createChat(chatData: ChatData! ): String!
}
`;

export { gqlSchema };
