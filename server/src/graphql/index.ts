import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { Application } from "express";

import { gqlSchema as typeDefs } from "./schema";
import { getUserInfo, getUserChats, getChatData, searchUsers } from "./resolvers/queries";
import { createMessage, createChat, userRegistration, userLogin } from "./resolvers/mutations";

const resolvers = {
  Query: {
    getUserInfo,
    getUserChats,
    getChatData,
    searchUsers,
  },
  Mutation: {
    createMessage,
    createChat,
    userRegistration,
    userLogin,
  },
};

export default async function (httpServer: http.Server, app: Application, route: string) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use(route, expressMiddleware(server));
}
