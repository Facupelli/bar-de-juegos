import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
}
