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
  createdAt: string;
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
  id?: number;
  participants: { username: string; avatar: string; isOnline: boolean }[];
  messages: { content: string; createdAt: string; sender: { username: string } }[];
};

type UserChatData = {
  id: number;
  createdAt: string;
  participants: { id: number; username: string; avatar: string; isOnline: boolean }[];
  messages: { id: number; content: string; createdAt: string; sender: { username: string } }[];
};

export type { UserData, MessageData, ChatData, UserLoggedData, UserChatsData, UserChatData };
