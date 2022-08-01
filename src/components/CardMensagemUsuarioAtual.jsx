import {Box, Stack, Typography} from "@mui/material";
import {Image, Text} from "@skynexui/components";
import appConfig from "../../config.json";

export default function CardMensagemUsuarioAtual({mensagem}) {
  return (
    <Stack direction="row">
      <Text
        key={mensagem.id}
        tag="li"
        styleSheet={{
          borderRadius: "5px",
          padding: "6px",
          marginBottom: "12px",
          borderTopRightRadius: '0px !important',
          width: "fit-content",
          backgroundColor: " #313d49",
          display: "flex",
          alignItems: "end",
          flexDirection: "column",
          marginLeft: "auto",
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
            src={`https://github.com/${mensagem.de}.png`}
          />
          <Box>
            <Text tag="strong">{mensagem.de}</Text>
            <Text
              styleSheet={{
                marginTop: "5px",
                fontSize: "10px",
                color: appConfig.theme.colors.neutrals[300],
              }}
              tag="span"
            >
              {new Date().toLocaleDateString()}
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
      <Box
        sx={{
          width: 0,
          height: 0,
          borderTop: "16px solid #313d49",
          borderRight: "20px solid transparent",
        }}
      />
    </Stack>
  );
}
