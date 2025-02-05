import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import history from "connect-history-api-fallback";
import logger from "morgan";
import "dotenv/config";

import graphqlInit from "./graphql";
import socketInit from "./socketio";
import socketHandler from "./socketio/handler";

const app = express();
const httpServer = http.createServer(app);
const io = socketInit(httpServer, (process.env.CLIENT_URL as string).split(" "));
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use(history());
app.use(express.static(path.join(__dirname, "..", "out")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "out", "index.html"));
});

graphqlInit(httpServer, app, "/graphql");
io.on("connection", (socket) => socketHandler(socket));

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
