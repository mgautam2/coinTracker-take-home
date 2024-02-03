import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Button, TextField } from "@mui/material";

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
      <Card>
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
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              required
            />
          </Box>
          <Box mt={3}>
            <Button
              color="primary"
              variant="outlined"
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
