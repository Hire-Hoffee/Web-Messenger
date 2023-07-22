import { GraphQLError } from "graphql";
import Joi from "joi";
import bcrypt from "bcrypt";

import { prisma } from "../../database/db";
import { UserData, MessageData, ChatData } from "../../types/db";

const userRegistration = async (data: { userCredentials: UserData }) => {
  const userData = data.userCredentials;

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

export { createMessage, createChat, userRegistration };
