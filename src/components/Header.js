import {
  AppBar,
  Box,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../stateManeger/CryptoContext";
import AuthModal from "./authentication/AuthModal";
import UserSidebar from "./authentication/UserSidebar";


const Header = () => {

  let navigate = useNavigate();
  const { currency, setCurrency, user } = CryptoState();

  return (
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography
            onClick={() => navigate("/")}
            variant="h5"
            sx={styles.title}
          >
            crypto-tracker
          </Typography>
          <Typography variant="h5" mr="20px" onClick={() => navigate(`/news`)}>
            News
          </Typography>
          <Select
            variant="outlined"
            sx={styles.select}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
          <Box>{user ? <UserSidebar /> : <AuthModal />}</Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;


const styles = {
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointor",
  },
  select: {
    width: "100px",
    height: "40px",
    marginRight: "15px",
    color: "white",
    border: "1px solid white",
  },
};
