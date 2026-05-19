"use client"

import { useForm } from "react-hook-form"
import { SignupForm } from "~/components/signup-form"
import { trpc } from "~/trpc/client"

type SignupFormValue = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function Page() {
  const { mutateAsync: createUserWithEmailAndPassword } = trpc.auth.createUserWithEmailAndPassword.useMutation();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async ({ email, name, password }: SignupFormValue) => {
    const { id } = await createUserWithEmailAndPassword({
      email,
      fullName: name,
      password
    })

    console.log(`user created with id:${id}`);
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm form={form} onSubmit={onSubmit} />
      </div>
    </div>
  )
}
