import React from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import adminActions from '../../redux/actions/admin';

type x = {
  address: string;
  customer: string;
  method: number;
  status: string;
  total: number;
  _id: number;
}[];

type Props = {
  id: number;
  deleteOrder: boolean;
  deleteDialog: () => void;
  orderList: x;
  setOrderList: (orderList: x) => void;
  setIsLoading: (x: boolean) => void;
};

const DeleteOrder = ({
  id,
  deleteOrder,
  deleteDialog,
  orderList,
  setOrderList,
  setIsLoading,
}: Props) => {
  const { _deleteOrder } = adminActions;
  const callback = () => {
    deleteDialog();
    setOrderList(orderList.filter((order) => order._id !== id));
  };
  const handleClick = async () => {
    setIsLoading(true);
    _deleteOrder(id, callback, setIsLoading);
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={deleteOrder} onClose={deleteDialog}>
      <DialogContent>
        <Typography textAlign="center" mt={2} fontWeight="bold" variant="h6">
          Do you want to delete this order?
        </Typography>
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={3}
          direction="row"
          my={3}
        >
          <Button variant="contained" size="small" onClick={deleteDialog}>
            Cancel
          </Button>
          <Button variant="contained" size="small" onClick={handleClick}>
            Delete
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteOrder;
