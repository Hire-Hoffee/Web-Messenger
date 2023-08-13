import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import OptionsMenu from "./OptionsMenu";

type Props = {
  username: string | undefined;
  chatId: number;
};

export default function ChatHeader({ username, chatId }: Props) {
  return (
    <Box>
      <AppBar variant="elevation" position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6">{username}</Typography>
            <Typography sx={{ fontSize: "14px" }}>Was online 3 hours ago</Typography>
          </Box>
          <OptionsMenu chatId={chatId} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
