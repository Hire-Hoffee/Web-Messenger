import { prisma } from "@/database/db";
import { GraphQLError } from "graphql";

const getUserInfo = async (data: { userName: string }) => {
  const user = await prisma.user.findUnique({ where: { username: data.userName } });
  if (!user) {
    throw new GraphQLError("User not found", { extensions: { code: "ERROR_404" } });
  }

  return user;
};

const getUserChats = async (data: { userName: string }) => {
  const chats = await prisma.chat.findMany({
    where: { participants: { some: { username: data.userName } } },
    include: {
      messages: {
        include: {
          sender: true,
          receiver: true,
        },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      participants: true,
    },
  });

  if (chats.length === 0) {
    throw new GraphQLError("Chats not found", { extensions: { code: "ERROR_404" } });
  }

  return chats;
};

const getChatData = async (data: { chatId: number }) => {
  const chatData = await prisma.chat.findUnique({
    where: { id: data.chatId },
    include: {
      messages: {
        include: {
          sender: true,
          receiver: true,
        },
        orderBy: { createdAt: "asc" },
      },
      participants: true,
    },
  });
  if (!chatData) {
    throw new GraphQLError("User not found", { extensions: { code: "ERROR_404" } });
  }

  return chatData;
};

export { getUserInfo, getUserChats, getChatData };
