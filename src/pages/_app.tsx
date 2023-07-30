import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AppContextProvider from "./utils/AppContext";

export const client = new ApolloClient({
  uri: "https://dev-wordpress-practice-cms.pantheonsite.io/graphql",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </ApolloProvider>
  );
}
