import type { NextPageContext } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Fallback from "../components/Fallback";
import SomeContent from "../components/SomeContent";
import SSRErrorBoundary from "../components/SSRErrorBoundary";

const logger = (...args: any[]) =>
  console.log("Logged from SSRErrorBoundary", ...args);

Home.getInitialProps = async (ctx: NextPageContext) => {
  return {};
};

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SSRErrorBoundary fallback={Fallback} logger={logger}>
        <SomeContent throw={false}>
          <p>I will render</p>
        </SomeContent>
      </SSRErrorBoundary>

      <SSRErrorBoundary fallback={Fallback} logger={logger}>
        <SomeContent throw={true}>
          <p>I will NOT render</p>
        </SomeContent>
      </SSRErrorBoundary>
    </div>
  );
}

export default Home;
