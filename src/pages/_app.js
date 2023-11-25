import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Rubik } from "next/font/google";
import { NextUIProvider } from "@nextui-org/system";

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
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  );
}
