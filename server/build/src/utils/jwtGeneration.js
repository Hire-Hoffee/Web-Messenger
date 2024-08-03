"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.genRefreshToken = exports.genAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const genAccessToken = (data, expiresIn = "24h") => {
    return jsonwebtoken_1.default.sign(data, process.env.SECRET_ACCESS, { expiresIn });
};
exports.genAccessToken = genAccessToken;
const genRefreshToken = (data, expiresIn = "720h") => {
    return jsonwebtoken_1.default.sign(data, process.env.SECRET_REFRESH, { expiresIn });
};
exports.genRefreshToken = genRefreshToken;
const verifyToken = (token, key, options) => {
    return jsonwebtoken_1.default.verify(token, key, options);
};
exports.verifyToken = verifyToken;
