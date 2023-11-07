import Link, { LinkProps } from "next/link";

import { usePathname } from "next/navigation";

interface ActiveLinkProps extends LinkProps {
  children: React.ReactNode;
  title?: string;
}

export function ActiveLink({
  href,
  children,
  title,
  ...rest
}: ActiveLinkProps) {
  const path = usePathname();

  const isCurrentPath = path === href || path === rest.as || path?.startsWith(String(rest.as));

  return (
    <Link href={href} className={`text-lg p-4 rounded-lg flex justify-normal items-center gap-2 text-orange-100 hover:text-orange-200
      ${isCurrentPath
        ? 'text-orange-100 hover:text-orange-200 bg-secondary shadow-sm font-mono hover:transition-colors hover:bg-opacity-90 hover:text-text-tertiary'
        : 'text-text-tertiary hover:text-opacity-6'
      }`
    }
    >
      <div>
        {children}
      </div>
      {title}
    </Link>
  )
}