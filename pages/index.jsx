import {Box, Text, Image} from "@skynexui/components";
import React from "react";
import {useRouter} from "next/router";
import appConfig from "../config.json";
import {useForm} from "react-hook-form";
import {Button, Stack, TextField, Typography} from "@mui/material";

function Titulo(props) {
  const Tag = props.tag || "h1";

  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals["000"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export default function PaginaInicial() {
  const {register, handleSubmit} = useForm();
  const [username, setUsername] = React.useState("diegopollheim");
  const route = useRouter();

  function handleLogin(data) {
    console.log(data);
  }

  const TextLabel = ({children}) => {
    return (
      <Typography color="#9aa5b1" textAlign="start" fontSize="14px" mb="5px">
        {children}
      </Typography>
    );
  };

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage:
            "url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={handleSubmit(handleLogin)}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: {xs: "100%", sm: "50%"},
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text
              variant="body3"
              styleSheet={{marginBottom: "32px", color: appConfig.theme.colors.neutrals[300]}}
            >
              Bate Papo DEV
            </Text>

            <Stack spacing={2} mb={3} width="100%">
              <Box>
                <TextLabel>Email</TextLabel>
                <TextField
                  inputProps={{
                    style: {
                      padding: "10px",
                    },
                  }}
                  {...register("email")}
                  type="email"
                  placeholder="Digite seu email"
                  fullWidth
                  required
                />
              </Box>

              <Box>
                <TextLabel>Senha</TextLabel>
                <TextField
                  inputProps={{
                    style: {
                      padding: "10px",
                    },
                  }}
                  {...register("password")}
                  placeholder="digite sua senha"
                  fullWidth
                  required
                />
              </Box>
            </Stack>

            <Stack spacing={2} sx={{width: "100%"}}>
              <Button variant="contained" fullWidth type="submit" color="success">
                Entrar
              </Button>
              <Button
                variant="outlined"
                fullWidth
                color="success"
                onClick={() => {
                  route.push("/register");
                }}
              >
                Registrar
              </Button>
            </Stack>
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
