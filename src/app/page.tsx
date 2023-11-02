'use client'

import { useRouter } from "next/navigation";
import Link from "next/link";

import Image from "next/image";
import logo from "../../public/logo.png";
import bianca from "../../public/bianca.svg";

import { Input } from "./components/Input";
import { Button } from "./components/Button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { IoLockClosedOutline, IoMailOutline } from "react-icons/io5";

const createLoginFormSchema = z.object({
  email: z.string().nonempty("E-mail obrigatório"),
  password: z.string().nonempty("Senha obrigatória"),
})

export type CreateLoginFormData = z.infer<typeof createLoginFormSchema>

export default function Home() {
  const {
    register,
    handleSubmit,
    formState,
    reset
  } = useForm<CreateLoginFormData>({
    resolver: zodResolver(createLoginFormSchema),
  });

  const { errors } = formState;

  const router = useRouter();

  function handleSignIn(data: CreateLoginFormData) {
    console.log(data);
    router.push("/private/dashboard/");
    reset();
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] gap-12">
      <Image src={logo} alt="logo" className="w-16" />

      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex flex-col gap-2"
      >
        <Input
          name="email"
          type="email"
          placeholder="E-mail"
          register={register}
          errors={errors}
          icon={<IoMailOutline />}
        />

        <Input
          name="password"
          placeholder="Senha"
          inputIsPassword={true}
          startWithHiddenPassword={true}
          register={register}
          errors={errors}
          icon={<IoLockClosedOutline />}
        />

        <Button
          type="submit"
          children="Entrar"
          variantBg="orange"
        />
      </form>

      <span className="text-zinc-200">_______________________</span>


      <Link
        href="https://biancahoffer.vercel.app/"
        target="_blank"
        className="flex gap-2 justify-center items-center"
      >
        By •
        <Image
          src={bianca}
          alt="bianca macedo hoffer madruga"
          className="w-6"
        />
      </Link>
    </div>
  )
}
