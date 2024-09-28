"use client";

import { useState } from "react";
import { MotionButton } from "../ui/Button";
import { useContent } from "../lib/content-context";
import { useRouter } from "next/navigation";

export default function AddNotePage() {
  const router = useRouter();
  const { user } = useContent();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/anotacoes/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, title, desc }),
      });
      if (response.ok) {
        console.log("Anotação registrada com sucesso!");
        router.push("/notes");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-10 h-screen w-full justify-center items-center text-black">
      <input
        className="h-[4%] w-[40%] rounded-lg px-5"
        placeholder="Título"
        type="input"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <textarea
        className="h-[30%] w-[40%] rounded-lg px-5 flex text-start text-wrap truncate py-5"
        placeholder="Descrição"
        onChange={(e) => setDesc(e.target.value)}
      ></textarea>
      <MotionButton
        label={isLoading ? "Registrando..." : "Adicionar Nota"}
        type="button"
        func={handleRegister}
        className="bg-cyan-900 w-[40%] h-[4%] rounded-lg text-white"
      ></MotionButton>
    </div>
  );
}
