'use client'

import { TitlePage } from "@/app/components/TitlePage"
import { IoPersonOutline, IoSearchOutline } from "react-icons/io5"

import avatar from "../../../../public/avatar.png";
import Image from "next/image";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Section } from "@/app/components/Section";

const listProducts = [
  {
    id: 1,
    client: "Bianca M. Hoffer",
    phone: "(99) 99999-9999",
    email: "email@email.com",
    address: [
      { id: 1, address: "sfsjfndsjfs", deliveryAddress: true },
      { id: 2, address: "sfsjfndsjfs1111", deliveryAddress: false },
      { id: 2, address: "sfsjfndsjfsadasdas", deliveryAddress: false }
    ]
  },
  { id: 2, client: "Alice P. Machado", phone: "(99) 99999-9999", email: "email@email.com", address: [] },
  { id: 3, client: "Ana Costa", phone: "(99) 99999-9999", email: "email@email.com", address: [] },
  { id: 4, client: "Henrique A.", phone: "(99) 99999-9999", email: "email@email.com", address: [] },
  { id: 5, client: "Paulo Cesar", phone: "(99) 99999-9999", email: "email@email.com", address: [] },
]

const createSearchFormSchema = z.object({
  client: z.string(),
})

export type CreateUSeachFormData = z.infer<typeof createSearchFormSchema>

export default function Clients() {
  const {
    register,
    handleSubmit,
    formState,
    reset,
  } = useForm<CreateUSeachFormData>({
    resolver: zodResolver(createSearchFormSchema),
    defaultValues: {
      client: "",
    }
  });

  const { errors } = formState;

  function handleSearchOrder(data: CreateUSeachFormData) {
    console.log(data);
    reset();
  }

  return (
    <>
      <TitlePage
        title="Clientes"
        children={<IoPersonOutline />}
      />

      <Section>
        <form
          onSubmit={handleSubmit(handleSearchOrder)}
          className="flex w-full items-end gap-4"
        >
          <div className="w-full text-zinc-900 font-medium text-sm  flex flex-col">
            <span className="mb-2">Pesquisar</span>

            <Input
              icon={<IoSearchOutline />}
              name="client"
              register={register}
              errors={errors}
              activeErrors={false}
              placeholder="Pesquisar..."
            />
          </div>

          <Button type="submit" children="Pesquisar" variantBg="orange" />
        </form>
      </Section>

      <div className="rounded-md border-2 border-b-0 overflow-auto">
        <table className="w-full rounded-2xl ">
          <thead className="bg-zinc-50 text-zinc-500">
            <tr className="text-xs">
              <th className="p-5 rounded-t-2xl">Cliente</th>
              <th className="p-5">Telefone</th>
              <th className="p-5">E-mail</th>
              <th className="p-5">Endereço de entrega atual</th>
            </tr>
          </thead>

          <tbody className="w-full">
            {listProducts.map((item, index) => {
              return (
                <tr key={index} className="hover:bg-zinc-50 transition-colors  border-b-2 border-zinc-100">
                  <td className="p-5 font-medium w-60 text-start flex gap-2 items-center">
                    <Image src={avatar} alt="avatar" className="w-9 h-9" />
                    {item.client}
                  </td>
                  <td className="p-5">{item.phone}</td>
                  <td className="p-5">{item.email}</td>
                  <td className="p-5">
                    <div>
                      {item.address.length === 0 && <div>Nenhum endereço registrado</div>}
                    </div>
                    {item.address?.map((address, index) => {
                      return (
                        <div key={index}>
                          {address.deliveryAddress === true ? <div>{address.address}</div> : <></>}
                        </div>
                      )
                    })}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div >
    </>
  )
}