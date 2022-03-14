import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import Navbar from '../Navbar';
import Footer from '../Footer';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Box component="main">
      <Navbar />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
