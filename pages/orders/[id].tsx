import React, { useState } from 'react';
import {
  Stack,
  Box,
  Typography,
  Container,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Button,
} from '@mui/material';
import Head from 'next/head';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { styled } from '@mui/material/styles';
import FoodApi from '../../src/utils/api/food.api';
import type { paramsProps } from '../products/[id]';

type orderParams = {
  order: {
    customer: string;
    address: string;
    total: number;
    method: number;
    _id: string;
  };
};

const Order = ({ order }: orderParams) => {
  const [status, setStatus] = useState({
    paid: true,
    preparing: false,
    onTheWay: false,
    delivered: false,
  });
  const BlinkingBox = styled(Box)(() => ({
    animation: 'inProgress .6s infinite ease-in-out alternate',
    '@keyframes inProgress': {
      from: {
        opacity: 1,
      },
      to: {
        opacity: 0,
      },
    },
  }));
  return (
    <>
      <Head>
        <title>Food App | Order</title>
      </Head>
      <Container sx={{ marginY: '3rem' }}>
        <Stack direction="row" justifyContent="space-between">
          <TableContainer sx={{ maxWidth: 850 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="700">Order ID</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="700">Customer</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="700">Address</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="700">Total</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>
                    <Typography fontWeight="600">${order.total}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Stack direction="row" mt={4} justifyContent="space-around">
              <Stack alignItems="center">
                <PointOfSaleIcon />
                <Typography>Payment</Typography>
                <CheckCircleIcon sx={{ color: 'teal' }} />
              </Stack>
              {status.preparing ? (
                <Stack alignItems="center">
                  <ModelTrainingIcon />
                  <Typography>Preparing</Typography>
                  {status.preparing && (
                    <CheckCircleIcon sx={{ color: 'teal' }} />
                  )}
                </Stack>
              ) : (
                <BlinkingBox>
                  <Stack alignItems="center">
                    <ModelTrainingIcon />
                    <Typography>Preparing</Typography>
                    {status.preparing && (
                      <CheckCircleIcon sx={{ color: 'teal' }} />
                    )}
                  </Stack>
                </BlinkingBox>
              )}
              <Stack alignItems="center">
                <DirectionsBikeIcon />
                <Typography>On the way</Typography>
                {status.onTheWay && <CheckCircleIcon sx={{ color: 'teal' }} />}
              </Stack>
              <Stack alignItems="center">
                <LocalShippingIcon />
                <Typography>Delivered</Typography>
                {status.delivered && <CheckCircleIcon sx={{ color: 'teal' }} />}
              </Stack>
            </Stack>
          </TableContainer>
          <Box
            sx={{
              backgroundColor: '#222',
              width: '250px',
              height: 'fit-content',
              padding: '2rem',
              color: '#fff',
            }}
          >
            <Typography fontWeight="800">CART TOTAL</Typography>
            <Box my={2}>
              <Stack direction="row" spacing={1}>
                <Typography variant="subtitle2" fontWeight="600">
                  Subtotal:
                </Typography>
                <Typography variant="subtitle2">${order.total}</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography variant="subtitle2" fontWeight="600">
                  Discount:
                </Typography>
                <Typography variant="subtitle2">$0.00</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography variant="subtitle2" fontWeight="600">
                  Total:
                </Typography>
                <Typography variant="subtitle2">${order.total}</Typography>
              </Stack>
            </Box>
            <Button variant="contained" size="small">
              paid
            </Button>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Order;

export const getServerSideProps = async ({ params }: paramsProps) => {
  try {
    const res = await FoodApi.getOrder(params.id);
    const order = res.data;

    if (!order) {
      return {
        props: {
          notFound: true,
        },
      };
    }

    return {
      props: {
        order,
      },
    };
  } catch (error) {}
};
