import { Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChatHeader from "@/components/chat/ChatHeader";
import SearchChatBar from "@/components/menu/SearchChatBar";
import ChatCard from "@/components/menu/ChatCard";
import SentMessage from "@/components/messages/SentMessage";
import ReceivedMessage from "@/components/messages/ReceivedMessage";

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "99vh",
  borderRadius: "15px",
  overflowY: "scroll",
  padding: "5px",
}));

export default function Home() {
  return (
    <Grid container spacing={1} padding={0.5}>
      <Grid item md={3} sm={4}>
        <SearchChatBar />
        <CustomBox>
          <ChatCard />
          <ChatCard />
          <ChatCard />
        </CustomBox>
      </Grid>
      <Grid item md={9} sm={8}>
        <ChatHeader />
        <CustomBox>
          <SentMessage message="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
          <ReceivedMessage message="Lorem ipsum dolor sit" />
        </CustomBox>
      </Grid>
    </Grid>
  );
}
