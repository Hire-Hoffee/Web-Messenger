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
  },
};
