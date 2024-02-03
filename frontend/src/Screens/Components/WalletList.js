import React from "react";
import { v4 } from "uuid";
import { Box, Card, CardContent, Typography, Divider } from "@mui/material";

export default function WalletList({ wallets, onclick }) {
  
  return (
    <Box className="wallet-list-container">
      <Typography gutterBottom variant="h5" component="div">
        Wallet List
      </Typography>
      {
        wallets.length 
        ? wallets.map((wallet) => <Wallet key={v4()} data={wallet} onclick={onclick}/>)
        : ""
      }
    </Box>
  );
}

function Wallet({ data, onclick }) {
  let len = data.length;
  let shortenedData = data.substring(0, 10) + "...." + data.substring(len - 6);
  return (
    <Card 
      className="wallet"
      onClick={() => onclick(data)}
      >
      <CardContent>
        <Typography variant="h6" component="div">
          {shortenedData}
        </Typography>
        <Typography variant="body2">Wallet Content</Typography>
        <Divider />
      </CardContent>
    </Card>
  );
}
