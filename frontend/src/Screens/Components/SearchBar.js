import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const SearchBar = ({ search }) => {
  const [address, setAddress] = useState("");

  function handleChange({ target }) {
    setAddress(target.value);
  }

  function handleClick() {}

  return (
    <Box className='search-container'>
      <TextField
        className="search-text-field"
        label="Wallet Address"
        placeholder="Search transactions"
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

export default SearchBar;
