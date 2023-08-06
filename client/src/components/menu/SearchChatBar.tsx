import { AppBar, Box, Toolbar, InputBase, styled } from "@mui/material";
import { Search } from "@mui/icons-material";
import MenuSlideBar from "./MenuSlideBar";

type Props = {
  username: string | undefined;
  userAvatar: string | undefined;
};

export default function SearchChatBar({ userAvatar, username }: Props) {
  return (
    <Box>
      <AppBar position="static" variant="elevation">
        <Toolbar>
          <MenuSlideBar userAvatar={userAvatar} username={username} />
          <SearchBar>
            <SearchIconWrapper>
              <Search sx={{ color: "primary.dark" }} />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
          </SearchBar>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const SearchBar = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  backgroundColor: theme.palette.primary.light,
  borderRadius: "10px",
  marginLeft: "15px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));
