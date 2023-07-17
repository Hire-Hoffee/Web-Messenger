import type { Socket } from "socket.io";

export default function (socket: Socket) {
  console.log(socket.id);
}
