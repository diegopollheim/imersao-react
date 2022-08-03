import {LoadingButton} from "@mui/lab";
import {Button, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../src/services/api";

export default function Page() {
  const [load, setLoad] = useState(false);
  const {register, handleSubmit} = useForm();

  const registrar = (data) => {
    setLoad(true);
    api
      .post("/api/auth/register", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        console.log(response);
        setLoad(false);
        toast.success("Registro concluido com sucesso!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      })
      .catch((error) => {
        toast.error("Ops algo deu errado!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        console.log(error);
        setLoad(false);
      });
  };

  return (
    <>
      <Stack sx={{minHeight: "100vh", backgroundColor: "backgroundColor"}}>
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
          <TextField {...register("email")} label="Email" placeholder="Seu melhor email" required />
          <TextField
            {...register("password")}
            label="Senha"
            placeholder="Mínimo 6 dígitos"
            required
          />
          <Stack spacing={2}>
            <LoadingButton loading={load} variant="contained" type="submit" color="success">
              Registrar
            </LoadingButton>
            <Button variant="contained">Cancelar</Button>
          </Stack>
        </Stack>
        <ToastContainer />
      </Stack>
    </>
  );
}
