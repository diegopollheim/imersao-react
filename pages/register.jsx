import {Avatar, Box, Button, Card, Container, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import appConfig from "../config.json";
import db from "../src/lib/supaBaseConfig";
import Loading from "../src/components/Loading";
import {useRouter} from "next/router";
import {v4 as uuidv4} from "uuid";

export default function Page() {
  const [file, setFile] = useState(false);
  const [filePreview, setFilePreview] = useState("");
  const [load, setLoad] = useState(false);
  const {register, handleSubmit} = useForm();
  const route = useRouter();

  const registrar = async (dataForm) => {
    setLoad(true);

    let extFile = dataForm.file[0].name.split(".").pop();
    let upadatedFile = {
      arquivo: dataForm.file[0],
      name: uuidv4() + "." + extFile,
    };

    console.log(upadatedFile.arquivo);

    const {user: resUser, error: errorRegister} = await db.auth.signUp({
      email: dataForm.email,
      password: dataForm.password,
    });

    const {data: resUpload, error: errorUpload} = await db.storage
      .from("avatars")
      .upload(upadatedFile.name, upadatedFile.arquivo);

    if (errorRegister || errorUpload) {
      setLoad(false);
      console.log("Erro ao registrar:", errorRegister);
      console.log("Erro ao fazer upload:", errorUpload);
      toast.error("Ops algo deu errado!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
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
                    <Box>
                      <Avatar src={filePreview} sx={{width: 120, height: 120}} />
                    </Box>
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
                      placeholder="Seu melhor email"
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

                  <Box>
                    <TextLabel>Foto Perfil</TextLabel>
                    <input type="file" {...register("file")} onChange={handleUploader} required />
                  </Box>
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
