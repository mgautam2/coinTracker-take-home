import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Snackbar } from "@mui/material";

import InputBar from "./Components/InputBar";
import WalletList from "./Components/WalletList";
import TransactionList from "./Components/TransactionList";
import Api from "../Api";

function Dashboard() {
  const location = useLocation();
  const username = new URLSearchParams(location.search).get("name");

  const [walletList, setWalletList] = useState([]);
  const [currWallet, setCurrWallet] = useState("");
  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const [snackbarMsg, setSnackBarMsg] = useState("");

  function selectWallet(newWallet) {
    if (currWallet === newWallet) return;

    setCurrWallet(newWallet);
  }

  function addWallet(walletAddress) {
    Api.AddWallet(username, walletAddress)
      .then((data) => {
        if (!data.error) {
          console.log(data);
          getWallet();
        } else {
          setSnackBarMsg(data.message);
          setSnackBarOpen(true);
        }
      })
      .catch((err) => console.error(err));
  }

  function getWallet() {
    Api.GetWallets(username)
      .then((data) => {
        setWalletList(data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <Box className="dashboard-container">
      <InputBar addWallet={addWallet} />
      <Box className="dashboard-data">
        <WalletList wallets={walletList} onclick={selectWallet} />
        <TransactionList wallet={currWallet} />
      </Box>
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackBarOpen(false)}
        autoHideDuration={3000}
        message={snackbarMsg}
      />
    </Box>
  );
}

export default Dashboard;
