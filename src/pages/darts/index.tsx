import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import toast from "react-hot-toast";
import LoadingText from "~/components/loading";
import TableDarts from "~/components/TableDarts";
import TableDartsAdmin from "~/components/TableDartsAdmin";

import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Head>
        <title>Brogden And Bohdan Darts Stats</title>
        <meta name="description" content="Created by @faclusife" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mx-auto w-full max-w-2xl px-0 pt-6 sm:px-4 lg:px-8">
          <h1 className="text-center text-4xl font-bold">D202 Darts Stats</h1>
        </div>
        <AuthShowcase />
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const darts = api.example.getDartsStats.useQuery();

  useEffect(() => {
    if (
      sessionData?.user &&
      sessionData?.user.name !== "faclusife2" &&
      sessionData?.user.name !== "faclusife"
    ) {
      void signOut();
      toast.error("I asked you not to do that");
    }
    console.log("sessionData", sessionData);
  }, [sessionData]);

  if (darts.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <LoadingText textStyle="text-xl font-bold tracking-tight text-black pt-6" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {(sessionData && (
        <TableDartsAdmin darts={darts.data} isLoading={darts.isLoading} />
      )) ?? <TableDarts darts={darts.data} isLoading={darts.isLoading} />}

      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Bohdan Sign in"}
      </button>
      <div className="text-sm">
        *Please do not try to log in with your account*
      </div>
    </div>
  );
}
