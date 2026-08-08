import { redirect } from "next/navigation";
import { getOwnerSession } from "@/lib/auth";
import { DashboardClient } from "./DashboardClient";

export default async function OwnerDashboardPage() {
  const session = await getOwnerSession();
  if (!session) {
    redirect("/owner/login");
  }

  return <DashboardClient />;
}
