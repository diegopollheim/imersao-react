import {Box} from "@mui/system";
import {useState} from "react";
import UploaderAvatar from "../src/components/uploaderAvatar";
import {useAuth} from "../src/contexts/AuthProvider";
import db from "../src/lib/supaBaseConfig";
import theme from "../src/style/theme.json";

export default function Teste() {
  const [key, setKey] = useState();
  const {user} = useAuth();

  function logarUser() {
    console.log(user);
  }
  async function selectUser() {
    const {data, error} = await db
      .from("users")
      .select("*")
      .eq("id", "86b835cd-160c-4edb-aaf6-44769ea6b575");
    console.log(data);
    if (error) {
      console.log(error);
    }
  }

  async function novoUsuario() {
    await db.from("users").insert([
      {
        id: "e554bf5e-4fd0-494f-af16-5a4b9b482b46",
        nome: "banana",
        sobrenome: "caturra",
        email: "banana@aturra.com",
        avatar: "www.avatar.com",
      },
    ]);
  }
  return (
    <Box sx={{backgroundColor: theme.colors.neutrals[700]}}>
      <UploaderAvatar setKey={setKey} />

      <button onClick={logarUser}>Current user</button>
      <button onClick={selectUser}>Other user</button>
      <button onClick={novoUsuario}>Novo Usuário</button>
    </Box>
  );
}
