import React from 'react';
import { Container, Stack, Typography, Box, Link } from '@mui/material';
import Image from 'next/image';

const Features = () => {
  return (
    <Container sx={{ marginY: '3rem' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack alignItems="center">
          <Typography variant="h3" fontWeight="700">
            HOT & SPICY
          </Typography>
          <Typography variant="h1" sx={{ fontSize: '10rem' }} fontWeight="700">
            PIZZA
          </Typography>
          <Link
            underline="none"
            padding="1.1rem 2rem"
            bgcolor="#a80707"
            borderRadius="6px"
            sx={{
              '&:hover': {
                backgroundColor: '#a80700',
              },
              transition: 'all ease 300ms',
            }}
            color="white"
            href="#"
            fontSize="25px"
            fontWeight="bold"
            mt={1}
          >
            Order Now
          </Link>
        </Stack>
        <Box>
          <Image src="/images/pizza.png" width="600" height="500" alt="pizza" />
        </Box>
      </Stack>
    </Container>
  );
};

export default Features;
