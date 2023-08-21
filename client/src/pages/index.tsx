import { Grid } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import type { QueryResult, OperationVariables } from "@apollo/client";

import SearchChatBar from "@/components/menu/SearchChatBar";
import MessageInput from "@/components/chat/MessageInput";
import ListOfChats from "@/components/menu/ListOfChats";
import ChatScreen from "@/components/chat/ChatScreen";

import type { UserLoggedData, UserChatData, SendedMessageData, ReceivedMessageData } from "@/types";
import { GET_USER_INFO, GET_USER_CHATS, GET_CHAT_DATA } from "@/graphql/queries";
import socket from "@/socketio";

export default function Home() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<UserLoggedData>();
  const [userChats, setUserChats] = useState<UserChatData[]>();
  const [userChatData, setUserChatData] = useState<UserChatData>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [message, setMessage] = useState<string>("");
  const [gridMd, setGridMd] = useState<[number, number]>([2.95, 8.95]);
  const [gridSm, setGridSm] = useState<[number, number]>([4, 8]);

  const [getUserInfo] = useLazyQuery(GET_USER_INFO);
  const [getUserChats] = useLazyQuery(GET_USER_CHATS);
  const [getChatData] = useLazyQuery(GET_CHAT_DATA);

  const fullGrid = useRef<HTMLDivElement>(null);
  const gridItem = useRef<HTMLDivElement>(null);

  const getChatDataHandler = async (chatId: number | undefined) => {
    const chatData: QueryResult<{ getChatData: UserChatData }, OperationVariables> =
      await getChatData({ variables: { chatId } });

    let data = chatData.data?.getChatData;

    if (data && data?.participants.length !== 2) {
      data = { ...data, participants: [data.participants[0], data.participants[0]] };
    }

    setUserChatData(data);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = (msgContent: string) => {
    if (!msgContent) {
      return;
    }
    if (!userChatData) {
      setMessage("");
      return;
    }

    const participants = userChatData.participants;
    const chatRoom = [participants[0].username, participants[1].username];

    const senderId =
      participants[0].username === localStorage.getItem("username")
        ? participants[0].id
        : participants[1].id;
    const receiverId =
      participants[0].username === localStorage.getItem("username")
        ? participants[1].id
        : participants[0].id;

    const message: SendedMessageData = {
      content: msgContent,
      chatId: userChatData.id,
      senderId,
      receiverId,
    };

    socket.emit("message", { msg: message, room: chatRoom });
    setMessage("");
  };

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      router.push("/auth/login");
      return;
    }

    (async () => {
      try {
        const variables = { username: localStorage.getItem("username") };
        type FetchingData = [
          QueryResult<{ getUserInfo: UserLoggedData }, OperationVariables>,
          QueryResult<{ getUserChats: UserChatData[] }, OperationVariables>
        ];

        const [userInfo, userChats]: FetchingData = await Promise.all([
          getUserInfo({ variables }),
          getUserChats({ variables }),
        ]);

        if (userChats.data?.getUserChats) {
          setUserChats(
            [...userChats.data?.getUserChats].sort((a, b) => {
              return Number(b.messages[0].createdAt) - Number(a.messages[0].createdAt);
            })
          );
        }
        setUserInfo(userInfo.data?.getUserInfo);

        socket.emit("join_own_room", localStorage.getItem("username"));
      } catch (error: any) {
        setErrorMessage(error.networkError?.result.errors[0].message);
        return;
      }
    })();
  }, []);

  useEffect(() => {
    socket.on("message", (data: ReceivedMessageData) => {
      data.createdAt = String(Date.now());

      if (userChatData) {
        setUserChatData({ ...userChatData, messages: [...userChatData.messages, data] });
      }

      setUserChats((prev) => {
        const chats = prev?.map((chat) =>
          chat.id === data.chatId ? { ...chat, messages: [data] } : chat
        );
        chats?.sort((a, b) => {
          return Number(b.messages[0].createdAt) - Number(a.messages[0].createdAt);
        });
        return chats;
      });
    });

    socket.on("created_chat", (data: UserChatData) => {
      userChats ? setUserChats([data, ...userChats]) : setUserChats([data]);
    });

    socket.on("chat_deleted", (data: { id: number; createdAt: Date }) => {
      setUserChats((prev) => prev?.filter((chat) => chat.id !== data.id));
      setUserChatData(undefined);
    });

    socket.on("messages_deleted", (data: number) => {
      setUserChatData((prev) => (prev ? { ...prev, messages: [] } : prev));
      setUserChats((prev) =>
        prev?.map((chat) => (chat.id === data ? { ...chat, messages: [] } : chat))
      );
    });
  }, [userChatData, userChats]);

  const handleMouseMove = useCallback((e: any) => {
    const absVal = Math.abs(e.movementX / 200);
    if (e.movementX > 0) {
      setGridMd([(gridMd[0] += absVal), (gridMd[1] -= absVal)]);
      setGridSm([(gridSm[0] += absVal), (gridSm[1] -= absVal)]);
    }
    if (e.movementX < 0) {
      setGridMd([(gridMd[0] -= absVal), (gridMd[1] += absVal)]);
      setGridSm([(gridSm[0] -= absVal), (gridSm[1] += absVal)]);
    }
    return;
  }, []);

  const addListeners = (e: React.MouseEvent, item: HTMLDivElement | null) => {
    e.currentTarget.addEventListener("mousemove", handleMouseMove);
    item?.addEventListener("mousemove", handleMouseMove);
  };
  const removeListeners = (e: React.MouseEvent, item: HTMLDivElement | null) => {
    e.currentTarget.removeEventListener("mousemove", handleMouseMove);
    item?.removeEventListener("mousemove", handleMouseMove);
  };

  return (
    <Grid
      container
      padding={0.5}
      ref={fullGrid}
      onMouseUp={(e) => removeListeners(e, gridItem.current)}
    >
      <Grid item md={gridMd[0]} sm={gridSm[0]}>
        <SearchChatBar userInfo={userInfo} />
        <ListOfChats userChats={userChats} handler={getChatDataHandler} />
      </Grid>
      <Grid
        item
        md={0.1}
        sm={0.1}
        sx={{ cursor: "col-resize" }}
        ref={gridItem}
        onMouseDown={(e) => addListeners(e, fullGrid.current)}
        onMouseUp={(e) => removeListeners(e, fullGrid.current)}
      ></Grid>
      <Grid item md={gridMd[1]} sm={gridSm[1]} sx={{ position: "relative" }}>
        <ChatScreen userChatData={userChatData} />
        <MessageInput
          chatData={userChatData}
          message={message}
          handlerInput={handleInput}
          handlerBtn={sendMessage}
        />
      </Grid>
    </Grid>
  );
}
