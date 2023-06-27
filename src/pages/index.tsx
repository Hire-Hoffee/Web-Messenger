import { Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChatHeader from "@/components/chat/ChatHeader";
import SearchChatBar from "@/components/menu/SearchChatBar";

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
        <CustomBox>Lorem ipsum dolor sit amet consectetur adipisicing elit.</CustomBox>
      </Grid>
      <Grid item md={9} sm={8}>
        <ChatHeader />
        <CustomBox>Lorem ipsum dolor sit amet consectetur adipisicing elit.</CustomBox>
      </Grid>
    </Grid>
  );
}
