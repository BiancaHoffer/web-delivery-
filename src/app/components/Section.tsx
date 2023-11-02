import { ReactNode } from "react";

interface PropsSection {
  children: ReactNode;
}

export function Section({ children }: PropsSection) {
  return (
    <div className=" bg-zinc-50 border-zinc-100 sm:flex-col-reverse justify-between items-center flex gap-4  rounded-md w-full p-6 my-8 border-solid border-2">
      {children}
    </div>
  )
}