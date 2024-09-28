import { connectToDatabase } from "../../../lib/db";

export const POST = async (req) => {
  try {
    const data = await req.json();
    const { email, senha } = data;

    if (!email || !senha) {
      return new Response(JSON.stringify({ msg: "Request Inválido" }), {
        status: 400,
      });
    }

    const db = await connectToDatabase();

    await db.execute("INSERT INTO usuarios (email, senha) VALUES (?, ?)", [
      email,
      senha,
    ]);
    return new Response(JSON.stringify({ msg: "Usuário criado com sucesso" }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        msg: "Não foi possível criar usuário",
        error: error.message,
      }),
      {
        status: 500,
      }
    );
  }
};
