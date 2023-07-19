import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

import { gqlSchema } from "./schema";
import { getUser, getChats, getChat } from "./resolvers/queries";
import { createUser } from "./resolvers/mutations";

export default function () {
  const schema = buildSchema(gqlSchema);
  const rootResolvers = {
    getUser,
    getChats,
    getChat,
    createUser,
  };

  return graphqlHTTP({
    schema: schema,
    rootValue: rootResolvers,
    graphiql: true,
  });
}
