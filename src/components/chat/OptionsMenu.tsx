import { useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

export default function OptionsMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
      <MoreVert sx={{ color: "primary.dark", cursor: "pointer" }} onClick={handleClick} />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "250px",
            height: "300px",
          },
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>See profile</MenuItem>
        <MenuItem onClick={handleClose}>Clear history</MenuItem>
        <MenuItem onClick={handleClose}>Delete chat</MenuItem>
      </Menu>
    </Box>
  );
}
