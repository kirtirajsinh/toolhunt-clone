import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Rubik } from "next/font/google";

export const rubik = Rubik({
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
