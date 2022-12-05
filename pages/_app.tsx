import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import type { AppProps } from "next/app";
import { useEffect } from "react";

const queryClient = new QueryClient();

import "../styles/globals.css";
import axios from "axios";

let didInit: boolean = false;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const initializeSocket = async () => {
    await axios.post("http://localhost:3000/api/socket");
  };

  useEffect(() => {
    if (!didInit) {
      didInit = true;

      initializeSocket();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
}
