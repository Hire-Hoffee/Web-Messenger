import { Avatar, List, ListItem, ListItemAvatar, ListItemText, styled } from "@mui/material";
import React from "react";

import type { foundUsersData } from "@/types";

type Props = {
  users: foundUsersData[];
  handler: Function;
};

export default function FoundUsersList({ users, handler }: Props) {
  return (
    <StyledList>
      {users.map((user) => {
        return (
          <StyledListItem key={user.id} onClick={() => handler(user)}>
            <ListItemAvatar>
              <Avatar src={user.avatar} />
            </ListItemAvatar>
            <ListItemText primary={user.username} />
          </StyledListItem>
        );
      })}
    </StyledList>
  );
}

const StyledListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  borderRadius: "15px",
  boxShadow: "4px 4px 8px 0px rgba(34, 60, 80, 0.2)",
  marginBottom: "5px",
  transition: "0.2s",
  cursor: "pointer",
  "&:hover": {
    opacity: "0.8",
    transition: "0.2s",
  },
}));

const StyledList = styled(List)(({ theme }) => ({
  position: "absolute",
  zIndex: "9999",
  width: "100%",
  height: "calc(99vh - 85px)",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "15px",
}));
