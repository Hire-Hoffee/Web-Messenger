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
const db_1 = require("../database/db");
function default_1(socket) {
    console.log("Client connected");
    socket.on("disconnecting", () => __awaiter(this, void 0, void 0, function* () {
        const room = [...socket.rooms][1];
        if (room) {
            yield db_1.prisma.user.update({
                where: { username: room },
                data: {
                    isOnline: false,
                },
            });
        }
    }));
    socket.on("join_own_room", (room) => __awaiter(this, void 0, void 0, function* () {
        socket.join(room);
        if (room) {
            yield db_1.prisma.user.update({
                where: { username: room },
                data: {
                    isOnline: true,
                },
            });
        }
    }));
    socket.on("message", (data) => __awaiter(this, void 0, void 0, function* () {
        const message = yield db_1.prisma.message.create({
            data: data.msg,
            include: { sender: {} },
        });
        socket.nsp.to(data.room[0]).emit("message", message);
        socket.nsp.to(data.room[1]).emit("message", message);
    }));
    socket.on("create_chat", (data) => __awaiter(this, void 0, void 0, function* () {
        const findChat = yield db_1.prisma.chat.findMany({
            where: {
                AND: [
                    { participants: { some: { username: data.firstUsername } } },
                    { participants: { some: { username: data.secondUsername } } },
                ],
            },
        });
        if (findChat.length !== 0) {
            return;
        }
        const chat = yield db_1.prisma.chat.create({
            data: {
                participants: {
                    connect: [{ username: data.firstUsername }, { username: data.secondUsername }],
                },
            },
            include: { participants: {}, messages: { include: { sender: {} } } },
        });
        socket.nsp.to(data.firstUsername).emit("created_chat", chat);
        socket.nsp.to(data.secondUsername).emit("created_chat", chat);
    }));
    socket.on("delete_chat", (data) => __awaiter(this, void 0, void 0, function* () {
        const findChat = yield db_1.prisma.chat.findUnique({ where: { id: data.chatId } });
        if (!findChat) {
            return;
        }
        const deletedChat = yield db_1.prisma.chat.delete({ where: { id: data.chatId } });
        socket.nsp.to(data.users[0]).emit("chat_deleted", deletedChat);
        socket.nsp.to(data.users[1]).emit("chat_deleted", deletedChat);
    }));
    socket.on("delete_messages", (data) => __awaiter(this, void 0, void 0, function* () {
        const findMessages = yield db_1.prisma.message.findMany({ where: { chatId: data.chatId } });
        if (!findMessages || findMessages.length === 0) {
            return;
        }
        yield db_1.prisma.message.deleteMany({ where: { chatId: data.chatId } });
        socket.nsp.to(data.users[0]).emit("messages_deleted", data.chatId);
        socket.nsp.to(data.users[1]).emit("messages_deleted", data.chatId);
    }));
    socket.on("change_theme", (data) => __awaiter(this, void 0, void 0, function* () {
        socket.nsp.to(data.user).emit("changed_theme", data.theme);
    }));
}
exports.default = default_1;
