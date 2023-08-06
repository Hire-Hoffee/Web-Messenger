type UserData = {
  email: string;
  password: string;
  username: string;
  avatar?: string;
};

type MessageData = {
  content: string;
  senderId: number;
  receiverId: number;
  chatId: number;
  createdAt?: string;
};

type ChatData = {
  senderId: number;
  receiverId: number;
  firstMessageContent: string;
};

export type { UserData, MessageData, ChatData };
