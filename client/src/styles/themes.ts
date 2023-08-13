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
