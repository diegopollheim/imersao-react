import {Box} from "@mui/system";
import {useState} from "react";
import UploaderAvatar from "../src/components/uploaderAvatar";
import theme from "../src/style/theme.json";

export default function Teste() {
  const [key, setKey] = useState();

  console.log("key na pagina", key);
  return (
    <Box sx={{backgroundColor: theme.colors.neutrals[700]}}>
      <UploaderAvatar setKey={setKey} />
    </Box>
  );
}
