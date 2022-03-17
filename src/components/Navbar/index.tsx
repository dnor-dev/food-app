import React from 'react';
import { Box, Stack, Container, Typography } from '@mui/material';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NextLink from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

const Navbar = () => {
  const { quantity } = useSelector((state: RootState) => state.cart);

  return (
    <Box
      sx={{
        background: '#a80707',
        boxShadow: 5,
        position: 'sticky',
        top: 0,
        zIndex: 999,
      }}
    >
      <Container>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          py={3}
        >
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack
              sx={{
                background: '#fff',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
              }}
              alignItems="center"
              justifyContent="center"
            >
              <PhoneEnabledIcon sx={{ color: '#a80707' }} />
            </Stack>
            <Stack>
              <Typography color="#fff" variant="caption" fontWeight="500">
                ORDER NOW!
              </Typography>
              <Typography color="#fff" variant="h6" fontWeight="600">
                012 304 555
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={5} sx={{ color: '#fff' }}>
            <NextLink href="/">Home</NextLink>
            <NextLink href="/products">Products</NextLink>
            <NextLink href="/menu">Menu</NextLink>
            <NextLink href="#">
              <Typography>Food App</Typography>
            </NextLink>
            <NextLink href="/events">Events</NextLink>
            <NextLink href="/blog">Blog</NextLink>
            <NextLink href="/contact">Contact</NextLink>
          </Stack>

          <NextLink href="/cart" passHref>
            <Stack>
              <Box sx={{ position: 'relative', cursor: 'pointer' }}>
                <ShoppingCartOutlinedIcon
                  fontSize="large"
                  sx={{ color: '#fff' }}
                />
                <Stack
                  alignItems="center"
                  sx={{
                    background: '#fff',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '-10px',
                    right: '-7px',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight="800"
                    sx={{ color: '#a80707' }}
                  >
                    {quantity}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </NextLink>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
