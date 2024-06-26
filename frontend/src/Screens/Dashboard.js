import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Snackbar } from "@mui/material";

import NavBar from "./Components/NavBar";
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

  function removeWallet(event, walletAddress) {
    event.preventDefault();
    event.stopPropagation();
    if(currWallet === walletAddress)
      setCurrWallet("");
    remove(walletAddress);
    
  }

  function remove(address) {
    Api.RemoveWallet(username, address)
      .then((data) => {
        if (!data.error) {
          console.log(data);
          getWallet();
        } else {
          createSnackBar(data.message);
        }
      })
      .catch((err) => console.log(err));
  }

  function createSnackBar(message) {
    setSnackBarMsg(message);
    setSnackBarOpen(true);
  }

  function addWallet(address) {
    Api.AddWallet(username, address)
      .then((data) => {
        if (!data.error) {
          console.log(data);
          getWallet();
        } else {
          createSnackBar(data.message);
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
      <NavBar />
      <InputBar addWallet={addWallet} />
      <Box className="dashboard-data">
        <WalletList
          currWallet={currWallet}
          wallets={walletList}
          selectWallet={selectWallet}
          removeWallet={removeWallet}
        />
        <TransactionList wallet={currWallet} snackBar={createSnackBar} />
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
