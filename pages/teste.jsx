import {Box} from "@mui/system";
import {useState} from "react";
import UploaderAvatar from "../src/components/uploaderAvatar";
import db from "../src/lib/supaBaseConfig";
import theme from "../src/style/theme.json";

export default function Teste() {
  const [key, setKey] = useState();

  console.log("key na pagina", key);

  function handleURLPublic() {
    const {publicURL, error} = db.storage
      .from('avatars')
      .getPublicUrl(key.split('/')[1]);

    if (error) {
      console.log(error);
      return;
    }
    console.log(publicURL);
  }
  return (
    <Box sx={{backgroundColor: theme.colors.neutrals[700]}}>
      <UploaderAvatar setKey={setKey} />

      <button onClick={handleURLPublic}>get url public</button>
    </Box>
  );
}
