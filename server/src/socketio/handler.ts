import type { Socket } from "socket.io";
import type { MessageData } from "@/types/db";
import { prisma } from "@/database/db";

export default function (socket: Socket) {
  console.log("Client connected");

  socket.on("disconnecting", async () => {
    const room = [...socket.rooms][1];
    if (room) {
      await prisma.user.update({
        where: { username: room },
        data: {
          isOnline: false,
        },
      });
    }
  });

  socket.on("join_own_room", async (room: string) => {
    socket.join(room);
    if (room) {
      await prisma.user.update({
        where: { username: room },
        data: {
          isOnline: true,
        },
      });
    }
  });

  socket.on("message", async (data: { msg: MessageData; room: string[] }) => {
    const message = await prisma.message.create({
      data: data.msg,
      include: { sender: {} },
    });
    socket.nsp.to(data.room[0]).emit("message", message);
    socket.nsp.to(data.room[1]).emit("message", message);
  });

  socket.on("create_chat", async (data: { firstUsername: string; secondUsername: string }) => {
    const findChat = await prisma.chat.findMany({
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

    const chat = await prisma.chat.create({
      data: {
        participants: {
          connect: [{ username: data.firstUsername }, { username: data.secondUsername }],
        },
      },
      include: { participants: {}, messages: { include: { sender: {} } } },
    });

    socket.nsp.to(data.firstUsername).emit("created_chat", chat);
    socket.nsp.to(data.secondUsername).emit("created_chat", chat);
  });

  socket.on("delete_chat", async (data: { chatId: number; users: [string, string] }) => {
    const findChat = await prisma.chat.findUnique({ where: { id: data.chatId } });

    if (!findChat) {
      return;
    }

    const deletedChat = await prisma.chat.delete({ where: { id: data.chatId } });
    socket.nsp.to(data.users[0]).emit("chat_deleted", deletedChat);
    socket.nsp.to(data.users[1]).emit("chat_deleted", deletedChat);
  });

  socket.on("delete_messages", async (data: { chatId: number; users: [string, string] }) => {
    const findMessages = await prisma.message.findMany({ where: { chatId: data.chatId } });

    if (!findMessages || findMessages.length === 0) {
      return;
    }

    await prisma.message.deleteMany({ where: { chatId: data.chatId } });

    socket.nsp.to(data.users[0]).emit("messages_deleted", data.chatId);
    socket.nsp.to(data.users[1]).emit("messages_deleted", data.chatId);
  });

  socket.on("change_theme", async (data: { theme: string; user: string }) => {
    socket.nsp.to(data.user).emit("changed_theme", data.theme);
  });
}
