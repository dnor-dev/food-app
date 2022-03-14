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
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import adminActions from '../../redux/actions/admin';
import { useRouter } from 'next/router';

type Props = {
  open: boolean;
  handleOpen: () => void;
};

interface Inputs {
  img: string;
  title: string;
  desc: string;
  prices: number[];
}

const AddProducts = ({ open, handleOpen }: Props) => {
  const { reload } = useRouter();
  const [data, setData] = useState<Inputs>({
    img: '',
    title: '',
    desc: '',
    prices: [],
  });
  const [large, setLarge] = useState('');
  const [medium, setMedium] = useState('');
  const [small, setSmall] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { _addProducts } = adminActions;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const { img, title, desc, prices } = data;

  const callback = () => {
    reload();
  };

  const handleClick = () => {
    if (img === '' || title === '' || desc === '' || prices.length)
      return false;
    setIsLoading(true);
    handleOpen();
    prices.push(parseInt(small), parseInt(medium), parseInt(large));
    _addProducts(data, callback, setIsLoading);
    return true;
  };
  return (
    <>
      {isLoading && (
        <Box sx={{ width: '100%', position: 'fixed' }}>
          <LinearProgress />
        </Box>
      )}
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleOpen}>
        <DialogTitle>Pay with Cash</DialogTitle>
        <DialogContent>
          <Stack spacing={3.5} py={2}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                name="img"
                value={img}
                size="small"
                type="text"
                variant="filled"
                label="Image"
                placeholder="/images/..."
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                fullWidth
                name="title"
                value={title}
                size="small"
                type="text    "
                label="Title"
                variant="filled"
                placeholder="Indiana pizza"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                fullWidth
                name="desc"
                value={desc}
                size="small"
                type="text    "
                label="Description"
                variant="filled"
                multiline
                rows={2}
                placeholder="about product"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography mb={1.3}>Prices</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TextField
                  fullWidth
                  name="small"
                  size="small"
                  value={small}
                  type="number"
                  label="Small"
                  variant="filled"
                  placeholder="enter"
                  onChange={(e) => setSmall(e.target.value)}
                />
                <TextField
                  fullWidth
                  name="medium"
                  size="small"
                  value={medium}
                  type="number"
                  label="Medium"
                  variant="filled"
                  placeholder="enter"
                  onChange={(e) => setMedium(e.target.value)}
                />
                <TextField
                  fullWidth
                  name="large"
                  size="small"
                  value={large}
                  type="number"
                  label="Large"
                  variant="filled"
                  placeholder="enter"
                  onChange={(e) => setLarge(e.target.value)}
                />
              </Stack>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen}>Cancel</Button>
          <Button onClick={handleClick}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddProducts;
