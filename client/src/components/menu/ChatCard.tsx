import { Paper, Typography, Avatar, Box } from "@mui/material";
import { Circle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { UserChatData } from "@/types";
import { useState } from "react";

export default function ChatCard({ messages, participants }: UserChatData) {
  const [username, setUsername] = useState(() => {
    if (participants.length === 2) {
      return localStorage.getItem("username") === participants[0].username
        ? participants[1].username
        : participants[0].username;
    }
    return participants[0].username;
  });
  const [userAvatar, setUserAvatar] = useState(() => {
    if (participants.length === 2) {
      return localStorage.getItem("username") === participants[0].username
        ? participants[1].avatar
        : participants[0].avatar;
    }
    return participants[0].avatar;
  });

  return (
    <Paper sx={{ "&:hover": { opacity: "0.8" } }}>
      <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Avatar alt="avatar" src={userAvatar} sx={{ width: 65, height: 65 }} />
        <FlexBox>
          <CustomBox>
            <Typography fontSize="14px" fontWeight="bold">
              {username}
            </Typography>
            <Typography fontSize="12px">
              {messages[0]?.createdAt
                ? new Date(Number(messages[0]?.createdAt))
                    .toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
                    .toString()
                : ""}
            </Typography>
          </CustomBox>
          <CustomBox>
            <Typography
              sx={{
                fontSize: "14px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {messages[0]?.content || "No messages"}
            </Typography>
          </CustomBox>
        </FlexBox>
      </Box>
    </Paper>
  );
}

const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "calc(100% - 75px)",
  height: "100%",
  marginLeft: "10px",
}));

const CustomBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
