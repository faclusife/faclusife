import Head from "next/head";
import Countdown from "~/components/Countdown";

export default function CountDownPage() {
  return (
    <>
      <Head>
        <meta property="og:title" content="Countdown Timer" />
        <meta
          property="og:description"
          content="Countdown to your special event in style!"
        />
        <meta
          property="og:image"
          content="https://example.com/path-to-image.jpg"
        />
        <meta property="og:url" content="https://example.com" />
        <meta property="og:type" content="website" />
        <title>Countdown</title>
      </Head>
      <Countdown />
    </>
  );
}
