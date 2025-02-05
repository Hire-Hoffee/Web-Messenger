import { Server } from "socket.io";
import type { Server as httpServer } from "http";

export default function (server: httpServer, host: string) {
  return new Server(server, {
    cors: {
      origin: host,
    },
  });
}
