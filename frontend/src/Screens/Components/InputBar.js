import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const InputBar = ({ addWallet }) => {
  const [address, setAddress] = useState("");

  function handleChange({ target }) {
    setAddress(target.value);
  }

  function handleClick() {
    addWallet(address);
    setAddress("");
  }

  return (
    <Box className="search-container">
      <Box className="search-header">
        <Box>Wallets</Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => handleClick()}
        >
          Add Wallet
        </Button>
      </Box>
      <TextField
        className="search-text-field"
        placeholder="Type to find a wallet"
        value={address}
        sx={{
          backgroundColor: "#10111c",
          '& input': {
            color: 'white',
          },
          "&:hover": {
            outline: "1.5px solid #3694ff",
            borderRadius: '3px'
          },
        }}
        onChange={handleChange}
      />
    </Box>
  );
};

export default InputBar;
