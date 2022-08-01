import { Box, Stack, Typography } from "@mui/material";
import { Image, Text } from "@skynexui/components";
import appConfig from "../../config.json";

export default function MessageList(props) {
  // console.log('...')
  return (
    <Box
      tag="ul"
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
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
        );
      })}
    </Box>
  );
}
