import { redirect } from "next/navigation";
import { getOwnerSession } from "@/lib/auth";
import { LoginClient } from "./LoginClient";

export default async function OwnerLoginPage() {
  const session = await getOwnerSession();
  if (session) {
    redirect("/owner/dashboard");
  }

  return <LoginClient />;
}
