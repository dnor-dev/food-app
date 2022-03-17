import React, { useState } from 'react';
import {
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
  LinearProgress,
  IconButton,
  Tooltip,
  Pagination,
} from '@mui/material';
import FoodApi from '../../src/utils/api/food.api';
import Image from 'next/image';
import Head from 'next/head';
import adminActions from '../../src/redux/actions/admin';
import AddIcon from '@mui/icons-material/Add';
import AddProducts from '../../src/components/AddProducts';
import { chunk, ceil } from 'lodash';
import DeleteOrder from '../../src/components/DeleteOrder';
import type { GetServerSideProps } from 'next';

type dataProps = {
  data: {
    _id: string;
    title: string;
    desc: string;
    img: string;
    prices: number[];
    extraOptions: {
      text: string;
      price: number;
    }[];
  }[];

  orders: {
    address: string;
    customer: string;
    method: number;
    status: string;
    total: number;
    _id: number;
  }[];
};

const Admin = ({ data, orders }: dataProps) => {
  const [products, setProducts] = useState(data);
  const [orderList, setOrderList] = useState(orders);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  let [currentStatus, setCurrentStatus] = useState(0);
  const [page, setPage] = useState(0);
  const [deleteOrder, setDeleteOrder] = useState(false);
  const [ID, setID] = useState(0);

  const [maxPage] = useState(10);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value <= maxPage) {
      setPage(value - 1);
    } else {
      setPage(0);
    }
  };

  const { _deleteProducts } = adminActions;
  const handleDelete = async (id: string) => {
    const callback = () => {
      setProducts(products.filter((prod) => prod._id !== id));
    };
    setIsLoading(true);
    await _deleteProducts(id, callback, setIsLoading);
  };

  const handleOpen = () => {
    open ? setOpen(false) : setOpen(true);
  };

  let status = ['preparing', 'onTheWay', 'delivered'];

  const handleOrder = async (id: any) => {
    setIsLoading(true);
    if (currentStatus == 2) {
      setCurrentStatus(0);
    } else {
      setCurrentStatus(currentStatus + 1);
    }

    try {
      let res = await FoodApi.updateOrderStatus(id, status[currentStatus]);
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id.toString()),
      ]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const chunkedOrders = orderList.length !== 0 ? chunk(orderList, 5) : [];

  const orderDataArray = chunkedOrders[page] || orderList;

  const deleteDialog = () => {
    deleteOrder ? setDeleteOrder(false) : setDeleteOrder(true);
  };

  return (
    <>
      <Head>
        <title>Food App | Admin</title>
      </Head>
      {isLoading && (
        <Box sx={{ width: '100%', position: 'fixed' }}>
          <LinearProgress />
        </Box>
      )}

      <AddProducts open={open} handleOpen={handleOpen} />
      <DeleteOrder
        id={ID}
        deleteOrder={deleteOrder}
        deleteDialog={deleteDialog}
        orderList={orderList}
        setOrderList={setOrderList}
        setIsLoading={setIsLoading}
      />

      <Stack
        direction="row"
        p={5}
        justifyContent="space-between"
        sx={{
          position: 'relative',
        }}
      >
        <Tooltip title="Add product">
          <IconButton
            sx={{
              backgroundColor: '#a80707',
              boxShadow: 5,
              color: '#fff',
              '&:hover': {
                backgroundColor: '#ba0d0d',
              },
              position: 'fixed',
              right: 10,
              top: 150,
              zIndex: 99,
            }}
            onClick={handleOpen}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <TableContainer sx={{ maxWidth: 600 }}>
          <Typography fontWeight="bold" variant="h4">
            Products
          </Typography>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow hover>
                <TableCell>Image</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length !== 0 ? (
                products.map((product, i) => (
                  <TableRow hover key={i}>
                    <TableCell>
                      <Image
                        src={product.img}
                        width={30}
                        height={30}
                        alt="Product"
                      />
                    </TableCell>
                    <TableCell>{product._id.slice(0, 5)}....</TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>${product.prices[0]}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center">No products created.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer sx={{ maxWidth: 650 }}>
          <Typography fontWeight="bold" variant="h4">
            Orders
          </Typography>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow hover>
                <TableCell>ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chunkedOrders[page].map((order, i) => (
                <TableRow key={i} sx={{ cursor: 'pointer' }}>
                  <TableCell>{order._id.toString().slice(0, 5)}...</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.method === 1 ? 'Paid' : 'Cash'}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Stack spacing={1} direction="row">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          setID(order._id);
                          deleteDialog();
                        }}
                        sx={{ fonSize: '3px' }}
                      >
                        Delete
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          handleOrder(order._id);
                        }}
                        sx={{ fonSize: '3px' }}
                      >
                        Next Stage
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Stack
            alignItems="center"
            my={3}
            sx={{
              background: '#f9f9f9',
              paddingY: '1rem',
              borderRadius: '10px',
            }}
          >
            <Pagination
              shape="rounded"
              count={ceil(orderList.length / 5)}
              color="primary"
              page={page + 1}
              onChange={handleChange}
            />
          </Stack>
        </TableContainer>
      </Stack>
    </>
  );
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookie = (await ctx.req?.cookies) || '';
  if (cookie.food_app !== process.env.TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  try {
    const [data, orders] = await Promise.all([
      FoodApi.getProducts(),
      FoodApi.getOrders(),
    ]);
    if (!data || !orders) {
      return {
        props: {
          notFound: true,
        },
      };
    }

    return {
      props: {
        data: data.data,
        orders: orders.data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: error,
      },
    };
  }
};
