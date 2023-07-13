import { Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { io } from "socket.io-client";
import { useEffect } from "react";

import ChatHeader from "@/components/chat/ChatHeader";
import SearchChatBar from "@/components/menu/SearchChatBar";
import ChatCard from "@/components/menu/ChatCard";
import SentMessage from "@/components/messages/SentMessage";
import ReceivedMessage from "@/components/messages/ReceivedMessage";
import MessageInput from "@/components/chat/MessageInput";

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "calc(99vh - 85px)",
  borderRadius: "15px",
  overflowY: "scroll",
  padding: "5px",
}));

export default function Home() {
  useEffect(() => {
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
