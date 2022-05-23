import { ResetTvRounded } from '@mui/icons-material';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { auth, db } from '../firebase';


const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

    const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState([]);

  const [user, setUser] = useState(null);

  const [watchList, setWatchList] = useState([]);


  const [alert, setAlert] = useState({open:false,type:"error",message:""});
  

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);

      var unsubscribe = onSnapshot(coinRef, coin => {
        if (coin.exists()) {
          setWatchList(coin.data().coins);
        } else {
          console.log("No items in watchLst")
        }
      });
       return () => {
         unsubscribe();
       };
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) setUser(user);
      else setUser(null)
    })
  },[])

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        coins,
        loading,
        fetchCoins,
        alert,
        setAlert,
        user,
        watchList,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext

export const CryptoState = () => {
  return useContext(Crypto);
};

