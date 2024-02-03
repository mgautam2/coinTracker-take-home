import { useEffect, useState } from "react";
import { v4 } from "uuid";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Pagination,
  Typography,
} from "@mui/material";

import Api from "../../Api";

export default function TransactionList({ wallet }) {
  const [walletInfo, setWalletInfo] = useState({});

  console.log(walletInfo);

  useEffect(() => {
    if (wallet === "") {
      return;
    }

    Api.GetTransactions(wallet, 1)
      .then((data) => {
        console.log(data);
        setWalletInfo(data);
      })
      .catch((err) => console.error(err));
  }, [wallet]);

  return (
    <Box className="transaction-list-container">
      <Typography gutterBottom variant="h5" component="div">
        Transaction List
      </Typography>
      {walletInfo.n_tx
        ? walletInfo.txs.map((transaction) => (
            <Transaction key={v4()} data={transaction} />
          ))
        : ""}
      {walletInfo.n_tx ? <Pagination count={walletInfo.n_tx / 10} /> : ""}
    </Box>
  );
}

function Transaction({ data }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {data.hash}
        </Typography>
        <Typography variant="body2">
          This is some sample content for the first transaction.
        </Typography>
        <Divider />
      </CardContent>
    </Card>
  );
}
