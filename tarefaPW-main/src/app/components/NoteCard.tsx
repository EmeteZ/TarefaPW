"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";

export const NoteCard = ({ id, titulo, descricao, getNotes }: NoteProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/anotacoes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        console.log("Anotação deletada com sucesso!");
        getNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className="w-64 h-48"
    >
      <div className="flex h-full w-full p-5 rounded-xl text-white gap-5 border border-white flex-col overflow-hidden cursor-pointer hover:border-cyan-700">
        <div className="w-full flex justify-between">
          <p className="font-bold text-lg">{titulo}</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7"
            onClick={() => handleDelete()}
          >
            <FaTrash className="h-full w-full " />
          </motion.button>
        </div>

        <p>{descricao}</p>
      </div>
    </motion.button>
  );
};
