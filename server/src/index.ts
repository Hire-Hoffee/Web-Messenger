import express from "express";
import http from "http";
import { Server } from "socket.io";

import graphqlInit from "./graphql";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const port = process.env.PORT || 4000;

app.use("/graphql", graphqlInit());

io.on("connection", (socket) => {
  console.log("connected server ! " + socket.id);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
