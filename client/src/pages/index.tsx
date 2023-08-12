import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import type { QueryResult, OperationVariables } from "@apollo/client";

import SearchChatBar from "@/components/menu/SearchChatBar";
import MessageInput from "@/components/chat/MessageInput";
import ListOfChats from "@/components/menu/ListOfChats";
import ChatScreen from "@/components/chat/ChatScreen";

import type { UserLoggedData, UserChatData, SendedMessageData, ReceivedMessageData } from "@/types";
import { GET_USER_INFO, GET_USER_CHATS, GET_CHAT_DATA } from "@/graphql/queries";
import socket from "@/socketio";

export default function Home() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<UserLoggedData>();
  const [userChats, setUserChats] = useState<UserChatData[]>();
  const [userChatData, setUserChatData] = useState<UserChatData>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [message, setMessage] = useState<string>("");

  const [getUserInfo] = useLazyQuery(GET_USER_INFO);
  const [getUserChats] = useLazyQuery(GET_USER_CHATS);
  const [getChatData] = useLazyQuery(GET_CHAT_DATA);

  const getChatDataHandler = async (chatId: number | undefined) => {
    const chatData: QueryResult<{ getChatData: UserChatData }, OperationVariables> =
      await getChatData({ variables: { chatId } });
    setUserChatData(chatData.data?.getChatData);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = (msgContent: string) => {
    if (!msgContent) {
      return;
    }
    if (!userChatData) {
      setMessage("");
      return;
    }

    const participants = userChatData.participants;
    const chatRoom = [participants[0].username, participants[1].username];

    const senderId =
      participants[0].username === localStorage.getItem("username")
        ? participants[0].id
        : participants[1].id;
    const receiverId =
      participants[0].username === localStorage.getItem("username")
        ? participants[1].id
        : participants[0].id;

    const message: SendedMessageData = {
      content: msgContent,
      chatId: userChatData.id,
      senderId,
      receiverId,
    };

    socket.emit("message", { msg: message, room: chatRoom });
    setMessage("");
  };

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      router.push("/auth/login");
      return;
    }

    (async () => {
      try {
        const variables = { username: localStorage.getItem("username") };
        type FetchingData = [
          QueryResult<{ getUserInfo: UserLoggedData }, OperationVariables>,
          QueryResult<{ getUserChats: UserChatData[] }, OperationVariables>
        ];

        const [userInfo, userChats]: FetchingData = await Promise.all([
          getUserInfo({ variables }),
          getUserChats({ variables }),
        ]);

        setUserInfo(userInfo.data?.getUserInfo);
        setUserChats(userChats.data?.getUserChats);

        socket.emit("join_own_room", localStorage.getItem("username"));
      } catch (error: any) {
        setErrorMessage(error.networkError?.result.errors[0].message);
        return;
      }
    })();
  }, []);

  useEffect(() => {
    socket.on("message", (data: ReceivedMessageData) => {
      if (userChatData) {
        data.createdAt = String(Date.now());
        setUserChatData({ ...userChatData, messages: [...userChatData.messages, data] });
      }
    });

    socket.on("created_chat", (data: UserChatData) => {
      userChats ? setUserChats([data, ...userChats]) : setUserChats([data]);
    });
  }, [userChatData, userChats]);

  return (
    <Grid container spacing={1} padding={0.5}>
      <Grid item md={3} sm={4}>
        <SearchChatBar userInfo={userInfo} />
        <ListOfChats userChats={userChats} getChatDataHandler={getChatDataHandler} />
      </Grid>
      <Grid item md={9} sm={8} sx={{ position: "relative" }}>
        <ChatScreen userChatData={userChatData} />
        <MessageInput message={message} handlerInput={handleInput} handlerBtn={sendMessage} />
      </Grid>
    </Grid>
  );
}
