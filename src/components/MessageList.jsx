import {Box, Stack, Typography} from "@mui/material";
import {Image, Text} from "@skynexui/components";
import appConfig from "../../config.json";
import {useAuth} from "../contexts/AuthProvider";
import CardMensagem from "./CardMensagem";
import CardMensagemUsuarioAtual from "./CardMensagemUsuarioAtual";

export default function MessageList({mensagens}) {
  const {user} = useAuth();

  return (
    <Box
      tag="ul"
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {mensagens.map((mensagem) => {
        if (user.id == mensagem._user) return <CardMensagemUsuarioAtual mensagem={mensagem} />;

        return <CardMensagem mensagem={mensagem} />;
      })}
    </Box>
  );
}
