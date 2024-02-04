import React from "react";
import { Box, Card, CardContent, Typography, Divider } from "@mui/material";
import Icon from "@mdi/react";
import { mdiBitcoin } from "@mdi/js";
import { shortenAddress } from "../utils";

export default function WalletList({ currWallet, wallets, onclick }) {
  return (
    <Box className="wallet-list-container">
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{
          color: "#898a8e",
          fontSize: "20px",
          fontWeight: "800",
          textAlign: "center",
          margin: "1vh",
        }}
      >
        Wallets
      </Typography>
      {wallets.length
        ? wallets.map((wallet) => (
            <Wallet
              key={wallet}
              data={wallet}
              currWallet={currWallet}
              onclick={onclick}
            />
          ))
        : ""}
    </Box>
  );
}

function Wallet({ data, currWallet, onclick }) {
  return (
    <Card
      className="wallet"
      onClick={() => onclick(data)}
      sx={{
        backgroundColor: "#10111c",
      }}
    >
      <CardContent className="wallet-content">
        <Icon
          path={mdiBitcoin}
          title="Wallet Picture"
          size={1.5}
          color="orange"
          sx={{
            backgroundColor: "white",
          }}
        />
        <Typography
          component="div"
          sx={{
            color: `${data === currWallet ? "#3694ff" : "white"}`,
          }}
        >
          {shortenAddress(data)}
        </Typography>
        <Divider sx={{ borderColor: "white" }} />
      </CardContent>
    </Card>
  );
}
