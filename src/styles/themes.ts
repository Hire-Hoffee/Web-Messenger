import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f5f6ff",
      dark: "#28a8e9",
      light: "#ffffff",
    },
    background: { default: "#fbfbfb" },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#292f3f" },
  },
});

export { lightTheme, darkTheme };
