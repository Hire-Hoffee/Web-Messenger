"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const schema_1 = require("./schema");
const queries_1 = require("./resolvers/queries");
const mutations_1 = require("./resolvers/mutations");
const resolvers = {
    Query: {
        getUserInfo: queries_1.getUserInfo,
        getUserChats: queries_1.getUserChats,
        getChatData: queries_1.getChatData,
        searchUsers: queries_1.searchUsers,
    },
    Mutation: {
        userRegistration: mutations_1.userRegistration,
        userLogin: mutations_1.userLogin,
    },
};
function default_1(httpServer, app, route) {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new server_1.ApolloServer({
            typeDefs: schema_1.gqlSchema,
            resolvers,
            plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
        });
        yield server.start();
        app.use(route, (0, express4_1.expressMiddleware)(server));
    });
}
exports.default = default_1;
