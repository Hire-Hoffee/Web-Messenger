import { Paper, Typography, Avatar, Box } from "@mui/material";
import { Circle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

type Props = {};

const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  marginLeft: "15px",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "100%",
}));

const CustomBox = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

export default function ChatCard({}: Props) {
  return (
    <Paper>
      <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Avatar alt="avatar" src="https://i.pravatar.cc/100" sx={{ width: 65, height: 65 }} />
        <FlexBox>
          <CustomBox>
            <Typography component="h3" sx={{ fontSize: "16px" }}>
              Vasya
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>Long message...</Typography>
          </CustomBox>
          <CustomBox sx={{ alignItems: "center" }}>
            <Typography sx={{ fontSize: "12px" }}>18:26</Typography>
            <Circle sx={{ fontSize: "18px", color: "primary.dark" }} />
          </CustomBox>
        </FlexBox>
      </Box>
    </Paper>
  );
}
