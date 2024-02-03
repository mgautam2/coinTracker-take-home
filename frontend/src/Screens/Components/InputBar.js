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
      <TextField
        className="search-text-field"
        label="Wallet Address"
        value={address}
        onChange={handleChange}
      />
      <Button
        color="primary"
        variant="outlined"
        size="large"
        onClick={() => handleClick()}
      >
        Add Wallet
      </Button>
    </Box>
  );
};

export default InputBar;
