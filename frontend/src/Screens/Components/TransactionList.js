import { useEffect, useState } from "react";
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
import {
  mdiArrowUpBold,
  mdiArrowDownBold,
  mdiBitcoin,
  mdiContentCopy,
} from "@mdi/js";
import { satoshiToBTC, getFormattedDateTime, shortenAddress } from "../utils";
import Api from "../../Api";
import constants from "../../constants";

export default function TransactionList({ wallet, snackBar }) {
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
      {walletInfo.n_tx ? (
        <WalletStats walletInfo={walletInfo} snackBar={snackBar} />
      ) : (
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
          Select a Wallet
        </Typography>
      )}

      {walletInfo.n_tx
        ? walletInfo.txs.map((tn) => {
            return <Transaction key={tn.hash} data={tn} />;
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

function WalletStats({ walletInfo, snackBar }) {
  const { address, final_balance } = walletInfo;

  function handleClick(walletAddress) {
    navigator.clipboard.writeText(walletAddress).then(() => {
      snackBar("Address copied to clipboard");
    });
  };

  return (
    <div className="wallet-stat">
      <div className="wallet-address-stat">
        <div> {`Bitcoin Wallet ${shortenAddress(address)}`}</div>
        <div className="wallet-address-copy" onClick={() => handleClick(address)}>
          {" "}
          <Icon path={mdiContentCopy} size={0.75} />
        </div>
      </div>
      <div className="wallet-balance">
        {" "}
        {`${satoshiToBTC(final_balance)} BTC`}{" "}
      </div>
    </div>
  );
}

function Transaction({ data }) {
  const recieved = data.result > 0 ? true : false;

  return (
    <Card>
      <CardContent className="transaction">
        <Divider />
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
