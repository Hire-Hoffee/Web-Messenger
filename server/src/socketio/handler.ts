import type { Socket } from "socket.io";
import type { MessageData } from "@/types/db";
import { prisma } from "@/database/db";

export default function (socket: Socket) {
  console.log("Client connected");

  socket.on("join_own_room", (room: string) => {
    socket.join(room);
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
}
