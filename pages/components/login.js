import { auth } from "../../firebase_init";
import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {
  Card,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
  Box,
} from "@mui/material";

export default function Login() {
  const [expandForm, setExpandForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+20");
  const [otp, setOTP] = useState("");

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };

  const requestOTP = (phoneNumber) => {
    if (phoneNumber.length > 10) {
      setExpandForm(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          console.log("Code Sent");
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          console.log(error);
        });
    }
  };

  const verifyOTP = (otp) => {
    if (otp.length == 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log(error);
        });
    }
  };
  return (
    <Card
      sx={{
        width: "40%",
        maxHeight: "50%",
        display: "flex",
        flexDirection: "column",
        marginTop: "10%",
        alignItems: "center",
        padding: "20px",
        justifyContent: "space-around",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "#5D3FD3",
          fontWeight: "bold",
        }}
      >
        Login
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: "#5D3FD3",
          width: "100%",
        }}
      >
        Enter your phone number to receive a verification OTP.
      </Typography>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel htmlFor="phone-number">Phone Number</InputLabel>
        <Input
          id="phone-number"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
      </FormControl>
      {!expandForm ? (
        <Button
          variant="contained"
          sx={{ backgroundColor: "#5D3FD3" }}
          onClick={(e) => {
            e.preventDefault();
            requestOTP(phoneNumber);
          }}
        >
          Send OTP
        </Button>
      ) : null}
      {expandForm ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: "#5D3FD3",
              width: "100%",
            }}
          >
            Enter the OTP sent to your phone number.
          </Typography>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor="otp">Verification Code</InputLabel>
            <Input
              id="otp"
              aria-describedby="my-helper-text"
              value={otp}
              onChange={(e) => {
                setOTP(e.target.value);
              }}
            />
          </FormControl>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#5D3FD3" }}
            onClick={() => verifyOTP(otp)}
          >
            Submit
          </Button>
        </Box>
      ) : null}
      <div id="recaptcha-container"></div>
    </Card>
  );
}
