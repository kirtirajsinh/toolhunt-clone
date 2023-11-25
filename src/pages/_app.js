import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Raleway } from "next/font/google";

export const raleway = Raleway({
  subsets: ["latin"],
  weights: [400, 500, 600, 700, 800, 900],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <NavBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
