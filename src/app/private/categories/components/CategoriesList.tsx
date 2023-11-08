import { IoCreateOutline, IoTrashOutline } from "react-icons/io5"

import {
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../../../services/firebase";

interface CategoriesListProps {
  list: string[];
}

export function CategoriesList({ list }: CategoriesListProps) {
  async function handleDeleteCategory(id: string) {
    try {
      await deleteDoc(doc(db, "category", id));
    } catch {
      alert("Erro ao deletar categoria. Entre em contato com o administrador.")
    } finally {
      window.location.reload();
    }
  }

  return (
    <div className="rounded-md border-2 border-b-0 border-zinc-100 overflow-auto">
      <table className="w-full  rounded-2xl ">
        <thead className="bg-zinc-50 text-zinc-500">
          <tr className="text-xs">
            <th className="p-5">Categoria</th>
            <th className="p-5 rounded-t-2xl">Edição</th>
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
              <tr key={index} className=" hover:bg-zinc-50 transition-colors border-b-2 border-zinc-100">
                <td className="p-5 font-medium text-start flex gap-8 items-center">
                  {item[0].toUpperCase() + item.substring(1)}
                </td>
                <td className="p-5 gap-4 text-orange-400 cursor-pointer text-2xl">
                  <button className="transition-all mr-4 hover:text-secondary">
                    <IoCreateOutline />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(item)}
                    className="transition-all hover:text-secondary"
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
  )
}