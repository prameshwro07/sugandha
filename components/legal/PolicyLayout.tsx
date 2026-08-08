interface PolicyLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function PolicyLayout({
  title,
  description,
  children,
}: PolicyLayoutProps) {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-8 py-20">

        {/* Hero */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {title}
          </h1>

          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              {description}
            </p>
          )}
        </div>

        {/* Content */}
        <div >
          <div className="space-y-10">
            {children}
          </div>
        </div>

      </section>
    </main>
  );
}