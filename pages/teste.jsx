import {Stack} from "@mui/material";
import {useState} from "react";
import db from "../src/lib/supaBaseConfig";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = db.auth.user();
  // console.log(user);

  const registrar = async () => {
    let response = await db.auth.signUp({
      email: "someone@email.com",
      password: "GPobnjQhBBMYcxEEWMYN",
    });

    console.log(response);
  };
  const logar = async () => {
    let response = await db.auth.signIn({
      email: "someone@email.com",
      password: "GPobnjQhBBMYcxEEWMYN",
    });

    console.log(response);
  };

  return (
    <>
      <Stack sx={{maxWidth: "300px"}} spacing={2}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="senha"
          placeholder="senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={registrar}>
          cadastrar
        </button>
      </Stack>
      <Stack sx={{maxWidth: "300px"}} spacing={2}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="senha"
          placeholder="senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={logar}>
          logar
        </button>
      </Stack>
    </>
  );
}
