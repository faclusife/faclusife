import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import toast from "react-hot-toast";
import LoadingDarkText from "~/components/LoadingDark";
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
      <main className=" flex min-h-screen flex-col items-center  ">
        <h1 className="fond-bold mt-6 text-4xl ">D202 Darts Stats</h1>
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
    return <LoadingDarkText />;
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
