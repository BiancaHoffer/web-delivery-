interface TitlePageProps {
  children?: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function TitlePage({ children, subtitle, title }: TitlePageProps) {
  return (
    <div className="flex mb-12 items-start gap-6 flex-col">
      <div className="flex gap-2">
        <div className="pt-1 text-primary text-3xl">
          {children}
        </div>

        <h1 className="text-2xl font-medium">
          {title}
        </h1>
      </div>

      {subtitle &&
        <p className="text-base text-text-secondary">
          {subtitle}
        </p>
      }
    </div >

  )
}