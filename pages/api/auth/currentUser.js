// Desenvolver essa api para retornar o usuário atual logado

import db from "../../../src/lib/supaBaseConfig";

export default async function Register(req, res) {
  const user = await db.auth.user();

  console.log("Usuário atual", user);

  res.json({user: user});
}
