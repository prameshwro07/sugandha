import { CheckoutClient } from "./CheckoutClient";
import { Suspense } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
// import { AnnouncementBar } "@/components/announcementBar";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <SiteHeader />
      <CheckoutClient />
    </Suspense>
  );
}
