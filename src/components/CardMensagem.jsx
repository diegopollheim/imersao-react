import {Box, Skeleton, Stack, Typography} from "@mui/material";
import {Image, Text} from "@skynexui/components";
import {useEffect, useState} from "react";
import appConfig from "../../config.json";
import db from "../lib/supaBaseConfig";
import SkeletonCardMessage from "./SkeletonCardMessage";

export default function CardMensagem({mensagem}) {
  const [userMessage, setUserMessage] = useState();

  useEffect(() => {
    db.from("users")
      .select("*")
      .eq("id", mensagem._user)
      .then((response) => {
        setUserMessage(response.data[0]);
      });
  }, []);

if (!userMessage) {return <SkeletonCardMessage />}

  return (
    <Stack direction="row">
      <Box
        sx={{
          width: 0,
          height: 0,
          borderTop: "16px solid #313d49",
          borderLeft: "20px solid transparent",
        }}
      />
      <Text
        tag="li"
        styleSheet={{
          borderRadius: "5px",
          borderTopLeftRadius: "0px !important",
          padding: "6px",
          marginBottom: "12px",
          width: "fit-content",
          backgroundColor: " #313d49",
          hover: {
            //backgroundColor: appConfig.theme.colors.neutrals[700],
          },
        }}
      >
        <Stack direction="row" alignItems="center" sx={{mb: 1}}>
          <Image
            styleSheet={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              display: "inline-block",
              marginRight: "8px",
            }}
            src={userMessage?.avatar}
          />

          <Box>
            <Text
              styleSheet={{
                fontSize: "14px",
                textTransform: "capitalize",
              }}
              tag="strong"
            >
              {userMessage?.nome + " " + userMessage?.sobrenome}
            </Text>
            <Text
              styleSheet={{
                marginTop: "5px",
                fontSize: "10px",
                color: appConfig.theme.colors.neutrals[300],
              }}
              tag="span"
            >
              {new Date(mensagem.created_at).toLocaleDateString()}
            </Text>
          </Box>
        </Stack>
        <Typography
          sx={{
            borderRadius: "5px",
            p: 1,
            width: "fit-content",
            maxWidth: "450px",
            wordBreak: "break-all",

            backgroundColor: appConfig.theme.colors.neutrals[500],
          }}
        >
          {mensagem.texto}
        </Typography>
      </Text>
    </Stack>
  );
}
