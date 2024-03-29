import { Box,TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { CryptoState } from "../../stateManeger/CryptoContext";
import ActionButton from "./ActionButton";

const Login = ({handleClose}) => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setAlert } = CryptoState();
    
    const handleSubmit = async () => {
      if (!email || !password) {
        setAlert({
          open: true,
          message: "Please fill all the fields",
          type: "error",
        });
        return;
      }

      try {
        const result = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setAlert({
          open: true,
          message: `Login Successful. Welcome ${result.user.email}`,
          type: "success",
        });

        handleClose();
      } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      }
    };

  return (
    <Box p={3} sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
     
      <ActionButton onClick={handleSubmit}>Login</ActionButton>
    </Box>
  );
};

export default Login;


