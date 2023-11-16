import { ClipLoader } from "react-spinners";

interface LoadingProps {
  sizee?: "sm" | "base" | "large";
}

export function Loading({ sizee = "sm" }: LoadingProps) {
  return (
    <ClipLoader
      color="#fff"
      size={
        sizee == "sm" ? 18 :
          sizee == "large" ? 52 :
            sizee === "base" ? 32 : 32
      }
    />
  )
}