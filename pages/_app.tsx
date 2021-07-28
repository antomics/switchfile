import type { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import { Chakra } from "../lib/Chakra";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <div style={{ minHeight: "100vh" }}>
        <Component {...pageProps} />
      </div>
    </Chakra>
  );
}
export default MyApp;

export { getServerSideProps } from "../lib/Chakra";
