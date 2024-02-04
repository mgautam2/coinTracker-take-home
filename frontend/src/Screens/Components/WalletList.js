import React from "react";
import { Box, Card, CardContent, Typography, Divider } from "@mui/material";
import Icon from "@mdi/react";
import { mdiBitcoin, mdiTrashCan } from "@mdi/js";
import { shortenAddress } from "../utils";

export default function WalletList({
  currWallet,
  wallets,
  selectWallet,
  removeWallet,
}) {
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
              selectWallet={selectWallet}
              removeWallet={removeWallet}
            />
          ))
        : ""}
    </Box>
  );
}

function Wallet({ data, currWallet, selectWallet, removeWallet }) {
  return (
    <Card
      className="wallet"
      onClick={() => selectWallet(data)}
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
        <Box className='wallet-delete'>
          <Icon
            path={mdiTrashCan}
            title="Wallet Picture"
            size={1}
            color="white"
            sx={{
              backgroundColor: "white",
            }}
            onClick={(e) => removeWallet(e, data)}
          />
        </Box>

        <Divider sx={{ borderColor: "white" }} />
      </CardContent>
    </Card>
  );
}
