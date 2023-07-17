import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

import { gqlSchema } from "./schema";
import { hello } from "./resolvers/queries";

export default function () {
  const schema = buildSchema(gqlSchema);
  const rootResolvers = {
    hello,
  };

  return graphqlHTTP({
    schema: schema,
    rootValue: rootResolvers,
    graphiql: true,
  });
}
