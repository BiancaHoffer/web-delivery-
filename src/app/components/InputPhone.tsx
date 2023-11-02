import { useState } from "react"

import { IoIosArrowDown, IoIosArrowUp, IoMdCheckmark } from 'react-icons/io';
import { Input } from "./Input";

interface SelectProps {
  list?: string[];
  selected?: string;
  setSelected?: any;
}

const flags = [
  "Brasil (+55)", "Portugal (+351)"
]

export function InputPhone({
  list,
  //selected,
  //setSelected,
}: SelectProps) {
  const [isSelected, setIsSelected] = useState(false);

  const [selected, setSelected] = useState("Brasil (+55)")

  function handleSelect() {
    setIsSelected(false);
  }

  return (
    <div className="flex gap-1 items-center border-zinc-200 border-[1px] bg-white text-zinc-400 rounded-lg transition-all hover:border-primary">
      <div className="w-[150px] bg-zinc-100 shadow-inner px-3 py-[8px] rounded-l-lg">
        <div className="relative mb-1 flex items-center justify-between">
          <label htmlFor="checkbox-select"></label>
          <input
            type="checkbox"
            id="checkbox-select"
            onChange={() => setIsSelected(!isSelected)}
          />
          <div className="w-[100%] text-zinc-400 text-sm">
            {selected}
          </div>

          <div className="text-zinc-400 mr-0">
            {isSelected ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </div>

        <div className={`relative w-[100%] p-20" 
      ${isSelected ? "flex" : "hidden"}
      `}>
          <div className={`absolute z-20 overflow-y-auto overflow-x-hidden max-h-[200px] rounded-lg border-[1px] bg-zinc-50 flex-col shadow-lg `}
          >
            <div className="">
              <input
                type="text"
                placeholder="Procurar país"
                className="rounded-t-lg shadow-sm px-4 py-2 focus:shadow-sm hover:border-b-primary focus:border-b-primary"
              />
            </div>

            {flags?.map((i, index) => {
              return (
                <div key={index} className="relative flex items-center justify-between w-[100%] px-4 py-2 border-b-[0.2px] hover:text-primary hover:font-medium">
                  <input
                    type="radio"
                    name="item"
                    id="radio-select"
                    value={i}
                    onChange={(e) => setSelected(e.target.value)}
                    onClick={() => handleSelect()}
                  />
                  {i}

                  <div className="text-primary">
                    {selected === i && <IoMdCheckmark />}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="w-[90%]">
        <input placeholder="000 000 000" className="w-[100%] text-zinc-900 bg-white px-3 py-[8px] rounded-lg" />
      </div>
    </div>
  )
}