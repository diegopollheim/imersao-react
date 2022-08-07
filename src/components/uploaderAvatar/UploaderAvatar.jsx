import {Avatar, Box, Card, Stack, Typography} from "@mui/material";
import theme from "../../style/theme.json";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import db from "/src/lib/supaBaseConfig";
import ErrorIcon from "@mui/icons-material/Error";
import {v4 as uuidv4} from "uuid";
import Dropzone from "react-dropzone";
import {useState} from "react";

export default function UploaderAvatar({setKey}) {
  const [file, setFile] = useState(false);

  async function handleUploader(file) {
    let extFile = file[0].name.split(".").pop();
    let upadatedFile = {
      arquivo: file[0],
      name: uuidv4() + "." + extFile,
      preview: URL.createObjectURL(file[0]),
    };

    setFile(upadatedFile);

    const {data, error} = await db.storage
      .from("avatars")
      .upload(upadatedFile.name, upadatedFile.arquivo);

    if (error) {
      console.log(error);
    } else {
      setKey(data.Key);
    }
  }

  function showMessageUpload(isDragActive, isDragReject) {
    if (!isDragActive) {
      return (
        <>
          <CloudUploadOutlinedIcon />
          <Typography sx={{fontSize: "14px", textAlign: "center"}}>Carregar imagem</Typography>
        </>
      );
    }

    if (isDragReject) {
      return (
        <>
          <ErrorIcon color="error" />
          <Typography color="error" sx={{fontSize: "14px", textAlign: "center"}}>
            Não suportado
          </Typography>
        </>
      );
    }

    return (
      <>
        <CheckCircleIcon color="success" />
        <Typography sx={{fontSize: "14px", textAlign: "center", color: theme.colors.primary[400]}}>
          Solte o arquivo
        </Typography>
      </>
    );
  }
  console.log(file);
  if (!file) {
    return (
      <Dropzone accept="image/*" onDropAccepted={handleUploader}>
        {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
          <Avatar
            {...getRootProps()}
            sx={{
              cursor: "pointer",
              color: "#f5f5f5",
              p: 2,
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: theme.colors.neutrals[400],
              border: "1px dashed ",
              borderColor: "#fff",
            }}
          >
            <input {...getInputProps()} required/>
            <Stack justifyContent="center" alignItems="center" height="100%">
              {showMessageUpload(isDragActive, isDragReject)}
            </Stack>
          </Avatar>
        )}
      </Dropzone>
    );
  }

  return <Avatar src={file.preview} sx={{width: 120, height: 120}} />;
}
