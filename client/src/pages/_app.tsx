import type { AppProps } from "next/app";
import Head from "next/head";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/utils/createEmotionCache";
import { CssBaseline, ThemeProvider, GlobalStyles } from "@mui/material";
import { ApolloProvider } from "@apollo/client";

import { lightTheme, darkTheme } from "@/styles/themes";
import { globalStyles } from "@/styles/globalStyles";
import client from "@/graphql/client";

import socket from "@/socketio";
import { useEffect, useState } from "react";

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");

    socket.on("changed_theme", (data: string) => {
      setTheme(data);
    });
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="description" content="Web Messenger built with NextJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>ChatScape</title>
      </Head>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles.styles} />
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
