'use client'

import { BiDetail } from "react-icons/bi";
import {
  IoCreateOutline,
  IoFastFoodOutline,
  IoSearchOutline,
  IoTrashOutline
} from "react-icons/io5";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Image from "next/image";

import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { Section } from "@/app/components/Section";
import { TitlePage } from "@/app/components/TitlePage";
import { InputSelect } from "@/app/components/InputSelect";
import { useCallback, useEffect, useState } from "react";

import { useProduct } from "@/app/context/ProductContext";

const createSearchFormSchema = z.object({
  search: z.string(),
  category: z.string(),
})

export type CreateUSeachFormData = z.infer<typeof createSearchFormSchema>

const categories = ['Pizzas', 'Bebidas', 'Porções', 'Tábuas', 'Lanches', 'Sobremesas',]

export default function Products() {
  const { products, deleteProduct } = useProduct();

  const [selected, setSelected] = useState("");

  const {
    register,
    handleSubmit,
    formState,
    reset,
    setValue
  } = useForm<CreateUSeachFormData>({
    resolver: zodResolver(createSearchFormSchema),
    defaultValues: {
      search: "",
      category: "",
    }
  });

  const { errors } = formState;

  function handleSearchOrder(data: CreateUSeachFormData) {
    reset();
  }

  function handleDeleteProduct(id: string) {
    deleteProduct(id)
  }

  return (
    <>
      <TitlePage
        title="Produtos"
        children={<IoFastFoodOutline />}
      />

      <Section>
        <form
          onSubmit={handleSubmit(handleSearchOrder)}
          className="flex gap-4 w-full items-end"
        >
          <div className="w-[50%] sm:w-full text-zinc-900 font-medium text-sm  flex flex-col">
            <span className="mb-2">Pesquisar</span>

            <Input
              icon={<IoSearchOutline />}
              name="search"
              register={register}
              errors={errors}
              activeErrors={false}
              placeholder="Pesquisar..."
            />
          </div>

          <div className="w-[50%] sm:w-full text-zinc-900 font-medium text-sm gap-2 flex flex-col">
            <span>Satus do pedido</span>

            <InputSelect
              list={categories}
              selected={selected}
              setSelected={setSelected}
            />
          </div>

          <Button type="submit" children="Pesquisar" variantBg="orange" />
        </form>
      </Section>

      <div className="rounded-md border-2 border-b-0 border-zinc-100 overflow-auto">
        <table className="w-full  rounded-2xl ">
          <thead className="bg-zinc-50 text-zinc-500">
            <tr className="text-xs">
              <th className="p-5">Produto</th>
              <th className="p-5">Preço</th>
              <th className="p-5">Categoria</th>
              <th className="p-5">Descrição</th>
              <th className="p-5 rounded-t-2xl">Editar/ Detalhes</th>
            </tr>
          </thead>

          <tbody className="w-full">
            {products.map((item, index) => {
              return (
                <tr key={index} className="hover:bg-zinc-50 transition-colors border-b-2 border-zinc-100">
                  <td className="p-5 font-medium w-60 text-start flex gap-2 items-center">
                    <Image src={item.image} alt="avatar" width={300} height={200} className="w-20 h-20 rounded-lg object-cover" />
                    {item.product}
                  </td>
                  <td className="p-5">{item.price}</td>
                  <td className="p-5">{item.category}</td>
                  <td className="p-5">{item.description === "" ? "-" : item.description}</td>
                  <td className="relative top-[-30px] flex p-5 gap-4 text-orange-400 cursor-pointer text-2xl">

                    <button className="transition-all hover:text-secondary">
                      <IoCreateOutline />
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(item.id)}
                      className="transition-all hover:text-secondary"
                    >
                      <IoTrashOutline />
                    </button>

                    <button className="transition-all hover:text-secondary">
                      <BiDetail />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div >
    </>
  )
}