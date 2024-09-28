import { connectToDatabase } from "../../../lib/db";

export const POST = async (req) => {
  try {
    const data = await req.json();
    const { email, senha } = data;

    if (!email || !senha) {
      return new Response(JSON.stringify({ msg: "Dados incompletos" }), {
        status: 400,
      });
    }

    const db = await connectToDatabase();

    const [user] = await db.execute(
      "SELECT id FROM usuarios WHERE email = ? AND senha = ?",
      [email, senha]
    );

    if (user.length === 0) {
      return new Response(JSON.stringify({ msg: "Credenciais inválidas" }), {
        status: 401,
      });
    }
    return new Response(
      JSON.stringify({ msg: "Login bem-sucedido", user: user[0] }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ msg: "Erro ao fazer login", error }), {
      status: 500,
    });
  }
};
