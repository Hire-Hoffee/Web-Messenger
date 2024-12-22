import { createTheme } from "@mui/material";
import localFont from "next/font/local";

const roboto = localFont({
  src: [
    {
      path: "../assets/font/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/font/Roboto-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/font/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
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
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 2,
      },
      variants: [
        {
          props: { variant: "elevation" },
          style: {
            display: "flex",
            justifyContent: "center",
            cursor: "default",
            width: "100%",
            height: "75px",
            padding: "10px",
            marginTop: "5px",
            marginBottom: "5px",
            borderRadius: "10px",
          },
        },
      ],
    },
    MuiPaper: {
      defaultProps: {
        elevation: 2,
      },
      variants: [
        {
          props: { variant: "elevation" },
          style: {
            backgroundColor: "#ffffff",
            transition: "0.2s",
            height: "75px",
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            marginBottom: "5px",
            borderRadius: "10px",
            cursor: "pointer",
          },
        },
      ],
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#111315",
      dark: "#2a85ff",
      light: "#1a1d1f",
    },
    background: { default: "#292f3f" },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 2,
      },
      variants: [
        {
          props: { variant: "elevation" },
          style: {
            display: "flex",
            justifyContent: "center",
            cursor: "default",
            width: "100%",
            height: "75px",
            padding: "10px",
            marginTop: "5px",
            marginBottom: "5px",
            borderRadius: "10px",
          },
        },
      ],
    },
    MuiPaper: {
      defaultProps: {
        elevation: 2,
      },
      variants: [
        {
          props: { variant: "elevation" },
          style: {
            backgroundColor: "#1a1d1f",
            transition: "0.2s",
            height: "75px",
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            marginBottom: "5px",
            borderRadius: "10px",
            cursor: "pointer",
          },
        },
      ],
    },
  },
});

export { lightTheme, darkTheme, roboto };
