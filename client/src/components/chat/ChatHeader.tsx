import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import OptionsMenu from "./OptionsMenu";
import { Circle } from "@mui/icons-material";

type Props = {
  username: string | undefined;
  chatId: number;
  chatUsers: { id: number; username: string; avatar: string; isOnline: boolean }[];
  isOnline: boolean | undefined;
};

export default function ChatHeader({ username, chatId, chatUsers, isOnline }: Props) {
  return (
    <Box>
      <AppBar variant="elevation" position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6">{username}</Typography>
            {isOnline ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ marginRight: "10px" }}>Online</Typography>
                <Circle sx={{ fontSize: "10px", color: "primary.dark" }} />
              </Box>
            ) : (
              "Offline"
            )}
          </Box>
          <OptionsMenu chatId={chatId} chatUsers={chatUsers} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
