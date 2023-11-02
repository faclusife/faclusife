import Head from "next/head";

import LoadingText from "~/components/loading";

import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Head>
        <title>Random Joke</title>
        <meta name="description" content="Random Joke Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <AuthShowcase />
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const joke = api.example.getSecretMessage.useQuery(
    undefined, // no input,
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );

  return joke.isLoading ? (
    <LoadingText />
  ) : (
    <div className="flex flex-col items-center justify-center gap-4">
      {joke?.data?.map((a, i) => {
        return (
          <h2
            key={`${i}-row`}
            className=" text-center text-xl font-extrabold leading-9 tracking-tight text-white sm:text-[2rem] "
          >
            {`${a}${
              joke.data?.length && joke.data.length > 1 && i == 0 ? "?" : ""
            }`}
          </h2>
        );
      })}
      <button
        className=" my-5 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={() => {
          void joke.refetch();
        }}
      >
        Get another joke
      </button>
    </div>
  );
}
