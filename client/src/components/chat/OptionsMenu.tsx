import { useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import socket from "@/socketio";

type Props = {
  chatId: number;
};

export default function OptionsMenu({ chatId }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const deleteChatHandler = (chatId: number) => {
    socket.emit("delete_chat", chatId);
  };
  const deleteMessagesHandler = (chatId: number) => {
    socket.emit("delete_messages", chatId);
  };

  return (
    <Box>
      <MoreVert sx={{ color: "primary.dark", cursor: "pointer" }} onClick={handleClick} />
      <Menu
        sx={{
          "& .MuiMenu-paper": {
            width: "max-content",
            height: "max-content",
            "&:hover": {
              bgcolor: "primary.light",
            },
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          sx={{ transition: "0.2s", "&:hover": { borderRadius: "5px", transition: "0.2s" } }}
          onClick={() => {
            handleClose();
            deleteMessagesHandler(chatId);
          }}
        >
          Delete messages
        </MenuItem>
        <MenuItem
          sx={{ transition: "0.2s", "&:hover": { borderRadius: "5px", transition: "0.2s" } }}
          onClick={() => {
            handleClose();
            deleteChatHandler(chatId);
          }}
        >
          Delete chat
        </MenuItem>
      </Menu>
    </Box>
  );
}
