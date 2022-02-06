import { auth } from "../../firebase_init";
import { signOut } from "firebase/auth";
import { Box, Typography, Button } from "@mui/material";

export default function Mainpage() {
  const logout = () => {
    signOut(auth);
  };

  return (
    <Box
      sx={{
        marginTop: "10%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ color: "#ffffff" }}>
        Welcome {auth.currentUser.phoneNumber}
      </Typography>
      <Button
        variant="outlined"
        sx={{
          backgroundColor: "#ffffff",
          color: "#000000",
          width: "50%",
          marginTop: "10px",
        }}
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
    </Box>
  );
}
