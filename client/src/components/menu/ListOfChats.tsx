import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import ChatCard from "./ChatCard";
import type { UserChatData } from "@/types";

type Props = {
  userChats: UserChatData[] | undefined;
  handler: Function;
};

export default function ListOfChats({ userChats, handler }: Props) {
  return (
    <CustomBox>
      {userChats && userChats.length !== 0 ? (
        userChats.map((chat) => {
          return (
            <Box key={chat.id} onClick={() => handler(chat.id)}>
              <ChatCard
                participants={chat.participants}
                messages={chat.messages}
                id={chat.id}
                createdAt={chat.createdAt}
              />
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
  );
}

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "calc(99vh - 85px)",
  borderRadius: "15px",
  overflowY: "scroll",
  padding: "5px",
}));
