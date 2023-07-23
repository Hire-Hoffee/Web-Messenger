import { Grid, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { QueryResult, OperationVariables } from "@apollo/client";

import ChatHeader from "@/components/chat/ChatHeader";
import SearchChatBar from "@/components/menu/SearchChatBar";
import ChatCard from "@/components/menu/ChatCard";
import SentMessage from "@/components/messages/SentMessage";
import ReceivedMessage from "@/components/messages/ReceivedMessage";
import MessageInput from "@/components/chat/MessageInput";
import { UserLoggedData, UserChatsData, UserChatData } from "@/types";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_INFO, GET_USER_CHATS, GET_CHAT_DATA } from "@/graphql/queries";

export default function Home() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserLoggedData>();
  const [userChats, setUserChats] = useState<UserChatsData[]>();
  const [userChatData, setUserChatData] = useState<UserChatData>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [getUserInfo] = useLazyQuery(GET_USER_INFO);
  const [getUserChats] = useLazyQuery(GET_USER_CHATS);
  const [getChatData] = useLazyQuery(GET_CHAT_DATA);

  const getChatDataHandler = async (chatId: number | undefined) => {
    const chatData: QueryResult<{ getChatData: UserChatData }, OperationVariables> =
      await getChatData({ variables: { chatId } });

    setUserChatData(chatData.data?.getChatData);
  };

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      router.push("/auth/login");
    }

    (async () => {
      try {
        const variables = { username: localStorage.getItem("username") };

        const [userInfo, userChats]: [
          QueryResult<{ getUserInfo: UserLoggedData }, OperationVariables>,
          QueryResult<{ getUserChats: UserChatsData[] }, OperationVariables>
        ] = await Promise.all([getUserInfo({ variables }), getUserChats({ variables })]);

        setUserInfo(userInfo.data?.getUserInfo);
        setUserChats(userChats.data?.getUserChats);
      } catch (error: any) {
        setErrorMessage(error.networkError?.result.errors[0].message);
        return;
      }
    })();

    const socket = io("http://localhost:4000");
    socket.on("connect", () => {
      console.log("connected client ! " + socket.id);
    });
  }, []);

  return (
    <Grid container spacing={1} padding={0.5}>
      <Grid item md={3} sm={4}>
        <SearchChatBar />
        <CustomBox>
          {userChats ? (
            userChats.map((chat) => {
              return (
                <Box key={chat.id} onClick={() => getChatDataHandler(chat.id)}>
                  <ChatCard participants={chat.participants} messages={chat.messages} />
                </Box>
              );
            })
          ) : (
            <Typography
              sx={{ textAlign: "center", marginTop: "50px", color: "primary.dark" }}
              variant="h5"
            >
              No chats
            </Typography>
          )}
        </CustomBox>
      </Grid>
      <Grid item md={9} sm={8} sx={{ position: "relative" }}>
        <ChatHeader />
        <CustomBox sx={{ paddingBottom: "75px" }}>
          {userChatData ? (
            userChatData.messages.map((msg) => {
              if (localStorage.getItem("username") === msg.sender.username) {
                return <SentMessage message={msg.content} createdAt={msg.createdAt} key={msg.id} />;
              }
              return (
                <ReceivedMessage message={msg.content} createdAt={msg.createdAt} key={msg.id} />
              );
            })
          ) : (
            <Typography
              sx={{ textAlign: "center", marginTop: "150px", color: "primary.dark" }}
              variant="h4"
            >
              No messages
            </Typography>
          )}
        </CustomBox>
        <MessageInput />
      </Grid>
    </Grid>
  );
}

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "calc(99vh - 85px)",
  borderRadius: "15px",
  overflowY: "scroll",
  padding: "5px",
}));
