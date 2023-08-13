import { Paper, Typography, Avatar, Box } from "@mui/material";
import { Circle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { UserChatData } from "@/types";
import { useState } from "react";

export default function ChatCard({ messages, participants }: UserChatData) {
  const [username, setUsername] = useState(
    localStorage.getItem("username") === participants[0].username
      ? participants[1].username
      : participants[0].username
  );
  const [userAvatar, setUserAvatar] = useState(
    localStorage.getItem("username") === participants[0].username
      ? participants[1].avatar
      : participants[0].avatar
  );

  return (
    <Paper sx={{ "&:hover": { opacity: "0.8" } }}>
      <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Avatar alt="avatar" src={userAvatar} sx={{ width: 65, height: 65 }} />
        <FlexBox>
          <CustomBox>
            <Typography component="h3" sx={{ fontSize: "16px" }}>
              {username}
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              {messages[0]?.content || "No messages"}
            </Typography>
          </CustomBox>
          <CustomBox sx={{ alignItems: "center" }}>
            <Typography sx={{ fontSize: "12px" }}>
              {messages[0]?.createdAt
                ? new Date(Number(messages[0]?.createdAt))
                    .toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
                    .toString()
                : ""}
            </Typography>
            <Circle sx={{ fontSize: "18px", color: "primary.dark" }} />
          </CustomBox>
        </FlexBox>
      </Box>
    </Paper>
  );
}

const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  marginLeft: "15px",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "100%",
}));

const CustomBox = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));
