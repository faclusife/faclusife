import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Grug Bohdan</title>
        <meta name="description" content="My little blog and other stuff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto max-w-3xl px-4 py-10 text-[#444]">
        <div>
          <img
            alt="Bohdan"
            src="/main-avatar.gif"
            className="float-left clear-both mr-5 h-[120px] w-auto"
          />
          <h1 className="text-2xl font-bold leading-tight">
            Grug Bohdan
            <br />
            <small className="text-base font-normal text-[#444]">
              My little blog and other stuff
            </small>
          </h1>
        </div>
        <nav
          aria-label="Site sections"
          className="float-right text-xl font-bold"
        >
          <Link href="/jokes" className="text-[#444] hover:underline">
            Jokes
          </Link>{" "}
          |{" "}
          <Link href="/darts" className="text-[#444] hover:underline">
            Darts
          </Link>{" "}
          |{" "}
          <Link href="/movies" className="text-[#444] hover:underline">
            Movies
          </Link>
        </nav>
        <div className="clear-both" />
        <h1 className="text-2xl font-bold">Introduction</h1>
        <p>
          this collection of thoughts, jokes and stats gathered by me over many
          years of sitting at keyboard, throwing darts and watching movies with
          friends. grug not know much, but grug know what grug like.
        </p>
        <h1 className="text-2xl font-bold">Why This Site Exist</h1>
        <p>
          grug used to keep jokes, darts scores and movie ratings in head, or
          scattered in many places. head only so big, and grug forget things
          easily. so grug make one small site to hold it all, so grug (and
          friends) can find it again later without asking grug to remember.
        </p>
        <h1 className="text-2xl font-bold">What You Find Here</h1>
        <p>
          click link above for random joke when grug need laugh, click link for
          darts to see who winning between friends, click link for movies to see
          what grug and friends watched and how good movie was. simple site,
          simple grug, simple happy.
        </p>
      </main>
    </>
  );
}
