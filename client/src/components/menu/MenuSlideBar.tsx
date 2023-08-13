import {
  Box,
  Drawer,
  Switch,
  Avatar,
  styled,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
} from "@mui/material";
import { Menu, DarkMode, LightMode, Logout } from "@mui/icons-material";
import { useEffect, useState } from "react";

import socket from "@/socketio";
import { useRouter } from "next/router";

type Anchor = "left";
type Props = {
  username: string | undefined;
  userAvatar: string | undefined;
};

export default function MenuSlideBar({ userAvatar, username }: Props) {
  const [state, setState] = useState({ left: false });
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const changeThemeHandler = () => {
    const user = localStorage.getItem("username");

    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "light");
      socket.emit("change_theme", { theme: "light", user });
      setChecked(false);
      return;
    }
    if (localStorage.getItem("theme") === "light") {
      localStorage.setItem("theme", "dark");
      socket.emit("change_theme", { theme: "dark", user });
      setChecked(true);
      return;
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("username");
    router.push("/auth/login");
  };

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

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
      setChecked(false);
      return;
    }
    localStorage.getItem("theme") === "dark" ? setChecked(true) : setChecked(false);
  }, []);

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
            cursor: "unset",
          },
        }}
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        <Box sx={{ width: "250px" }}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={userAvatar} />
              </ListItemAvatar>
              <ListItemText primary={username} />
            </ListItem>

            <Divider sx={{ marginY: "20px" }} />

            <CustomListItem onClick={changeThemeHandler}>
              <ListItemText primary="Theme" />
              <CustomSwitch checked={checked} />
              <ListItemIcon>{checked ? <DarkMode /> : <LightMode />}</ListItemIcon>
            </CustomListItem>

            <CustomListItem onClick={logoutHandler}>
              <ListItemText primary="Logout" />
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
            </CustomListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase": {
    color: theme.palette.primary.dark,
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.primary.dark,
  },
  "& .MuiSwitch-track": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const CustomListItem = styled(ListItem)(({ theme }) => ({
  transition: "0.2s",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "10px",
    transition: "0.2s",
    cursor: "pointer",
  },
}));
