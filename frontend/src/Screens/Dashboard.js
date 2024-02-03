import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import SearchBar from "./Components/SearchBar";
import WalletList from "./Components/WalletList";
import TransactionList from "./Components/TransactionList";


function Dashboard() {
  const location = useLocation();
  const username = new URLSearchParams(location.search).get("name");

  return (
    <Box className="dashboard-container">
        <SearchBar />
        <Box className="dashboard-data">
            <WalletList />
            <TransactionList />
        </Box>
    </Box>
      
  );
}

export default Dashboard;

