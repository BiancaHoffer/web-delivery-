import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode;
  variantBg: "orange" | "gray" | "red" | null;
}

export function Button({
  children,
  variantBg,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`text-white min-w-[140px] transition-colors sm:w-full rounded-lg py-[9.5px] px-8 shadow-md hover:bg-orange-300 disabled:opacity-40 disabled:cursor-not-allowed
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