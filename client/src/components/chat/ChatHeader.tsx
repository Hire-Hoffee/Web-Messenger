import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import OptionsMenu from "./OptionsMenu";

type Props = {
  username: string | undefined;
};

export default function ChatHeader({ username }: Props) {
  return (
    <Box>
      <AppBar variant="elevation" position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6">{username}</Typography>
            <Typography sx={{ fontSize: "14px" }}>Was online 3 hours ago</Typography>
          </Box>
          <OptionsMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
