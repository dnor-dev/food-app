import React, { useState } from 'react';
import {
  Container,
  Box,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
  Button,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import Image from 'next/image';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../src/redux/reducers';
import { actionTypes } from '../../src/redux/actions/types';
import { useRouter } from 'next/router';
import OrderDetails from '../../src/components/OrderDetails';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { PayPalScriptOptions } from '@paypal/paypal-js/types/script-options';
import {
  PayPalButtonsComponentOptions,
  OnApproveData,
} from '@paypal/paypal-js/types/components/buttons';
import FoodApi from '../../src/utils/api/food.api';

const paypalScriptOptions: PayPalScriptOptions = {
  'client-id':
    'AePhjjBxJB1xZFaXM0E926d9f73jvJg5OTDmxNkvueKNVWKEMyZf-KaqY6YhasmI8U7YirdeQ_6-AUJz',
  currency: 'USD',
  'disable-funding': 'card',
};

export type shippingDetails = {
  customer: string;
  address: string;
  total: number;
  method: number;
};

const Cart = () => {
  const { products, total } = useSelector((state: RootState) => state.cart);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { push } = useRouter();
  const dispatch = useDispatch();

  const handleDialog = () => {
    openDialog ? setOpenDialog(false) : setOpenDialog(true);
  };

  const orderCreate = async (data: shippingDetails) => {
    setIsLoading(true);
    try {
      const res = await FoodApi.createOrder(data);
      res.status === 200 && push(`/orders/${res.data._id}`);
      dispatch({
        type: actionTypes.RESET,
      });
      handleDialog();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(`Catching the error from ${error}`);
    }
  };

  function PaypalButton() {
    const [{ isPending }] = usePayPalScriptReducer();
    const paypalbuttonTransactionProps: PayPalButtonsComponentOptions = {
      style: { layout: 'vertical' },
      createOrder(data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: total.toString(),
              },
            },
          ],
        });
      },
      async onApprove(data: OnApproveData, actions: any) {
        return await actions.order
          .capture()
          .then((details: any) => {
            const { shipping } = details.purchase_units[0];
            let shippingData = {
              customer: shipping.name.full_name,
              address: shipping.address.address_line_1,
              total: total,
              method: 1,
            };
            total !== 0
              ? orderCreate(shippingData)
              : alert('You didn&apos;t order anything');
          })
          .catch((err: any) => console.log(`See error here oo ${err}`));
      },
    };
    return (
      <>
        {isPending ? (
          <Stack alignItems="center">
            <CircularProgress size={15} />
          </Stack>
        ) : null}
        <PayPalButtons {...paypalbuttonTransactionProps} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Food App | Cart</title>
      </Head>
      {isLoading && (
        <Box sx={{ width: '100%', position: 'fixed' }}>
          <LinearProgress />
        </Box>
      )}
      <Container sx={{ marginY: '3rem' }}>
        <OrderDetails
          openDialog={openDialog}
          handleDialog={handleDialog}
          orderCreate={orderCreate}
          total={total}
        />
        <Stack direction="row" justifyContent="space-between">
          <TableContainer sx={{ maxWidth: 800 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow hover>
                  <TableCell>Product</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Extras</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.length !== 0 ? (
                  products.map((product) => (
                    <TableRow hover key={product.pizza._id}>
                      <TableCell>
                        <Image
                          src={product.pizza.img}
                          width={50}
                          height={50}
                          alt="Product"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography color="#a80707" fontWeight="500">
                          {product.pizza.title.toUpperCase()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {product.extras.length !== 0 &&
                          product.extras.map((extra: any) => `${extra.text}, `)}
                      </TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        <Typography fontWeight="600">
                          $ {product.quantity * product.price}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center">
                      You haven&apos;t ordered anything yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              backgroundColor: '#222',
              width: '300px',
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
                <Typography variant="subtitle2">${total}</Typography>
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
                <Typography variant="subtitle2">${total}</Typography>
              </Stack>
            </Box>
            {open ? (
              <>
                <Button
                  variant="contained"
                  sx={{ width: '100%', marginBottom: '10px' }}
                  onClick={handleDialog}
                >
                  cash on delivery
                </Button>
                <PayPalScriptProvider options={paypalScriptOptions}>
                  <PaypalButton />
                </PayPalScriptProvider>
              </>
            ) : (
              <Button
                variant="contained"
                sx={{ width: '100%' }}
                onClick={() => setOpen(true)}
              >
                checkout now!
              </Button>
            )}
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Cart;
