import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  borderRadius: "10px",
  display: "flex",
  maxWidth: "500px",
  width: "fit-content",
  padding: "5px 10px 5px 10px",
  justifyContent: "space-between",
  alignItems: "end",
  margin: "15px",
}));

type Props = {
  message: string;
};

export default function SentMessage({ message }: Props) {
  return (
    <CustomBox>
      <Typography sx={{ marginRight: "5px", fontSize: "16px", color: "#ffffff" }}>
        {message}
      </Typography>
      <Typography sx={{ marginLeft: "5px", fontSize: "12px", color: "#fafafa" }}>18:34</Typography>
    </CustomBox>
  );
}
