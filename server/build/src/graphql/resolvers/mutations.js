"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userRegistration = void 0;
const graphql_1 = require("graphql");
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../../database/db");
const jwtGeneration_1 = require("../../utils/jwtGeneration");
const userRegistration = (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = args.userCredentials;
    const validationSchema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        username: joi_1.default.string().required(),
        password: joi_1.default.string().min(8).max(32).required(),
        avatar: joi_1.default.string().uri(),
    });
    const { error } = validationSchema.validate(userData);
    if (error) {
        throw new graphql_1.GraphQLError(String(error), { extensions: { code: "DATA_VALIDATION_ERROR" } });
    }
    const existingUsers = yield db_1.prisma.user.findMany({
        where: {
            OR: [{ email: userData.email }, { username: userData.username }],
        },
    });
    if (existingUsers.length !== 0) {
        throw new graphql_1.GraphQLError("User already exists");
    }
    userData.password = yield bcrypt_1.default.hash(userData.password, 7);
    yield db_1.prisma.user.create({ data: userData });
    return "User created";
});
exports.userRegistration = userRegistration;
const userLogin = (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = args.userCredentials;
    const validationSchema = joi_1.default.object({
        username: joi_1.default.string().required(),
        password: joi_1.default.string().min(8).max(32).required(),
    });
    const { error } = validationSchema.validate(userData);
    if (error) {
        throw new graphql_1.GraphQLError(String(error), { extensions: { code: "DATA_VALIDATION_ERROR" } });
    }
    const existingUser = yield db_1.prisma.user.findUnique({ where: { username: userData.username } });
    if (!existingUser) {
        throw new graphql_1.GraphQLError("User not found, register a new account");
    }
    const passwordCheck = yield bcrypt_1.default.compare(userData.password, existingUser.password);
    if (!passwordCheck) {
        throw new graphql_1.GraphQLError("Invalid password");
    }
    const accessToken = (0, jwtGeneration_1.genAccessToken)({ id: existingUser.id, username: existingUser.username });
    const refreshToken = (0, jwtGeneration_1.genRefreshToken)({ id: existingUser.id, email: existingUser.email });
    yield db_1.prisma.user.update({
        where: { email: existingUser.email },
        data: { token: refreshToken, isOnline: true },
    });
    return accessToken;
});
exports.userLogin = userLogin;
