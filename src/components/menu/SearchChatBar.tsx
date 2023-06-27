import { AppBar, Box, Toolbar, InputBase, styled } from "@mui/material";
import { Search, Menu } from "@mui/icons-material";

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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function SearchChatBar() {
  return (
    <Box>
      <AppBar position="static" variant="elevation">
        <Toolbar>
          <Menu sx={{ color: "primary.dark", cursor: "pointer" }} />
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
