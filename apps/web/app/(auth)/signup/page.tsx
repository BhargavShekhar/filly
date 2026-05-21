"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { SignupForm } from "~/components/signup-form"
import { useSignup } from "~/hooks/api/auth"

type SignupFormValue = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function Page() {
  const router = useRouter();

  const { createUserWithEmailAndPasswordAsync } = useSignup();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async ({ email, name, password }: SignupFormValue) => {
    const { id } = await createUserWithEmailAndPasswordAsync({
      email,
      fullName: name,
      password
    })

    router.replace("/dashboard");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm form={form} onSubmit={onSubmit} />
      </div>
    </div>
  )
}
