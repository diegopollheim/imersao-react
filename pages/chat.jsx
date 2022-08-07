import {Box, TextField, Button} from "@skynexui/components";
import appConfig from "../config.json";
import MessageList from "../src/components/MessageList";
import Loading from "../src/components/Loading";
import {useState} from "react";
import useSWR from "swr";
import api from "../src/services/api";
import Header from "../src/components/Header";
import { useAuth } from "../src/contexts/AuthProvider";

export default function ChatPage() {
  const {user} = useAuth();

  const [mensagem, setMensagem] = useState("");

  const {data: mensagens, mutate: mutateMensagens} = useSWR("/api/mensagens");

  function enviarNovaMensagem(e) {
    e.preventDefault();

    // Cria a mensagem para atualizar o cache
    const novaMensagem = {
      _user: user.id,
      de: 'teste',
      texto: mensagem,
      created_at: new Date(),
    };
    mutateMensagens([novaMensagem, ...mensagens]);
    setMensagem("");

    // Chama api que fará o insert no banco da novaMensagem
    api.post("/api/mensagens", {
      novaMensagem: novaMensagem,
    });
  }

  if (!mensagens) return <Loading />;

  return (
    <Box
      styleSheet={{
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
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "700px",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
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

          <Box
            as="form"
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
            />
            <Button type="submit" iconName="arrowRight" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
