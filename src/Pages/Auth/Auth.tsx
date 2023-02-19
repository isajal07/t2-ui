
import * as React from 'react';
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Auth() {
  const [password, setPassword] = React.useState<String>("");
  const [errorMsg, setErrorMsg] = React.useState<String>("");
  const navigate = useNavigate();
  const onSignIn = async () => {
    if(!password) return setErrorMsg("Enter password!")
    await axios.post(`${process.env.REACT_APP_API_URL}api/signinAdmin`, {password: password})
      .then((response) => {
        if(response.data != null){
          navigate('/game');
          localStorage.setItem('token', response.data.fullName);
        } else {
          setErrorMsg("Invalid password!");
        }
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
           <Typography component="h1" variant="h5">
            Welcome to T2 Admin Dashboard
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onSignIn}
            >
              Sign In
            </Button>
          </Box>
          <Typography color={"red"}>{errorMsg}</Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}