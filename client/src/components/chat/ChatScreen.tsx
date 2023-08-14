import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { UserChatData } from "@/types";
import ChatHeader from "./ChatHeader";
import SentMessage from "./messages/SentMessage";
import ReceivedMessage from "./messages/ReceivedMessage";

type Props = {
  userChatData: UserChatData | undefined;
};

export default function ChatScreen({ userChatData }: Props) {
  return (
    <>
      {userChatData ? (
        <ChatHeader
          username={
            userChatData.participants[0].username === localStorage.getItem("username")
              ? userChatData.participants[1].username
              : userChatData.participants[0].username
          }
          chatId={userChatData.id}
          chatUsers={userChatData.participants}
          isOnline={
            userChatData.participants[0].username === localStorage.getItem("username")
              ? userChatData.participants[1].isOnline
              : userChatData.participants[0].isOnline
          }
        />
      ) : (
        ""
      )}

      <CustomBox sx={{ paddingBottom: "75px" }}>
        {userChatData ? (
          userChatData.messages.length === 0 ? (
            <Typography
              sx={{ textAlign: "center", marginTop: "150px", color: "primary.dark" }}
              variant="h5"
            >
              No messages
            </Typography>
          ) : (
            userChatData.messages.map((msg) => {
              if (localStorage.getItem("username") === msg.sender.username) {
                return <SentMessage message={msg.content} createdAt={msg.createdAt} key={msg.id} />;
              }
              return (
                <ReceivedMessage message={msg.content} createdAt={msg.createdAt} key={msg.id} />
              );
            })
          )
        ) : (
          <Typography
            sx={{ textAlign: "center", marginTop: "150px", color: "primary.dark" }}
            variant="h5"
          >
            Select who you want to write to...
          </Typography>
        )}
      </CustomBox>
    </>
  );
}

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "calc(99vh - 85px)",
  borderRadius: "15px",
  overflowY: "scroll",
  padding: "5px",
}));
