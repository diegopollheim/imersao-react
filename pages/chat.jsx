import {TextField, Button} from "@skynexui/components";
import appConfig from "../config.json";
import MessageList from "../src/components/MessageList";
import Loading from "../src/components/Loading";
import {useState} from "react";
import useSWR from "swr";
import api from "../src/services/api";
import Header from "../src/components/Header";
import {useAuth} from "../src/contexts/AuthProvider";
import SendIcon from "@mui/icons-material/Send";
import {Box, IconButton, Stack} from "@mui/material";

export default function ChatPage() {
  const {user} = useAuth();

  const [mensagem, setMensagem] = useState("");

  const {data: mensagens, mutate: mutateMensagens} = useSWR("/api/mensagens");

  function enviarNovaMensagem(e) {
    e.preventDefault();

    // Cria a mensagem para atualizar o cache
    const novaMensagem = {
      _user: user.id,
      texto: mensagem,
      created_at: new Date(),
    };
    mutateMensagens([novaMensagem, ...mensagens], false);
    setMensagem("");

    // Chama api que fará o insert no banco da novaMensagem
    api
      .post("/api/mensagens", {
        novaMensagem: novaMensagem,
      })
      .then((response) => {
        mutateMensagens();
      });
  }

  if (!mensagens) return <Loading />;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Stack
        sx={{
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "900px",
          maxHeight: ["100vh", "90vh"],
          padding: ["15px", "32px"],
        }}
      >
        <Header />
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList mensagens={mensagens} />

          <Stack
            component="form"
            direction="row"
            onSubmit={enviarNovaMensagem}
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  enviarNovaMensagem(e);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
              required
            />

            <IconButton type="submit" color="success" size="large">
              <SendIcon />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
