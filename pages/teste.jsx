import {Box} from "@mui/system";
import {useState} from "react";
import UploaderAvatar from "../src/components/uploaderAvatar";
import {useAuth} from "../src/contexts/AuthProvider";
import db from "../src/lib/supaBaseConfig";
import theme from "../src/style/theme.json";

export default function Teste() {
  const [key, setKey] = useState();
  const {user} = useAuth();

  function logarUSer() {
    console.log(user);
  }
  return (
    <Box sx={{backgroundColor: theme.colors.neutrals[700]}}>
      <UploaderAvatar setKey={setKey} />

      <button onClick={logarUSer}>logar</button>
    </Box>
  );
}
