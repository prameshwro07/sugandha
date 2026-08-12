import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Toaster } from "sonner";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 pt-[64px]">
        {children}
      </main>

      <SiteFooter />

      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={3000}
      />
    </div>
  );
}