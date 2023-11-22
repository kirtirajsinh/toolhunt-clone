import { ThemeProvider } from "@/components/theme-provider";
import { Html, Head, Main, NextScript } from "next/document";
import { raleway } from "./_app";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={`${raleway.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Main />
          <NextScript />
        </ThemeProvider>
      </body>
    </Html>
  );
}
