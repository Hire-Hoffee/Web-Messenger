import { AppBar, Box, Toolbar, InputBase, styled } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import { OperationVariables, QueryResult, useLazyQuery } from "@apollo/client";
import socket from "@/socketio";

import MenuSlideBar from "./MenuSlideBar";
import { UserLoggedData, foundUsersData } from "@/types";
import FoundUsersList from "./FoundUsersList";
import { SEARCH_USERS } from "@/graphql/queries";

type Props = {
  userInfo: UserLoggedData | undefined;
};

export default function SearchChatBar({ userInfo }: Props) {
  const [foundUsers, setFoundUsers] = useState<foundUsersData[]>();
  const [searchUsers] = useLazyQuery(SEARCH_USERS);
  const [searchText, setSearchText] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchText(event.target.value);
  };

  const searchUsersHandler = async (searchText: string) => {
    const foundUsers: QueryResult<{ searchUsers: foundUsersData[] }, OperationVariables> =
      await searchUsers({ variables: { userName: searchText } });
    setFoundUsers(foundUsers.data?.searchUsers);
  };

  const createChatHandler = (user: foundUsersData) => {
    const data = {
      firstUsername: localStorage.getItem("username"),
      secondUsername: user.username,
    };
    socket.emit("create_chat", data);
    setSearchText("");
    setFoundUsers([]);
  };

  return (
    <>
      {userInfo ? (
        <Box sx={{ position: "relative" }}>
          <AppBar position="static" variant="elevation">
            <Toolbar>
              <MenuSlideBar userAvatar={userInfo.avatar} username={userInfo.username} />
              <SearchBar>
                <SearchIconWrapper>
                  <Search sx={{ color: "primary.dark" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  value={searchText}
                  onChange={(e) => {
                    handleInput(e);
                    searchUsersHandler(e.target.value);
                  }}
                />
              </SearchBar>
            </Toolbar>
          </AppBar>
          {foundUsers && foundUsers?.length !== 0 ? (
            <FoundUsersList handler={createChatHandler} users={foundUsers} />
          ) : (
            ""
          )}
        </Box>
      ) : (
        ""
      )}
    </>
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
