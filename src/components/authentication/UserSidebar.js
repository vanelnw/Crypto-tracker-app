import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { CryptoState } from "../../stateManeger/CryptoContext";
import { Avatar, styled } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { Delete } from "@mui/icons-material";
import { doc, setDoc } from "firebase/firestore";

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setAlert, watchList, coins, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    setAlert({ open: true, type: "success", message: "Logout Successfull" });
    toggleDrawer();
  };

  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const removeFronWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        {
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

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Container>
              <Profile>
                <Picture
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
              </Profile>
              <WishList>
                {coins?.map((coin) => {
                  if (watchList.includes(coin.id))
                    return (
                      <Coin>
                        <span>{coin?.name}</span>
                        <span style={{ display: "flex", gap: 8 }}>
                          {symbol}
                        </span>
                        {numberWithCommas(coin.current_price.toFixed(2))}
                        <Delete
                          style={{ cursor: "pointer" }}
                          fontSize="16"
                          onClick={() => removeFronWatchlist(coin)}
                        />
                      </Coin>
                    );
                })}
              </WishList>
            </Container>
            <div>
              <Box
                sx={{
                  bgcolor: "blue",
                  color: "white",
                  p: 2,
                  m: 1,
                  borderRadius: 2,
                }}
                onClick={logOut}
              >
                Log Out
              </Box>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

const Container = styled("div")(({ theme }) => ({
  width: 350,
  padding: 25,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  fontFamily: "monospace",
  backgroundColor: "darkgray",
}));

const Profile = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  height: "92%",
}));

const Picture = styled(Avatar)(({ theme }) => ({
  width: 200,
  height: 200,
  cursor: "pointer",
  backgroundColor: "#EEBC1D",
  objectFit: "contain",
}));

const WishList = styled("div")(({ theme }) => ({
  flex: 1,
  width: "100%",
  backgroundColor: "grey",
  borderRadius: 10,
  padding: 15,
  paddingTop: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
  overflowY: "scroll",
}));

const Coin = styled("div")(({ theme }) => ({
  padding: 10,
  borderRadius: 5,
  color: "black",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#EEBC1D",
  boxShadow: "0 0 3px black",
}));
