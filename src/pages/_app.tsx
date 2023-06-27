import type { AppProps } from "next/app";
import Head from "next/head";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/utils/createEmotionCache";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "@/styles/themes";

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="description" content="Web Messenger built with NextJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>ChatScape</title>
      </Head>
      <ThemeProvider theme={lightTheme}></ThemeProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </CacheProvider>
  );
}
