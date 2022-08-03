import db from "../../src/lib/supaBaseConfig";

export default async function Mensagens(req, res) {
  const method = req.method.toUpperCase();

  switch (method) {
    case "GET":
      db.from("mensagens")
        .select("*")
        .order("id", { ascending: false })
        .then(({ data }) => {
          res.json(data);
        });
      break;
    case "POST":
      db.from("mensagens")
        .insert([
          // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
         req.body.novaMensagem,
        ])
        .then(({ data }) => {
          res.json(data);
        });
      break;
  }
}
