import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import { ModalDelete } from "./ModalDelete";
import { useState } from "react";

interface ItemListProps {
  item: string;
}

export function ItemList({ item }: ItemListProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <tr className=" hover:bg-zinc-50 transition-colors border-b-2 border-zinc-100">
        <td className="p-5 font-medium text-start flex gap-8 items-center">
          {item[0].toUpperCase() + item.substring(1)}
        </td>
        <td className="p-5 gap-4 text-orange-400 cursor-pointer text-2xl">
          <button className="transition-all mr-4 hover:text-secondary">
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
        isOpen={openModal}
        setIsOpen={setOpenModal}
        name={item}
      />
    </>
  )
}