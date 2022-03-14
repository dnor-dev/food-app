import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';

const Footer = () => {
  return (
    <Stack direction="row">
      <Image src="/images/Footer.jpg" alt="footer" height={300} width={500} />
      <Box
        sx={{
          background: '#222',
          paddingY: '4rem',
          paddingX: '2rem',
          width: '100%',
        }}
      >
        <Stack direction="row" justifyContent="space-between" flex={3}>
          <Typography
            variant="h4"
            fontWeight="600"
            color="#fff"
            sx={{ maxWidth: '400px' }}
          >
            WELCOME TO FOOD APP! WHERE WE SELL MOUTH WATERING PIZZAS JUST FOR
            YOU.
          </Typography>
          <Stack spacing={2}>
            <Typography variant="subtitle1" color="#a80707" fontWeight="700">
              FIND OUR RESTAURANTS
            </Typography>
            <Box>
              <Typography color="#fff">1654 R. Don Road #304</Typography>
              <Typography color="#fff">New York, 85022</Typography>
              <Typography color="#fff">(602) 867-1010</Typography>
            </Box>
            <Box>
              <Typography color="#fff">1654 R. Don Road #304</Typography>
              <Typography color="#fff">New York, 85022</Typography>
              <Typography color="#fff">(602) 867-1010</Typography>
            </Box>
            <Box>
              <Typography color="#fff">1654 R. Don Road #304</Typography>
              <Typography color="#fff">New York, 85022</Typography>
              <Typography color="#fff">(602) 867-1010</Typography>
            </Box>
          </Stack>
          <Stack spacing={2}>
            <Typography variant="subtitle1" color="#a80707" fontWeight="700">
              WORKING HOURS
            </Typography>
            <Box>
              <Typography color="#fff">MONDAY UNTIL FRIDAY</Typography>
              <Typography color="#fff">9:00 - 22:00</Typography>
            </Box>
            <Box>
              <Typography color="#fff">SATURDAY UNTIL SUNDAY</Typography>
              <Typography color="#fff">9:00 - 22:00</Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Footer;
