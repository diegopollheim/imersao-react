import {Box, Skeleton, Stack} from "@mui/material";
import {Text} from "@skynexui/components";

export default function SkeletonCardMessage() {
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
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} sx={{mb: 1}}>
          <Skeleton variant="circular" width={30} height={30} />

          <Box>
            <Skeleton width={120} />

            <Skeleton width={50} height={15} />
          </Box>
        </Stack>
        <Skeleton width={160} height={70} />
      </Text>
    </Stack>
  );
}
