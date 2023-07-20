type UserData = {
  userData: {
    email: string;
    password: string;
    username: string;
    avatar?: string;
  };
};

type MessageData = {
  messageData: {
    content: string;
    senderId: number;
    receiverId: number;
    chatId: number;
  };
};

type ChatData = {
  chatData: {
    senderId: number;
    receiverId: number;
    firstMessageContent: string;
  };
};

export type { UserData, MessageData, ChatData };
