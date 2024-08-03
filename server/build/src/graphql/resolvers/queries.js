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
exports.searchUsers = exports.getChatData = exports.getUserChats = exports.getUserInfo = void 0;
const db_1 = require("../../database/db");
const graphql_1 = require("graphql");
const getUserInfo = (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({ where: { username: args.userName } });
    if (!user) {
        throw new graphql_1.GraphQLError("User not found", { extensions: { code: "ERROR_404" } });
    }
    return user;
});
exports.getUserInfo = getUserInfo;
const searchUsers = (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
    if (!args.userName) {
        return [];
    }
    const users = yield db_1.prisma.user.findMany({ where: { username: { startsWith: args.userName } } });
    return users;
});
exports.searchUsers = searchUsers;
const getUserChats = (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield db_1.prisma.chat.findMany({
        where: { participants: { some: { username: args.userName } } },
        include: {
            messages: {
                include: {
                    sender: true,
                    receiver: true,
                },
                orderBy: { createdAt: "desc" },
                take: 1,
            },
            participants: true,
        },
    });
    if (chats.length === 0) {
        throw new graphql_1.GraphQLError("Chats not found", { extensions: { code: "ERROR_404" } });
    }
    return chats;
});
exports.getUserChats = getUserChats;
const getChatData = (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
    const chatData = yield db_1.prisma.chat.findUnique({
        where: { id: args.chatId },
        include: {
            messages: {
                include: {
                    sender: true,
                    receiver: true,
                },
                orderBy: { createdAt: "asc" },
            },
            participants: true,
        },
    });
    if (!chatData) {
        throw new graphql_1.GraphQLError("User not found", { extensions: { code: "ERROR_404" } });
    }
    return chatData;
});
exports.getChatData = getChatData;
