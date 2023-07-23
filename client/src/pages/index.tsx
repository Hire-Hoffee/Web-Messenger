import { Grid, Box } from "@mui/material";
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
import { UserLoggedData, UserChatsData } from "@/types";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_INFO, GET_USER_CHATS } from "@/graphql/queries";

export default function Home() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserLoggedData>();
  const [userChats, setUserChats] = useState<UserChatsData[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [getUserInfo] = useLazyQuery(GET_USER_INFO);
  const [getUserChats] = useLazyQuery(GET_USER_CHATS);

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
          <ChatCard />
          <ChatCard />
          <ChatCard />
        </CustomBox>
      </Grid>
      <Grid item md={9} sm={8} sx={{ position: "relative" }}>
        <ChatHeader />
        <CustomBox sx={{ paddingBottom: "75px" }}>
          <SentMessage message="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
          <ReceivedMessage message="Lorem ipsum dolor sit" />
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
