import { createTheme } from "@mui/material";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

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

export { lightTheme, darkTheme, roboto };
