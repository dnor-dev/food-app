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
  Chip,
} from '@mui/material';
import adminActions from '../../redux/actions/admin';
import { useRouter } from 'next/router';
import CloudinaryApiService from '../../utils/api/cloudinary.api';

type Props = {
  open: boolean;
  handleOpen: () => void;
};

interface Inputs {
  title: string;
  desc: string;
  prices: number[];
}

const AddProducts = ({ open, handleOpen }: Props) => {
  const { reload } = useRouter();
  const [extraOptions, setExtraOptions] = useState<
    {
      text: string;
      price: number;
    }[]
  >([]);
  const [data, setData] = useState<Inputs>({
    title: '',
    desc: '',
    prices: [],
  });
  const [large, setLarge] = useState('');
  const [medium, setMedium] = useState('');
  const [small, setSmall] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [extra, setExtra] = useState({
    text: '',
    price: 0,
  });
  const [error, setError] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [img, setImg] = useState('');

  const { _addProducts } = adminActions;

  const { title, desc, prices } = data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleExtraInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExtra({
      ...extra,
      [name]: value,
    });
  };

  const handleExtra = () => {
    extra.text !== '' || extra.price !== 0
      ? setExtraOptions((prev) => [...prev, extra])
      : alert('Please add valid details');
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append('file', imgFile || 'img');
    data.append('upload_preset', 'food_app');
    try {
      const upload = await CloudinaryApiService.uploadImage(data);
      setImg(upload.data.secure_url);
    } catch (error) {
      alert('Something went wrong with your image');
    }
  };

  const callback = () => {
    reload();
  };

  const handleClick = () => {
    setIsLoading(true);
    uploadImage();
    setError(false);
    handleOpen();
    prices.push(parseInt(small), parseInt(medium), parseInt(large));
    _addProducts({ img, ...data, extraOptions }, callback, setIsLoading);
  };
  return (
    <>
      {isLoading && (
        <Box sx={{ width: '100%', position: 'fixed' }}>
          <LinearProgress />
        </Box>
      )}
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleOpen}>
        <DialogTitle>Add Products</DialogTitle>
        <DialogContent>
          <Stack spacing={3.5} py={2}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                name="img"
                size="small"
                type="file"
                placeholder="/images/..."
                onChange={(e: any) => setImgFile(e.target.files[0])}
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
                error={error}
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
                error={error}
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
                  error={error}
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
                  error={error}
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
                  error={error}
                />
              </Stack>
            </FormControl>

            <FormControl fullWidth>
              <Typography mb={1.3}>Extras</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TextField
                  fullWidth
                  name="text"
                  size="small"
                  type="text"
                  label="Name"
                  variant="filled"
                  placeholder="enter"
                  onChange={handleExtraInput}
                />
                <TextField
                  fullWidth
                  name="price"
                  size="small"
                  type="number"
                  label="Price"
                  variant="filled"
                  placeholder="enter"
                  onChange={handleExtraInput}
                />
                <Button variant="contained" size="small" onClick={handleExtra}>
                  ADD
                </Button>
              </Stack>
            </FormControl>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              flexWrap="wrap"
            >
              {extraOptions.map((opt, i) => (
                <Chip label={opt.text} key={i} />
              ))}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleOpen();
              extraOptions.splice(0, extraOptions.length);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleClick}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddProducts;
