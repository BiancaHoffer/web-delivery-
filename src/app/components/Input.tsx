import { ComponentProps, useState } from "react";

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import {
  DeepMap,
  FieldErrors,
  UseFormRegister,
  FieldValues
} from "react-hook-form";

interface InputProps extends ComponentProps<'input'> {
  icon?: React.ReactNode;
  name: string;
  register: UseFormRegister<any>;
  errors: DeepMap<FieldValues, FieldErrors>;
  activeErrors?: boolean;
  inputIsPassword?: boolean;
  startWithHiddenPassword?: boolean;
}

export function Input({
  icon,
  register,
  name,
  errors,
  inputIsPassword = false,
  startWithHiddenPassword = false,
  activeErrors = true,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(startWithHiddenPassword);

  return (
    <>
      <div className="transition-colors bg-white text-zinc-400 hover:border-primary hover:text-primary focus-within:border-primary focus-within:text-primary shadow-sm border-[1px] rounded-lg flex items-center text-xl ">
        {icon &&
          <span className="pl-3 pr-2">
            {icon}
          </span>
        }
        <input
          className="text-zinc-900 pr-3 pl-2 py-2 rounded-lg w-full text-base"
          type={showPassword === true ? "password" : "text"}
          {...register(name)}
          {...props}
        />
        <span className={`${inputIsPassword ? "flex" : "hidden"}`}>
          <button
            type="button"
            className="pr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </button>
        </span>
      </div>
      <div className={`${activeErrors === true ? "flex" : "hidden"}`}>
        {errors[name]?.message &&
          <span className="text-error font-medium text-sm pl-1">
            {errors[name]?.message}
          </span>}
      </div>
    </>
  )
}