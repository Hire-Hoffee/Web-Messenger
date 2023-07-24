import type { Socket } from "socket.io";

export default function (socket: Socket) {
  console.log("Client connected");

  socket.on("join_rooms", (data: string[]) => {
    data?.forEach((room) => socket.join(room));
  });

  socket.on("message", (data: { data: string; room: string }) => {
    socket.to(data.room).emit("message", data.data);
  });
}
