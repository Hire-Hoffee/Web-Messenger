import { prisma } from "../../database/db";

const getUser = async (args: { userId: number }) => {
  return await prisma.user.findUnique({ where: { id: args.userId } });
};

const getChats = async (args: { userId: number }) => {
  return await prisma.chat.findMany({
    where: { participants: { some: { id: args.userId } } },
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
};

const getChat = async (args: { chatId: number }) => {
  return await prisma.chat.findUnique({
    where: { id: args.chatId },
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
};

export { getUser, getChats, getChat };
