import { ItemList } from "./ItemList";

interface CategoriesListProps {
  list: string[];
}

export function CategoriesList({ list }: CategoriesListProps) {

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
              <td className="px-4 py-8 text-zinc-600">
                Nenhum produto encontrado
              </td>
            </tr>
          </tbody>
        }
        <tbody className="w-full">
          {list.map((item: any, index: any) => {
            return (
              <ItemList key={index} item={item} />
            )
          })}
        </tbody>
      </table>
    </div >
  )
}