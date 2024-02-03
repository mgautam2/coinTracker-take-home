import React from "react";
import { Box, Card, CardContent, Typography, Divider } from "@mui/material";

export default function WalletList() {
  return (
    <Box className='wallet-list-container'>
        <Typography gutterBottom variant="h5" component="div">
        Wallet List
        </Typography>
        <Wallet />
        <Wallet />
    </Box>
  );
}

function Wallet() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          Wallet 1
        </Typography>
        <Typography variant="body2">
          Wallet Content
        </Typography>
        <Divider />
      </CardContent>
    </Card>
  );
}
