type UserRegisterData = {
  email: string;
  username: string;
  password: string;
  avatar: string;
};

type UserLoggedData = {
  email: string;
  username: string;
  avatar: string;
  createdAt: string;
  isOnline: boolean;
};

type SendedMessageData = {
  content: string;
  senderId: number;
  receiverId: number;
  chatId: number;
};

type ReceivedMessageData = {
  id: number;
  content: string;
  createdAt: string;
  senderId: number;
  receiverId: number;
  chatId: number;
  sender: UserLoggedData;
};

type UserChatData = {
  id: number;
  createdAt: string;
  participants: { id: number; username: string; avatar: string; isOnline: boolean }[];
  messages: { id: number; content: string; createdAt: string; sender: { username: string } }[];
};

type foundUsersData = {
  id: number;
  avatar: string;
  username: string;
};

export type {
  UserLoggedData,
  UserChatData,
  SendedMessageData,
  ReceivedMessageData,
  foundUsersData,
  UserRegisterData,
};
