import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Stack,
  TextField,
} from '@mui/material';
import { shippingDetails } from '../../../pages/cart';

type Props = {
  openDialog: boolean;
  handleDialog: () => void;
  orderCreate: (data: shippingDetails) => void;
  total: number;
};

const OrderDetails = ({
  openDialog,
  handleDialog,
  orderCreate,
  total,
}: Props) => {
  const [data, setData] = useState({
    customer: '',
    phone: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const { customer, phone, address } = data;

  const handleClick = () => {
    if (customer === '' || address === '') return true;

    const emptyOrder = () => {
      alert("You didn't order anything");
      handleDialog();
    };

    total !== 0
      ? orderCreate({ customer, address, total, method: 0 })
      : emptyOrder();
    return false;
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={openDialog} onClose={handleDialog}>
      <DialogTitle>Pay with Cash</DialogTitle>
      <DialogContent>
        <Stack spacing={3.5} py={2}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              name="customer"
              value={customer}
              size="small"
              type="text"
              variant="filled"
              label="Customer"
              placeholder="john doe"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              fullWidth
              name="phone"
              value={phone}
              size="small"
              type="number"
              label="Phone Number"
              variant="filled"
              placeholder="090355005005"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              fullWidth
              name="address"
              value={address}
              size="small"
              type="text"
              label="Address"
              variant="filled"
              placeholder="main st"
              multiline
              rows={2}
              onChange={handleChange}
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleDialog}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleClick}>
          Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetails;
