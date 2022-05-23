import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { CryptoState } from "../stateManeger/CryptoContext";

export default function Alert() {
  const { alert, setAlert } = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false });
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        variant="filled"
        severity={alert.type}
        sx={{ width: "100%" }}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
}
