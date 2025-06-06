import { redirect } from "next/navigation";
import { auth } from "@/lib/db/auth";
import Sidebar from "@/components/sidebar";

export default async function AddressesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role === "SYS_ADMIN" || session.user.role === "STANDARD_USER") {
    redirect("/login");
  }
  if (session.user.role === "MANAGER_USER") {
    return (
      <div className="h-screen w-screen flex flex-row items-start justify-start">
        <div className="w-72 h-full">
          <Sidebar
            name={session.user.name}
            email={session.user.email}
            role="MANAGER"
          />
        </div>
        <div className="w-full h-full flex items-start justify-center p-8">
            {children}
        </div>
      </div>
    );
  }
}