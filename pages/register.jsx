import {Button, Card, Container, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import appConfig from "../config.json";
import db from "../src/lib/supaBaseConfig";
import Loading from "../src/components/Loading";
import {useRouter} from "next/router";

export default function Page() {
  const [load, setLoad] = useState(false);
  const {register, handleSubmit} = useForm();
  const route = useRouter();

  const registrar = async (data) => {
    setLoad(true);
    const {user, error} = await db.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setLoad(false);
      toast.error("Ops algo deu errado!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      route.push("/chat");
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
            <Card sx={{px: 4, py: 6, width: "fit-content"}}>
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
                <TextField
                  {...register("email")}
                  label="Email"
                  type='email'
                  placeholder="Seu melhor email"
                  required
                />
                <TextField
                  {...register("password")}
                  label="Senha"
                  placeholder="Mínimo 6 dígitos"
                  required
                />
                <Stack spacing={2}>
                  <Button loading={load} variant="contained" type="submit" color="success">
                    Registrar
                  </Button>
                  <Button variant="contained">Cancelar</Button>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Container>
        <ToastContainer />
      </Stack>
    </>
  );
}
