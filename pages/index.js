import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase_init";
import Mainpage from "../components/main";
import Login from "../components/login";
import { Box } from "@mui/material";
import Head from "next/head";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundImage: "linear-gradient(to bottom right, #5D3FD3, #C3B1E1)",
      }}
    >
      <Head>
        <title>Firebase Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user ? <Mainpage /> : <Login />}
    </Box>
  );
}
