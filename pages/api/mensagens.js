import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzY3MTc0NSwiZXhwIjoxOTU5MjQ3NzQ1fQ.CEQ0xXDtTtGzz0jYHpOWsXynC_HYJTOF3Km4WCx8EkA";
const SUPABASE_URL = "https://mmawpbwbqedqbnjcnkwj.supabase.co";
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
