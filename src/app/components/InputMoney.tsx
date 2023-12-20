import { maskCurrency } from "@/functions/Masks";
import { ComponentProps } from "react";

import {
  DeepMap,
  FieldErrors,
  UseFormRegister,
  FieldValues,
  ControllerProps,
  Control,
  Controller
} from "react-hook-form";

interface InputProps extends ComponentProps<'input'> {
  prefix?: string;
  name: string;
  register: UseFormRegister<any>;
  errors: DeepMap<FieldValues, FieldErrors>;
  activeErrors?: boolean;
}

export function InputMoney({
  prefix,
  register,
  name,
  errors,
  activeErrors = true,
  ...props
}: InputProps) {

  return (
    <>
      <div className="transition-colors border-[1px] bg-white text-zinc-400 hover:border-primary hover:text-primary focus-within:border-primary focus-within:text-primary shadow-sm rounded-lg flex items-center text-xl">
        <span className="pl-3 pr-2 text-base font-medium">
          {prefix}
        </span>

        <input
          className="text-zinc-900 pr-3 pl-2 py-2 rounded-lg w-full text-base"
          {...register(name)}
          {...props}
        />
      </div>
      <div className={`${activeErrors === true ? "flex" : "hidden"}`}>
        {errors[name]?.message
          && <span className="text-error font-medium text-sm pl-1">
            {errors[name]?.message}
          </span>
        }
      </div>
    </>
  )
}