import { APP_ROUTES } from "@/constants/app-routes";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter();
  const { userLogged } = useAuth();

  useEffect(() => {
    if (userLogged === null) {
      router.push(APP_ROUTES.public.login);
    }
  }, [userLogged, router.push])

  return (
    <>
      {userLogged === null && null}
      {userLogged !== null && children}
    </>
  )
}