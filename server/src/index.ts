import express from "express";
import http from "http";

import graphqlInit from "./graphql";
import socketInit from "./socketio";
import socketHandler from "./socketio/handler";

const app = express();
const server = http.createServer(app);
const io = socketInit(server, "http://localhost:3000");

const port = process.env.PORT || 4000;

app.use("/graphql", graphqlInit());
io.on("connection", (socket) => socketHandler(socket));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
