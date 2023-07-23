import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

import { gqlSchema } from "./schema";
import { getUserInfo, getUserChats, getChat } from "./resolvers/queries";
import { createMessage, createChat, userRegistration, userLogin } from "./resolvers/mutations";

export default function () {
  const schema = buildSchema(gqlSchema);
  const rootResolvers = {
    getUserInfo,
    getUserChats,
    getChat,
    createMessage,
    createChat,

    userRegistration,
    userLogin,
  };

  return graphqlHTTP({
    schema: schema,
    rootValue: rootResolvers,
    graphiql: true,
  });
}
