"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
function default_1(server, host) {
    return new socket_io_1.Server(server, {
        cors: {
            origin: host,
        },
    });
}
exports.default = default_1;
