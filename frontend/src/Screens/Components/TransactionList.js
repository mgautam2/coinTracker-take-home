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
import Icon from "@mdi/react";
import { mdiArrowUpBold, mdiArrowDownBold, mdiBitcoin } from "@mdi/js";

import Api from "../../Api";
import constants from "../../constants";

export default function TransactionList({ wallet }) {
  const [walletInfo, setWalletInfo] = useState({});
  const [page, setPage] = useState(1);

  const handlePageChange = (event, page) => {
    GetTransactions(wallet, page);
  };

  function GetTransactions(walletAddress, page = 1) {
    Api.GetTransactions(walletAddress, page)
      .then((data) => {
        console.log(data);
        setPage(page);
        setWalletInfo(data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    if (wallet === "") {
      return;
    }

    GetTransactions(wallet);
  }, [wallet]);

  return (
    <Box className="transaction-list-container">
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
        Transaction List
      </Typography>
      {walletInfo.n_tx
        ? walletInfo.txs.map((tn) => {
            return (
              <Transaction
                key={v4()}
                data={tn}
                walletAddress={walletInfo.address}
              />
            );
          })
        : ""}
      {walletInfo.n_tx ? (
        <Pagination
          count={Math.floor(walletInfo.n_tx / constants.PAGE_LIMIT)}
          page={page}
          size="large"
          onChange={handlePageChange}
          sx={{
            backgroundColor: "#898a8e",
            borderRadius: "10px",
            margin: "auto",
          }}
        />
      ) : (
        ""
      )}
    </Box>
  );
}

function Transaction({ data, walletAddress }) {
  function satoshiToBTC(satoshis) {
    return satoshis / 1000000000;
  }

  function getFormattedDateTime(ts) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const formattedDateTime = new Date(ts * 1000).toLocaleDateString(
      "en-US",
      options
    );

    return formattedDateTime;
  }

  const recieved = data.result > 0 ? true : false;

  return (
    <Card>
      <CardContent className="transaction">
        <div className="txs-content">
          <div className="txs-icon">
            {recieved ? (
              <Icon path={mdiArrowUpBold} size={1.4} color="green" />
            ) : (
              <Icon path={mdiArrowDownBold} size={1.4} color="red" />
            )}
          </div>
          <div className="txs-data">
            <div className="txs-status">
              {" "}
              {recieved ? " Recieved" : " Sent"}
            </div>
            <div className="txs-time"> {getFormattedDateTime(data.time)}</div>
          </div>
        </div>
        <div className="txs-amount">
          {
            <>
              <Icon path={mdiBitcoin} size={0.8} color="orange" /> 
              {satoshiToBTC(data.result)} BTC
            </>
          }
        </div>
        <Divider />
      </CardContent>
    </Card>
  );
}
