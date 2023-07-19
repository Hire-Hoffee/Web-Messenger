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
  getUser(userId: Int!): User!
  getChats(userId: Int!): [Chat!]!
  getChat(chatId: Int!): Chat!
}
`;

export { gqlSchema };
