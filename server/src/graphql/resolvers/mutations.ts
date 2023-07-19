import { prisma } from "../../database/db";

type UserData = {
  data: {
    email: string;
    password: string;
    username: string;
    avatar?: string;
  };
};

const createUser = async ({ data }: UserData) => {
  return await prisma.user.create({ data });
};

export { createUser };
