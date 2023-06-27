import { GlobalStylesProps } from "@mui/material";

export const globalStyles: GlobalStylesProps = {
  styles: {
    html: {
      height: "100%",
      overflow: "hidden",
    },
    "*::-webkit-scrollbar": {
      width: "10px",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#c4c4cc",
      borderRadius: "10px",
      border: "3px solid #ffffff",
    },
    a: {
      color: "#28a8e9",
      textDecoration: "none",
      transition: "0.2s",
    },
    "a:hover": {
      color: "#248abd",
      transition: "0.2s",
    },
  },
};
