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
};

type ChatData = {
  senderId: number;
  receiverId: number;
  firstMessageContent: string;
};

type UserLoggedData = {
  email: string;
  username: string;
  avatar: string;
  createdAt: string;
  isOnline: boolean;
};

type UserChatsData = {
  participants: { username: string; avatar: string; isOnline: boolean }[];
  messages: { content: string; sender: { username: string } }[];
};

export type { UserData, MessageData, ChatData, UserLoggedData, UserChatsData };
