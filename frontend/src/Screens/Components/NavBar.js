import React from "react";
import { Link } from "react-router-dom";
import { Box, AppBar, Toolbar } from "@mui/material";
import Icon from "@mdi/react";
import { mdiWalletBifold } from "@mdi/js";

function NavBar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#10111c",
      }}
      className="navbar"
    >
      <Toolbar>
        <Box className="navbar-icon">
          <Link className="navbar-link" to="/">
            <Icon path={mdiWalletBifold} size={1.5} color="#3694ff" />
          </Link>
        </Box>
        <Box className="navbar-title">
          <Link className="navbar-link" to="/">
            CoinTracker
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
