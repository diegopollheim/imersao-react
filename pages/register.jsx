import {Box, Button, Card, Container, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import appConfig from "../config.json";
import db from "../src/lib/supaBaseConfig";
import Loading from "../src/components/Loading";
import {useRouter} from "next/router";
import UploaderAvatar from "../src/components/uploaderAvatar";

export default function Page() {
  const [key, setKey] = useState();
  const [load, setLoad] = useState(false);
  const {register, handleSubmit} = useForm();
  const route = useRouter();

  const registrar = async (dataForm) => {
    setLoad(true);

    const {user, error} = await db.auth.signUp({
      email: dataForm.email,
      password: dataForm.password,
    });

    if (error) {
      setLoad(false);
      console.log("Erro ao registrar:", error);
      toast.error("Ops algo deu errado!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      setLoad(false);

      // Gera uma url public do avatar do usuário
      const {publicURL, errorPublicURL} = db.storage
        .from("avatars")
        .getPublicUrl(key.split("/")[1]);

      if (errorPublicURL) {
        console.log(errorPublicURL);
        return;
      }

      // Atualiza o usuário adicionando metadados
      const {updatedUser, error} = await db.auth.update({
        data: {
          nome: dataForm.nome,
          sobrenome: dataForm.sobrenome,
          email: dataForm.email,
          avatar: publicURL,
        },
      });

     await db.from("users").insert([
        // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
        {
          id: user.id,
          nome: dataForm.nome,
          sobrenome: dataForm.sobrenome,
          email: dataForm.email,
          avatar: publicURL,
        },
      ]);

      route.push("/chat");
    }
  };

  // Cria um preview da imagem para ser mostrada ao usuário
  const handleUploader = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let urlPreview = URL.createObjectURL(file);
      setFilePreview(urlPreview);
    }
  };

  return (
    <>
      {load && <Loading />}
      <Stack
        sx={{
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage:
            "url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Container maxWidth="md">
          <Stack justifyContent="center" alignItems="center" sx={{minHeight: "100vh"}}>
            <Card
              sx={{
                px: 4,
                py: 6,
                width: "fit-content",
                backgroundColor: appConfig.theme.colors.neutrals[700],
              }}
            >
              <Stack
                component="form"
                onSubmit={handleSubmit(registrar)}
                margin="auto"
                spacing={3}
                maxWidth={500}
              >
                <Typography variant="h5" sx={{color: "text.primary"}}>
                  Informe seus dados para fazer o registro
                </Typography>
                <Stack spacing={2} mb={3} width="100%">
                  <Stack direction="row" spacing={4} alignItems="center">
                    {/* <Box>
                      <Avatar src={filePreview} sx={{width: 120, height: 120}} />
                    </Box> */}
                    <UploaderAvatar setKey={setKey} />
                    <Stack spacing={2} width="100%">
                      {/* NOME */}
                      <Box>
                        <TextLabel>Nome</TextLabel>
                        <TextField
                          fullWidth
                          inputProps={{
                            style: {
                              padding: "10px",
                            },
                          }}
                          {...register("nome")}
                          placeholder="Seu nome"
                          required
                        />
                      </Box>
                      {/* FIM NOME */}
                      {/* SOBRENOME */}
                      <Box>
                        <TextLabel>Sobrenome</TextLabel>
                        <TextField
                          fullWidth
                          inputProps={{
                            style: {
                              padding: "10px",
                            },
                          }}
                          {...register("sobrenome")}
                          placeholder="Seu sobrenome"
                          required
                        />
                      </Box>
                      {/* FIM SOBRENOME */}
                    </Stack>
                  </Stack>
                  {/* EMAIL */}
                  <Box>
                    <TextLabel>Email</TextLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          padding: "10px",
                        },
                      }}
                      {...register("email")}
                      type="email"
                      placeholder="Seu melhor e-mail"
                      required
                    />
                  </Box>
                  {/* FIM EMAIL */}

                  {/* SENHA */}
                  <Box>
                    <TextLabel>Senha</TextLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          padding: "10px",
                        },
                      }}
                      {...register("password")}
                      placeholder="Mínimo 6 dígitos"
                      required
                    />
                  </Box>
                  {/* FIM SENHA */}
                </Stack>
                <Stack spacing={2}>
                  <Button loading={load} variant="contained" type="submit" color="success">
                    Registrar
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      route.push("/");
                    }}
                  >
                    Cancelar
                  </Button>
                </Stack>
              </Stack>
              <Stack justifyContent="center" alignItems="center"></Stack>
            </Card>
          </Stack>
        </Container>
        <ToastContainer />
      </Stack>
    </>
  );
}

const TextLabel = ({children}) => {
  return (
    <Typography color="#9aa5b1" textAlign="start" fontSize="14px" mb="5px">
      {children}
    </Typography>
  );
};
