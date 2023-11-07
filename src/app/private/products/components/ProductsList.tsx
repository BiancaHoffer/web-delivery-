import { BiDetail } from "react-icons/bi"
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5"

import {
  DocumentData,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../../../services/firebase";

import Image from "next/image";

export interface ProductData extends DocumentData {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

interface ProductListProps {
  list: ProductData[];
}

export function ProductsList({ list }: ProductListProps) {
  async function handleDeleteProduct(id: string) {
    try {
      await deleteDoc(doc(db, "product", id));
    } catch {
      alert("Erro ao deletar produto. Entre em contato com o administrados.")
    } finally {
      window.location.reload();
    }
  }

  return (
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
        {list.length == 0 &&
          <tbody>
            <tr className=" transition-colors border-b-2 border-zinc-100">
              <td className="px-4 py-8 text-zinc-600">Nenhum produto encontrado</td>
            </tr>
          </tbody>
        }
        <tbody className="w-full">
          {list.map((item: any, index: any) => {
            return (
              <tr key={index} className="hover:bg-zinc-50 transition-colors border-b-2 border-zinc-100">

                <td className="p-5 font-medium text-[18px] w-60 text-start flex gap-8 items-center">
                  <Image src={item.image} alt="avatar" width={300} height={200} className="w-20 h-20 rounded-lg object-cover" />
                  {item.name}
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
  )
}