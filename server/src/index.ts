import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.json({ working: true });
});

io.on("connection", (socket) => {
  console.log("connected server ! " + socket.id);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
