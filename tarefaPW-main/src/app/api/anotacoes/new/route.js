import { connectToDatabase } from "../../../lib/db";

export const POST = async (req) => {
  try {
    const data = await req.json();
    const { user, title, desc } = data;

    if (!user || !title || !desc) {
      return new Response(JSON.stringify({ msg: "Dados incompletos" }), {
        status: 400,
      });
    }

    const db = await connectToDatabase();
    await db.execute(
      "INSERT INTO anotacoes (usuario_id, titulo, descricao) VALUES (?, ?, ?)",
      [user, title, desc]
    );

    return new Response(
      JSON.stringify({ message: "Anotação criada com sucesso" }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Erro ao criar anotação", error }),
      {
        status: 500,
      }
    );
  }
};
