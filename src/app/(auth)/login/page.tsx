
import { LoginForm } from "@/components/login-form"
import { auth } from "@/lib/db/auth";
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation";

export default async function Login() {
  
  const session = await auth();

  if (session?.user.role === "SYS_ADMIN") {
    redirect("/admin/dashboard");
  } else if (session) {
    redirect("/institution/dashboard")
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
            <Link href={'/'}>
                <div className="relative w-28 h-8">             
                    <Image
                        src="/extended_logo.svg"
                        alt="Logo"
                        fill
                        className="object-contain"
                    />
                </div>
            </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image 
          src={'/login_image.jpg'} 
          alt="Image" 
          fill
          className="absolute inset-0 h-full w-full object-cover brightness-[0.75]"/>
      </div>
    </div>
  )
}