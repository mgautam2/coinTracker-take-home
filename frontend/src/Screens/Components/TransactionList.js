import React from "react";
import { Box, Card, CardContent, Typography, Divider } from "@mui/material";

export default function TransactionList() {
  return (
    <Box className='transaction-list-container'>
        <Typography gutterBottom variant="h5" component="div">
          Transaction List
        </Typography>
        <Transaction />
        <Transaction />
    </Box>
  );
}

function Transaction() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          Transaction 1
        </Typography>
        <Typography variant="body2">
          This is some sample content for the first transaction.
        </Typography>
        <Divider />
      </CardContent>
    </Card>
  );
}
