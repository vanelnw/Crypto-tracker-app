import { Box} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { TrendingCoins } from "../config/api";
import { CryptoState } from "../stateManeger/CryptoContext";
import CarouselItem from "./CarouselItem";

const Carousel = () => {
  const { currency } = CryptoState();
  const [trendings, setTrendings] = useState([]);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrendings(data);
  };

  const items = trendings?.map((coin) => {
    return <CarouselItem coin={coin} />;
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  return (
    <Box display="flex" alignItems="center" height="50%">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </Box>
  );
};

export default Carousel;
