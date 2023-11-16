import { useState } from "react"

import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdCheckmark
} from 'react-icons/io';

interface SelectProps {
  list: string[];
  selected: string;
  setSelected: any;
}

export function InputSelect({
  list,
  selected,
  setSelected,
}: SelectProps) {
  const [isSelected, setIsSelected] = useState(false);

  function handleSelect() {
    setIsSelected(false);
  }

  return (
    <div className="w-[100%] mb-[-5px]">
      <div className="relative rounded-lg text-zinc-400 bg-white mb-1 border-[1px] border-zinc-200 transition-all hover:border-primary hover:text-primary focus-within:border-primary px-3 py-[8px] flex items-center justify-between">
        <input
          type="checkbox"
          id="checkbox-select"
          onChange={() => setIsSelected(!isSelected)}
        />
        <div className="w-[100%] text-zinc-900">
          {selected[0].toUpperCase() + selected.substring(1)}
        </div>

        <div className="text-zinc-400">
          {isSelected ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      <div className={`relative w-[100%]  transition-all duration-300
      ${isSelected ? "flex opacity-100" : "opacity-0 z-[-9]"}
      `}>
        <div className="absolute w-[100%] overflow-auto max-h-[200px] rounded-lg border-[1px] bg-white flex-col shadow-lg"
        >
          {list.map((i, index) => {
            return (
              <div key={index} className="relative flex items-center justify-between w-[100%] px-4 py-2 border-b-[0.2px] hover:text-primary hover:font-medium
            
              ">
                <input
                  type="radio"
                  name="item"
                  id="radio-select"
                  value={i}
                  onChange={(e) => setSelected(e.target.value)}
                  onClick={() => handleSelect()}
                />
                {i[0].toUpperCase() + i.substring(1)}
                <div className="text-primary">
                  {selected === i && <IoMdCheckmark />}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}