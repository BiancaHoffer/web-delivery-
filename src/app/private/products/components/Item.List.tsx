import { Dispatch, SetStateAction, useState } from "react";
import { ModalDelete } from "./ModalDelete";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import Image from "next/image";
import { DocumentData } from "firebase/firestore";

export interface ProductData extends DocumentData {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

interface ItemListProps {
  data: ProductData;
}

export function ItemList({ data }: ItemListProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <tr key={data.id} className={`hover:bg-zinc-50 transition-colors border-b-2 border-zinc-100`}>
        <td className="p-5 font-medium text-start flex gap-8 items-center">
          <Image src={data.image} alt={data.name} width={300} height={200} className="w-20 h-20 rounded-lg object-cover" />
          {data.name}
        </td>
        <td className="p-5">{data.price}</td>
        <td className="p-5">{data.category[0].toUpperCase() + data.category.substring(1)}</td>
        <td className="p-5">{data.description === "" ? "-" : data.description}</td>
        <td className="relative top-[-30px] flex p-5 gap-4 text-orange-400 cursor-pointer text-2xl">
          <button className="transition-all hover:text-secondary">
            <IoCreateOutline />
          </button>
          <button
            onClick={() => setOpenModal(true)}
            className="transition-all hover:text-secondary"
          >
            <IoTrashOutline />
          </button>
        </td>
      </tr>
      <ModalDelete
        id={data.id}
        name={data.name}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      />
    </>
  )
}