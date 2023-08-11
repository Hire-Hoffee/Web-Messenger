import { GraphQLError } from "graphql";
import Joi from "joi";
import bcrypt from "bcrypt";

import { prisma } from "@/database/db";
import { UserData, MessageData, ChatData } from "@/types/db";
import { genAccessToken, genRefreshToken } from "@/utils/jwtGeneration";

const userRegistration = async (parent: any, args: { userCredentials: UserData }) => {
  const userData = args.userCredentials;

  const validationSchema = Joi.object<UserData>({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().min(8).max(32).required(),
    avatar: Joi.string().uri(),
  });

  const { error } = validationSchema.validate(userData);
  if (error) {
    throw new GraphQLError(String(error), { extensions: { code: "DATA_VALIDATION_ERROR" } });
  }

  const existingUsers = await prisma.user.findMany({
    where: {
      OR: [{ email: userData.email }, { username: userData.username }],
    },
  });
  if (existingUsers.length !== 0) {
    throw new GraphQLError("User already exists");
  }

  userData.password = await bcrypt.hash(userData.password, 7);
  await prisma.user.create({ data: userData });

  return "User created";
};

const userLogin = async (
  parent: any,
  args: { userCredentials: { username: string; password: string } }
) => {
  const userData = args.userCredentials;

  const validationSchema = Joi.object<{ username: string; password: string }>({
    username: Joi.string().required(),
    password: Joi.string().min(8).max(32).required(),
  });

  const { error } = validationSchema.validate(userData);
  if (error) {
    throw new GraphQLError(String(error), { extensions: { code: "DATA_VALIDATION_ERROR" } });
  }

  const existingUser = await prisma.user.findUnique({ where: { username: userData.username } });
  if (!existingUser) {
    throw new GraphQLError("User not found, register a new account");
  }

  const passwordCheck = await bcrypt.compare(userData.password, existingUser.password);
  if (!passwordCheck) {
    throw new GraphQLError("Invalid password");
  }

  const accessToken = genAccessToken({ id: existingUser.id, username: existingUser.username });
  const refreshToken = genRefreshToken({ id: existingUser.id, email: existingUser.email });

  await prisma.user.update({
    where: { email: existingUser.email },
    data: { token: refreshToken, isOnline: true },
  });

  return accessToken;
};

const createMessage = async ({ messageData }: any) => {
  await prisma.message.create({ data: messageData });
  return "Message created";
};

const createChat = async ({ chatData }: any) => {
  await prisma.chat.create({
    data: {
      participants: { connect: [{ id: chatData.senderId }, { id: chatData.receiverId }] },
      messages: {
        create: {
          content: chatData.firstMessageContent,
          senderId: chatData.senderId,
          receiverId: chatData.receiverId,
        },
      },
    },
  });

  return "Chat created";
};

export { createMessage, createChat, userRegistration, userLogin };
