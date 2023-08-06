import { Box, Drawer, Button, Switch, Typography, Avatar, styled, alpha } from "@mui/material";
import { Menu, DarkMode, LightMode } from "@mui/icons-material";
import { useState } from "react";

type Anchor = "left";
type Props = {
  username: string | undefined;
  userAvatar: string | undefined;
};

export default function MenuSlideBar({ userAvatar, username }: Props) {
  const [state, setState] = useState({ left: false });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  return (
    <Box>
      <Menu
        onClick={toggleDrawer("left", true)}
        sx={{ color: "primary.dark", cursor: "pointer" }}
      />

      <Drawer
        PaperProps={{
          sx: {
            width: "inherit",
            marginLeft: "10px",
            height: "99vh",
            "&:hover": { bgcolor: "primary.light" },
          },
        }}
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        <Box sx={{ width: "300px", padding: "10px" }}>
          <Box>
            <Avatar alt="avatar" src={userAvatar} sx={{ width: 100, height: 100 }} />
            <Typography variant="h2" sx={{ fontSize: "26px", marginTop: "15px" }}>
              {username}
            </Typography>
          </Box>
          <Box display="flex" justifyContent={"space-between"} alignItems="center" marginY="20px">
            <Typography variant="h3" fontSize="18px">
              Change theme
            </Typography>
            <Box display="flex" alignItems="center">
              <CustomSwitch />
              <LightMode />
            </Box>
          </Box>
          <Button variant="contained">Log out</Button>
        </Box>
      </Drawer>
    </Box>
  );
}

const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase": {
    color: theme.palette.primary.dark,
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.dark, theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
