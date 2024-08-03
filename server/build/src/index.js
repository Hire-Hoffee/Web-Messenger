"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
const graphql_1 = __importDefault(require("./graphql"));
const socketio_1 = __importDefault(require("./socketio"));
const handler_1 = __importDefault(require("./socketio/handler"));
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const io = (0, socketio_1.default)(httpServer, process.env.CLIENT_URL);
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, connect_history_api_fallback_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "out")));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "out", "index.html"));
});
(0, graphql_1.default)(httpServer, app, "/graphql");
io.on("connection", (socket) => (0, handler_1.default)(socket));
httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
