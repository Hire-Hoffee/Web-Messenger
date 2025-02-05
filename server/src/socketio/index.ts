import { Server } from "socket.io";
import type { Server as httpServer } from "http";

export default function (server: httpServer, hosts: string | string[]) {
  return new Server(server, {
    cors: {
      origin: hosts,
    },
  });
}
