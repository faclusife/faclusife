import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>D202</title>
        <meta
          name="description"
          content="Jokes, darts stats, and movie ratings"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-[3rem]">
            Welcome to <span className="text-[hsl(280,100%,70%)]">D202</span>
          </h1>
          <p className="max-w-xl text-center text-lg text-white/70">
            One place for our jokes, darts stats, and movie ratings.
          </p>
          <nav
            aria-label="Site sections"
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            <NavCard
              href="/jokes"
              title="Random Joke"
              description="Generate a fresh joke on demand."
            />
            <NavCard
              href="/darts"
              title="Darts Stats"
              description="Brogden & Bohdan darts tracker."
            />
            <NavCard
              href="/movies"
              title="Movie Ratings"
              description="Коля і Богдан's movie ratings."
            />
          </nav>
        </div>
      </main>
    </>
  );
}

function NavCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex max-w-xs flex-col gap-2 rounded-xl bg-white/10 p-6 text-white no-underline transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <h2 className="text-xl font-bold">{title} →</h2>
      <p className="text-sm text-white/80">{description}</p>
    </Link>
  );
}
