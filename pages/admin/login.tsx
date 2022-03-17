import React, { useState, MouseEvent } from 'react';
import Head from 'next/head';
import {
  Box,
  Stack,
  FormControl,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Button,
  LinearProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import adminActions from '../../src/redux/actions/admin';
import { useRouter } from 'next/router';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { _login } = adminActions;
  const { push } = useRouter();

  const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) =>
    e.preventDefault();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const callback = () => {
    push('/admin');
  };

  const handleClick = async () => {
    setIsLoading(true);
    await _login(data, callback, setIsLoading, setError);
  };

  return (
    <>
      <Head>
        <title>Food App | Admin Login</title>
      </Head>
      {isLoading && (
        <Box sx={{ width: '100%', position: 'fixed' }}>
          <LinearProgress />
        </Box>
      )}
      <Box component="main">
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={5}
          sx={{
            marginY: '4rem',
            marginX: 'auto',
            padding: '2rem 3rem',
            boxShadow: 10,
            width: 'fit-content',
            borderRadius: '5px',
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Admin Login
          </Typography>
          <Stack spacing={3}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                name="username"
                type="text    "
                label="Username"
                variant="filled"
                placeholder="Enter Username"
                onChange={handleChange}
                error={error}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={handleMouseDownPassword}
                        size="small"
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="filled"
                placeholder="*********"
                onChange={handleChange}
                error={error}
              />
            </FormControl>
            <Button variant="contained" onClick={handleClick}>
              Login
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Login;
