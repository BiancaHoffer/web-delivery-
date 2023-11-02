import { ComponentProps } from "react";

import {
  DeepMap,
  FieldErrors,
  FieldValues,
  UseFormRegister
} from "react-hook-form";

interface TextAreaProps extends ComponentProps<'textarea'> {
  name: string;
  register: UseFormRegister<any>;
  errors: DeepMap<FieldValues, FieldErrors>;
  activeErrors?: boolean;
}

export function TextArea({
  name,
  register,
  errors,
  activeErrors,
  ...props
}: TextAreaProps) {
  return (
    <>
      <textarea
        className="transition-colors border-border text-zinc-900 outline-primary hover:border-primary focus-within:border-primary p-4 w-full shadow-sm rounded-lg border-[1px]"
        {...register(name)}
        {...props}
      />

      <div className={`${activeErrors ? "flex" : "hidden"}`}>
        {errors[name]?.message
          && <span className="text-t-error font-medium text-sm pl-1">
            {errors[name]?.message}
          </span>}
      </div>
    </>
  )
}