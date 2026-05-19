"use client"
// import { api } from "~/trpc/server";
import { trpc } from "~/trpc/client";


export default function Home() {
  // const { status } = await api.health.getHealth.query();

  // const { message } = await api.test.getTest.query({ email: "bhargavpathak91021@gmail.com" });

  const { data } = trpc.test.getTest.useQuery({ email: "bhargavpathak91021@gmail.com" })

  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl">Streamyst - Stream in Style</h1>
        {/* <h2>Server Status: {status}</h2> */}
        <h2>Server Message: {data?.message}</h2>
      </div>
    </main>
  );
}
