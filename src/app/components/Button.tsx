import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode;
  variantBg: "orange" | "gray" | "red" | null;
  type: "button" | "submit";
}

export function Button({
  children,
  variantBg,
  type,
  ...props
}: ButtonProps) {

  return (
    <button
      type={type}
      className={`text-white transition-colors sm:w-full hover:bg-orange-300 rounded-lg py-[9.5px] px-8 shadow-md
      ${variantBg === "orange"
          ? "bg-secondary"
          : variantBg === "gray"
            ? "bg-zinc-400"
            : variantBg === "red"
              ? "bg-error"
              : null
        } 
      ${variantBg === "orange"
          ? "hover:bg-primary"
          : variantBg === "gray"
            ? "hover:bg-zinc-300"
            : variantBg === "red"
              ? "hover:bg-red-400"
              : null
        } 
      `}
      {...props}
    >
      {children}
    </button>
  )
}