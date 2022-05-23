import { Link } from "react-router-dom";
import React from "react";
import { CryptoState } from "../stateManeger/CryptoContext";

const CarouselItem = ({ coin }) => {
  const { symbol } = CryptoState();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  let profit = coin?.price_change_percentage_24h >= 0;

  return (
    <Link to={`/coins/${coin.id}`} sx={styles.container}>
      <img
        src={coin?.image}
        alt={coin.name}
        height="80"
        style={{ marginBottom: 10 }}
      />
      <span>
        {coin?.symbol}
        &nbsp;
        <span
          style={{
            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
            fontWeight: 500,
          }}
        >
          {profit && "+"}
          {coin?.price_change_percentage_24h?.toFixed(2)}%
        </span>
      </span>
      <span style={{ fontSize: 22, fontWeight: 500, overflow: "hidden" }}>
        {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
      </span>
    </Link>
  );
};

export default CarouselItem;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
};
