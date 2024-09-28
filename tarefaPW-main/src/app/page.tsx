"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContent } from "./lib/content-context";
import { MotionButton } from "./ui/Button";

export default function Home() {
  const router = useRouter();
  const { setUser } = useContent();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    console.log(email, senha);
    setIsLoading(true);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Usuário logado com sucesso!", data.user);
        setUser(await data.user.id);
        router.push("/notes");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 h-screen w-full justify-center items-center text-white">
      <p className="text-3xl">Seja bem-vindo(a)</p>
      <div className="flex flex-col gap-10 h-2/4 w-full justify-center items-center text-black">
        <input
          className="h-[8%] w-[40%] rounded-full px-5"
          placeholder="email"
          type="input"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="h-[8%] w-[40%] rounded-full px-5"
          placeholder="senha"
          type="password"
          onChange={(e) => setSenha(e.target.value)}
        ></input>

        <MotionButton
          label={isLoading ? "Entrando..." : "Login"}
          className="rounded-full bg-white/60 w-[40%] h-[8%]"
          func={handleLogin}
          type="button"
        ></MotionButton>

        <Link href="/register">
          <p className="text-white cursor-pointer">
            Não possui uma conta? Clique aqui
          </p>
        </Link>
      </div>
    </div>
  );
}
