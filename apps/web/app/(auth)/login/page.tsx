"use client"

import { useForm } from "react-hook-form"
import { LoginForm } from "~/components/login-form"
import { useSignin } from "~/hooks/api/auth"
import { useRouter } from 'next/navigation'

type LoginFormValue = {
  email: string
  password: string
}

export default function Page() {
  const router = useRouter();

  const { signInUserWithEmailAndPasswordAsync } = useSignin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async ({ email, password }: LoginFormValue) => {
    const { id } = await signInUserWithEmailAndPasswordAsync({
      email,
      password
    })

    router.replace("/dashboard");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm form={form} onSubmit={onSubmit} />
      </div>
    </div>
  )
}
