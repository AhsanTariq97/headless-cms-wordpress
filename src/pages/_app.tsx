import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AppContextProvider from "./utils/AppContext";

export const client = new ApolloClient({
  uri: "https://dev-wordpress-practice-cms.pantheonsite.io/graphql",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider attribute="class">
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
