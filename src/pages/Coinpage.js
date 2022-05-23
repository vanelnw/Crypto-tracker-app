import { Box, Grid, LinearProgress, styled, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';

import { CryptoState } from '../stateManeger/CryptoContext';
import CoinInfo from '../components/CoinInfo';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { async } from '@firebase/util';
import { AirlineSeatLegroomReducedTwoTone } from '@mui/icons-material';


const MarketData = styled('div')(({ theme }) => ({
    alignSelf: "start",
    padding:"5px",
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
        alignItems: "start",
    },
}));

const styles = {
  sideBar: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
        alignItems: "center",
    justifyContent:"center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },

  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 2,
    paddingBottom:3,
    paddingTop: 0,
    textAlign: "justify",
  },

  heading: {
    fontWeight: "bold",
    marginBottom:3,
    fontFamily: "Montserrat",
  },

};

const Coinpage = () => {
    const { id } = useParams();

    const { currency, symbol, user, watchList,setAlert} = CryptoState();
    
    const [coin, setCoin] = useState();

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data)
    }

    useEffect(() => {
      fetchCoin();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

     function numberWithCommas(x) {
       return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     }
  
  const inWatchList = watchList.includes(coin?.id);
  
  const addToWatchList = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinRef,
        {
          coins: watchList ? [...watchList, coin?.id] : [coin?.id]
        }
      );
      setAlert({
        open: true,
        message: `${coin.name} Added to the watchlist !`,
        type: "success"
      })
    } catch (error) {
      setAlert({
        open: true,
        messagee: error,
        type: "error",
      });
    }
  };

   const removeFronWatchlist = async () => {
     const coinRef = doc(db, "watchlist", user.uid);
     try {
       await setDoc(coinRef, {
         coins: watchList.filter((watch) => watch !== coin?.id),
       },
         { merge: "true" }
       );

       setAlert({
         open: true,
         message: `${coin.name} remove from the watchlist !`,
         type: "success",
       });
     } catch (error) {
       setAlert({
         open: true,
         messagee: error.message,
         type: "error",
       });
     }
   };

  
    
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12} md={4}>
        <Box sx={styles.sydeBar}>
          <Box display="flex" justifyContent="center">
            <img
              src={coin?.image.large}
              alt={coin?.name}
              height="200"
              style={{ marginBottom: 20, alignSelf: "center" }}
            />
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              marginBottom: 3,
              fontFamily: "Montserrat",
              alignSelf: "center",
            }}
          >
            {coin?.name}
          </Typography>
          <Typography variant="subtitle1" sx={styles.description}>
            {coin?.description.en.split(". ")[0]}.
          </Typography>
          <MarketData>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" sx={styles.heading}>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {numberWithCommas(coin?.market_cap_rank)}
              </Typography>
            </span>

            <span style={{ display: "flex" }}>
              <Typography variant="h5" sx={styles.heading}>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" sx={styles.heading}>
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
              </Typography>
            </span>
            {user && (
              <Box
                sx={{
                  display: "flex",
                  textAlign: "center",
                  padding: 5,
                  backgroundColor: inWatchList ? "#ff0000" : "#EEBC1D",
                }}
                onClick={inWatchList ? removeFronWatchlist : addToWatchList}
              >
                {inWatchList ? "Remove from watchlist" : "Add to watchList"}
              </Box>
            )}
          </MarketData>
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <CoinInfo coin={coin} />
      </Grid>
    </Grid>
  );
}

export default Coinpage