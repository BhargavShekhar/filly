"use client"

import { useEffect } from "react";
import { useUser } from "~/hooks/api/auth";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user && user.id) {
      router.replace("/dashboard")
    }
    else router.replace("/login")
  }, [user])

  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl">Welcome to Filly</h1>
      </div>
    </main>
  );
}
