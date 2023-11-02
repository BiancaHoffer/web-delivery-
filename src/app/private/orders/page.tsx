'use client'

import { useState } from "react";

import {
  IoSearchOutline,
  IoCheckmarkSharp,
  IoClose,
  IoCreateOutline,
  IoEllipsisHorizontalSharp,
  IoTrashOutline
} from "react-icons/io5";

import { LuChefHat } from "react-icons/lu";
import { PiMotorcycle } from "react-icons/pi";
import { BiDetail } from "react-icons/bi";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import avatar from "../../../../public/avatar.png";
import Image from "next/image";

import { Input } from "@/app/components/Input";
import { TitlePage } from "@/app/components/TitlePage";
import { EditOrder } from "@/app/components/modals/EditOrder";
import { DeleteOrder } from "@/app/components/modals/DeleteOrder";
import { DetailsOrder } from "@/app/components/modals/DetailsOrder";
import { Button } from "@/app/components/Button";
import { Section } from "@/app/components/Section";
import { InputSelect } from "@/app/components/InputSelect";

const createSearchFormSchema = z.object({
  search: z.string(),
  status: z.string(),
})

export type CreateUSeachFormData = z.infer<typeof createSearchFormSchema>

const status = ['Completo', 'Cancelado', 'Cancelado', 'Processando', 'Na cozinha', 'Na estrada']

const listProducts = [
  {
    id: 1,
    date: "01/10/2023",
    hours: "19:21",
    status: "Completo",
    client: "Bianca M. Hoffer",
    phone: "(99) 99999-9999",
    address: "123 Main St 123 Main St",
    order: [
      {
        1: {
          nameFood: "Pizza GG",
          addonIngredients: "Borda de Chocolate Branco",
        },
        2: {
          namefood: "Coca-cola",
          quantity: "1"
        }
      }
    ]
  },
  { id: 2, date: "30/09/2023", hours: "19:21", status: "Cancelado", client: "Alice P. Machado", phone: "(99) 99999-9999", address: "123 Main St", order: [] },
  { id: 3, date: "30/09/2023", hours: "19:21", status: "Processando", client: "Ana Costa", phone: "(99) 99999-9999", address: "123 Main St", order: [] },
  { id: 4, date: "30/09/2023", hours: "19:21", status: "Na cozinha", client: "Henrique A.", phone: "(99) 99999-9999", address: "123 Main St", order: [] },
  { id: 5, date: "08/10/2023", hours: "19:21", status: "Na estrada", client: "Paulo Cesar", phone: "(99) 99999-9999", address: "123 Main St", order: [] },
]

export default function Orders() {
  const [itemEditOrder, setItemEditOrder] = useState({});

  const [openModalEditOrder, setOpenModalEditOrder] = useState(false);
  const [openModalDeleteOrder, setOpenModalDeleteOrder] = useState(false);
  const [openModalDetailsOrder, setOpenModalDetailsOrder] = useState(false);

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
      status: "",
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
        title="Pedidos"
        children={<IoCreateOutline />}
      />

      <Section>
        <form
          onSubmit={handleSubmit(handleSearchOrder)}
          className="flex w-full gap-4 items-end"
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
              list={status}
              selected={selected}
              setSelected={setSelected}
            />
          </div>

          <Button type="submit" children="Pesquisar" variantBg="orange" />
        </form>
      </Section>

      <div className="rounded-md border-2 border-b-0 border-zinc-100 overflow-auto">
        <table className="w-full rounded-2xl ">
          <thead className="bg-zinc-50 text-zinc-500">
            <tr className="text-xs">
              <th className="p-5 rounded-t-2xl">Cliente</th>
              <th className="p-5">Data</th>
              <th className="p-5">Hora</th>
              <th className="p-5">Status</th>
              <th className="p-5">Telefone</th>
              <th className="p-5">Endereço</th>
              <th className="p-5 rounded-t-2xl">Editar/ Detalhes</th>
            </tr>
          </thead>

          <tbody className="w-full">
            {listProducts.map((item, index) => {
              return (
                <tr key={index} className="hover:bg-zinc-50 transition-colors border-b-2 border-zinc-100">
                  <td className="p-5 font-medium w-60 text-start flex gap-2 items-center">
                    <Image src={avatar} alt="avatar" className="w-9 h-9" />
                    {item.client}
                  </td>
                  <td className="p-5">{item.date}</td>
                  <td className="p-5">{item.hours}</td>
                  <td className="p-5 w-5">
                    <div className={` w-fit rounded-full flex gap-1 items-center font-medium px-3 py-1 text-sm
                      ${item.status === "Completo" && 'bg-green-100 text-green-700'}
                      ${item.status === "Cancelado" && 'bg-red-100 text-red-700'}
                      ${item.status === "Processando" && 'bg-blue-100 text-blue-700'}
                      ${item.status === "Na cozinha" && 'bg-yellow-100 text-yellow-700'}
                      ${item.status === "Na estrada" && 'bg-neutral-200 text-neutral-700'}
                    `}>
                      <div className={`
                      ${item.status === "Completo" ? "flex" : "hidden"}
                    `}>
                        <IoCheckmarkSharp />
                      </div>
                      <div className={`
                      ${item.status === "Cancelado" ? "flex" : "hidden"}
                    `}>
                        <IoClose />
                      </div>
                      <div className={`
                      ${item.status === "Processando" ? "flex" : "hidden"}
                    `}>
                        <IoEllipsisHorizontalSharp />
                      </div>
                      <div className={`
                      ${item.status === "Na cozinha" ? "flex" : "hidden"}
                    `}>
                        <LuChefHat />
                      </div>
                      <div className={`
                      ${item.status === "Na estrada" ? "flex" : "hidden"}
                    `}>
                        <PiMotorcycle />
                      </div>

                      {item.status}
                    </div>
                  </td>
                  <td className="p-5">{item.phone}</td>
                  <td className="p-5">{item.address}</td>
                  <td className=" p-5 flex gap-4 text-orange-400 cursor-pointer text-2xl">
                    <button onClick={() => {
                      setOpenModalEditOrder(true);
                      setItemEditOrder(item)
                    }}
                    >
                      <IoCreateOutline />
                    </button>

                    <button onClick={() => {
                      setOpenModalDetailsOrder(true);
                      setItemEditOrder(item)
                    }}
                    >
                      <BiDetail />
                    </button>

                    <button onClick={() => {
                      setOpenModalDeleteOrder(true);
                      setItemEditOrder(item)
                    }}
                    >
                      <IoTrashOutline />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div >

      <EditOrder
        isOpen={openModalEditOrder}
        setIsOpen={setOpenModalEditOrder}
        data={listProducts}
      />

      <DeleteOrder
        isOpen={openModalDeleteOrder}
        setIsOpen={setOpenModalDeleteOrder}
        item={itemEditOrder}
      />

      <DetailsOrder
        isOpen={openModalDetailsOrder}
        setIsOpen={setOpenModalDetailsOrder}
        item={itemEditOrder}
      />
    </>
  )
}
