import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/db/auth";
import { executeAction } from "@/lib/executeAction";

export async function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      action={async (formData: FormData) => {
        "use server";
        await executeAction({
          actionFn: async () => {
            await signIn("credentials", formData);
          },
        });
      }}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Entre com sua conta</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Insira seu email abaixo para entrar na sua conta
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu a senha?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Senha"
            required
          />
        </div>
        <Button type="submit" className="w-full h-9 cursor-pointer">
          Entrar
        </Button>
      </div>
      <div className="text-center text-sm">
        Não tem uma conta?{" "}
        <a href="/signup" className="underline underline-offset-4">
          Cadastre-se
        </a>
      </div>
    </form>
  );
}
