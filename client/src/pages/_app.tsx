import type { AppProps } from "next/app";
import Head from "next/head";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/utils/createEmotionCache";
import { CssBaseline, ThemeProvider, GlobalStyles } from "@mui/material";
import { ApolloProvider } from "@apollo/client";

import { lightTheme, darkTheme } from "@/styles/themes";
import { globalStyles } from "@/styles/globalStyles";
import client from "@/graphql/client";

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
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles.styles} />
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
