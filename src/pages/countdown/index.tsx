import Head from "next/head";
import Countdown from "~/components/Countdown";

export default function CountDownPage() {
  return (
    <>
      <Head>
        <title>Countdown</title>
      </Head>
      <Countdown />
    </>
  );
}
