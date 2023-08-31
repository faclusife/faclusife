import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Faclusife Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Hello
          </h1>
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-[3rem]">
            Welcome to Faclusife Website
          </h2>

          <AuthShowcase />
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const joke = api.example.getSecretMessage.useQuery(
    undefined, // no input,
  );

  useEffect(() => {
    if (joke.data) {
      console.log(joke.data);
    }
  }, [joke.data]);
  return joke.isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-[3rem]">
        Random Joke:
      </h2>
      <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-[2rem]">
        {joke.data}
      </h2>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={() => {
          const a = joke.refetch();
        }}
      >
        Get another joke
      </button>
    </div>
  );
}
