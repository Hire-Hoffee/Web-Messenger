import { Button, InputBase, Paper } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { Send } from "@mui/icons-material";

type Props = {
  message: string;
  handlerBtn: Function;
  handlerInput: Function;
};

export default function MessageInput({ message, handlerBtn, handlerInput }: Props) {
  return (
    <CustomPaper>
      <CustomInput
        onChange={(e) => {
          handlerInput(e);
        }}
        fullWidth
        placeholder="Type here..."
        value={message}
      />
      <CustomButton
        onClick={() => {
          handlerBtn(message);
        }}
      >
        <Send />
      </CustomButton>
    </CustomPaper>
  );
}

const CustomPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  position: "absolute",
  bottom: "0",
  borderRadius: "15px",
  width: "calc(100% - 0.5rem)",
  overflow: "hidden",
  alignItems: "center",
  margin: "auto",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

const CustomInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: "15px",
  margin: "5px",
  padding: "10px 20px 10px 20px",
  border: "3px solid primary.dark",
  fontSize: "18px",
}));

const CustomButton = styled(Button)(({ theme }) => ({
  height: "50px",
  marginLeft: "30px",
  padding: "0px 30px 0px 30px",
  backgroundColor: theme.palette.primary.dark,
  borderRadius: "15px",
  transition: "0.2s",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    opacity: "0.8",
    transition: "0.2s",
  },
}));
