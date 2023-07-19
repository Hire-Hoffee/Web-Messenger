import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

import { gqlSchema } from "./schema";
import { getUser, getChats, getChat } from "./resolvers/queries";

export default function () {
  const schema = buildSchema(gqlSchema);
  const rootResolvers = {
    getUser,
    getChats,
    getChat,
  };

  return graphqlHTTP({
    schema: schema,
    rootValue: rootResolvers,
    graphiql: true,
  });
}
