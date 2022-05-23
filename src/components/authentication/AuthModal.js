import {
  AppBar,
  Box,
  Button,
  Modal,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { auth } from "../../firebase";
import { CryptoState } from "../../stateManeger/CryptoContext";
import Login from "./Login";
import Signup from "./Signup";

const AuthModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState(0);

  const { setAlert } = CryptoState();

  const handleChange = (evennt, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  return (
    <>
      <Box sx={styles.login} onClick={handleOpen}>
        Login
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.content}>
          <AppBar
            position="static"
            style={{ backgroundColor: "transparent", color: "white" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              style={{ borderRadius: 10 }}
            >
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
          </AppBar>
          {value === 0 && <Login handleClose={handleClose} />}
          {value === 1 && <Signup handleClose={handleClose} />}
          <Box sx={styles.google}>
            <span>OR</span>
            <GoogleButton
              style={{ width: "100%", outline: "none" }}
              onClick={signInWithGoogle}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AuthModal;

const styles = {
  login: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "85px",
    height: "40px",
    backgroundColor: "#EEBC1D",
  },

  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "darkgray",
    border: "2px solid #000",
    boxShadow: 24,
    p: 0,
  },

  google: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 2,
    fontSize: 20,
    padding: 4,
  },
};
