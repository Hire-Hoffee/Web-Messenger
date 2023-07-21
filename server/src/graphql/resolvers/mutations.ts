import { prisma } from "../../database/db";
import { UserData, MessageData, ChatData } from "../../types/db";

const createUser = async ({ userData }: UserData) => {
  const existingUsers = await prisma.user.findMany({
    where: {
      OR: [{ email: userData.email }, { username: userData.username }],
    },
  });

  if (existingUsers.length !== 0) {
    return "User with this email or username already exists";
  }

  await prisma.user.create({ data: userData });
  return "User created";
};

const createMessage = async ({ messageData }: MessageData) => {
  await prisma.message.create({ data: messageData });
  return "Message created";
};

const createChat = async ({ chatData }: ChatData) => {
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

export { createUser, createMessage, createChat };
