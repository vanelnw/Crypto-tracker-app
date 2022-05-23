import { Box, Container, Typography } from "@mui/material";
import React from "react";
import image from "../assets/banner2.jpg";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <Box sx={{ backgroundImage: `url(${image})` }}>
      <Container sx={styles.content}>
        <Box sx={styles.head}>
          <Typography variant="h2" sx={styles.title}>
            Crypto Tracker
          </Typography>
          <Typography variant="subtitls2" sx={styles.subtitle}>
            Get all the info regarding your fovorite crypto currency
          </Typography>
        </Box>
        <Carousel />
      </Container>
    </Box>
  );
};

export default Banner;

const styles = {
  content: {
    display: "flex",
    height: "400px",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  head: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    height: "40%",
  },
  title: {
    fontWeight: "bold",
    marginBottom: "15PX",
    fontFamily: "Montserrat",
  },
  subtitle: {
    color: "darkgray",
    textTransform: "capitalize",
    fontFamily: "Montserrat",
  },
};
