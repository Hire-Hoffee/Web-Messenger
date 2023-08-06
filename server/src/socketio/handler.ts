import type { Socket } from "socket.io";
import type { MessageData } from "@/types/db";
import { prisma } from "@/database/db";

export default function (socket: Socket) {
  console.log("Client connected");

  socket.on("join_rooms", (data: string[]) => {
    data?.forEach((room) => socket.join(room));
  });

  socket.on("message", async (data: { msg: MessageData; room: string }) => {
    const message = await prisma.message.create({
      data: data.msg,
      include: { sender: {} },
    });

    socket.nsp.to(data.room).emit("message", message);
  });
}
