import {Box, Text, Button} from "@skynexui/components";
import {useRouter} from "next/router";
import db from "../lib/supaBaseConfig";

export default function Header() {
  const route = useRouter();

  async function handleLogout() {
    let {error} = await db.auth.signOut();
    route.push("/");
  }

  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button variant="tertiary" colorVariant="neutral" label="Logout" onClick={handleLogout} />
      </Box>
    </>
  );
}
