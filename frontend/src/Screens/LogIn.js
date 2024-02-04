import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Button, TextField } from "@mui/material";
import NavBar from "./Components/NavBar";
import { mdiSolid } from "@mdi/js";

function LogIn() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  function handleChange({ target }) {
    setName(target.value);
  }

  function handleClick() {
    navigate("/dashboard?name=" + name);
  }

  return (
    <Box className="login-container">
      <NavBar />
      <Card
        className="login-card"
        sx={{
          backgroundColor: "#10111c",
          color: "white",
        }}
      >
        <CardContent>
          <h2>Login</h2>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <TextField
              label="Name"
              value={name}
              onChange={handleChange}
              variant="outlined"
              sx={{
                "& input": {
                  border: "1px white solid",
                  backgroundColor: "#1f1f2a",
                  color: "white",
                  marginRight : '1vh',
                  "& .MuiInputBase-root-MuiInputBase-placeholder": {
                    color: 'white',
                  },
                },
              }}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              sx={{
                "& input": {
                  border: "1px white solid",
                  backgroundColor: "#1f1f2a",
                  color: "white",
                  "& .MuiInputBase-root-MuiInputBase-placeholder": {
                    color: 'white',
                  },
                },
              }}
              required
            />
          </Box>
          <Box mt={3}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={() => handleClick()}
            >
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LogIn;
