'use client'

import { useState } from "react";

import { Button } from "@/app/components/Button";
import { InputSelect } from "@/app/components/InputSelect";
import { Section } from "@/app/components/Section";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SkeletonList } from "@/skeletons/SkeletonList";
import { SkeletonFormProduct } from "@/skeletons/SkeletonFormProduct";

const createNewProductFormSchema = z.object({
  openOrClose: z.string(),
})

export type CreateNewProductFormData = z.infer<typeof createNewProductFormSchema>

const openOrClose = ['Aberto', 'Fechado']

export default function Dashboard() {
  const [selected, setSelected] = useState("");

  const {
    handleSubmit,
    formState,
    reset,
  } = useForm<CreateNewProductFormData>({
    resolver: zodResolver(createNewProductFormSchema),
    defaultValues: {
      openOrClose: '',
    }
  });

  function handleRestauntOpenOrClosed(data: CreateNewProductFormData) {
    console.log("Enviado com sucesso");
    console.log(data);
    reset();
  }

  return (
    <>
      <main className="">
        <h1 className="text-3xl text-orange-400 leading-10 mb-4">
          Bem-vindo(a)
        </h1>
        <h1 className="text-base text-zinc-500">
          Bianca Macedo Hoffer Madruga
        </h1>
        <Section>
          <form
            onSubmit={handleSubmit(handleRestauntOpenOrClosed)}
            className="flex w-full gap-4"
          >
            <div className="w-[50%] flex items-center sm:w-full text-sm font-medium">
              No momento estamos:
            </div>
            <div className="w-[50%] sm:w-full">

            </div>
            <Button
              type="submit"
              children="Aplicar"
              variantBg="orange"
            />
          </form>
        </Section>
        <div className="w-full shadow-lg mt-8 flex gap-8 bg-primary rounded-lg px-8 py-12">
          <div className="p-8 w-full bg-white rounded-lg shadow-lg mb-[-200px]">
            Total em vendas
          </div>

          <div className="p-8 w-full bg-white rounded-lg shadow-lg mb-[-200px]">
            Total de clientes
          </div>
        </div>
        <div className="mt-[200px]">
          <h1 className="text-base text-zinc-900 font-medium">
            Pedidos de hoje
          </h1>
          ... Tabela de pedidos data atual
        </div>
        <div className="mt-8">
          <h1 className="text-base text-zinc-900 font-medium">
            Produtos cadastrados recentemente
          </h1>
          ... Lista de produtos cadastrados recentemente
        </div>
      </main>
    </>
  )
}