import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Rubik } from "next/font/google";
// import { NextUIProvider } from "@nextui-org/system";
import Footer from "@/components/landingpage/Footer";

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
      {/* <NextUIProvider> */}
      <NavBar />
      <Component {...pageProps} />
      <Footer />
      {/* </NextUIProvider> */}
    </SessionProvider>
  );
}
