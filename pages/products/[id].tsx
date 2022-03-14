import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Container,
  Checkbox,
  TextField,
  Button,
} from '@mui/material';
import Image from 'next/image';
import FormControlLabel from '@mui/material/FormControlLabel';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FoodApi from '../../src/utils/api/food.api';
import Head from 'next/head';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import productActions from '../../src/redux/actions/addProducts';

type Props = {
  pizza: {
    _id: string;
    title: string;
    desc: string;
    img: string;
    prices: number[];
    extraOptions: {
      text: string;
      price: number;
    }[];
  };
};

export type paramsProps = {
  params: {
    id: string;
  };
};

export interface Iprops {
  text: string;
  price: number;
  _id?: string;
}

const Product = ({ pizza }: Props) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extras, setExtras] = useState<Iprops[]>([]);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { _addProducts } = bindActionCreators(productActions, dispatch);

  const changePrice = (num: number) => {
    setPrice(num + price);
  };

  const handleSize = (index: number) => {
    const difference = pizza.prices[index] - pizza.prices[size];
    setSize(index);
    changePrice(difference);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: { text: string; price: number; _id?: string },
  ) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(option.price);
      setExtras((prev: any) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    _addProducts(price, quantity, pizza, extras);
  };

  return (
    <>
      <Head>
        <title>Food App | {pizza._id !== '' && pizza.title}</title>
      </Head>
      <Container>
        {pizza._id !== '' && (
          <Stack my={10} direction="row" spacing={10} justifyContent="center">
            <Box alignSelf="center">
              <Image
                src={pizza.img}
                alt={pizza.title}
                width={500}
                height={500}
              />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="700">
                {pizza.title.toUpperCase()}
              </Typography>
              <Typography
                sx={{
                  color: '#a80707',
                  borderBottom: '1px solid #a80707',
                  width: 'fit-content',
                }}
                variant="h6"
                my={2}
              >
                $ {price}
              </Typography>
              <Typography>{pizza.desc}</Typography>
              <Box my={2}>
                <Typography fontWeight="800">Choose the size</Typography>
                <Stack direction="row" spacing={5} alignItems="center">
                  <Box
                    sx={{ position: 'relative', cursor: 'pointer' }}
                    my={2}
                    onClick={() => {
                      handleSize(0);
                    }}
                  >
                    <Image
                      src="/images/pizza.png"
                      alt="pizza small"
                      width={50}
                      height={50}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        fontSize: '12px',
                        color: '#fff',
                        background: 'teal',
                        borderRadius: '20px',
                        paddingX: '5px',
                        paddingY: '2px',
                        top: -5,
                        right: -20,
                      }}
                    >
                      Small
                    </Box>
                  </Box>
                  <Box
                    sx={{ position: 'relative', cursor: 'pointer' }}
                    my={2}
                    onClick={() => {
                      handleSize(1);
                    }}
                  >
                    <Image
                      src="/images/pizza.png"
                      alt="pizza small"
                      width={60}
                      height={60}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        fontSize: '12px',
                        color: '#fff',
                        background: 'teal',
                        borderRadius: '20px',
                        paddingX: '5px',
                        paddingY: '2px',
                        top: -5,
                        right: -20,
                      }}
                    >
                      Medium
                    </Box>
                  </Box>
                  <Box
                    sx={{ position: 'relative', cursor: 'pointer' }}
                    my={2}
                    onClick={() => {
                      handleSize(2);
                    }}
                  >
                    <Image
                      src="/images/pizza.png"
                      alt="pizza small"
                      width={70}
                      height={70}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        fontSize: '12px',
                        color: '#fff',
                        background: 'teal',
                        borderRadius: '20px',
                        paddingX: '5px',
                        paddingY: '2px',
                        top: -5,
                        right: -15,
                      }}
                    >
                      Large
                    </Box>
                  </Box>
                </Stack>
                <Typography fontWeight="800" mt={2} mb={1}>
                  Choose additional ingredients
                </Typography>
                <Stack direction="row" spacing={1}>
                  {pizza.extraOptions.map((option, i) => (
                    <Box key={i}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            icon={
                              <CheckBoxOutlineBlankOutlinedIcon
                                sx={{ color: '#333' }}
                              />
                            }
                            checkedIcon={<CheckBoxIcon />}
                            onChange={(e: any) => {
                              handleChange(e, option);
                            }}
                          />
                        }
                        label={option.text}
                      />
                    </Box>
                  ))}
                </Stack>

                <Stack direction="row" my={3} spacing={2}>
                  <TextField
                    type="number"
                    variant="filled"
                    size="small"
                    sx={{ width: '15ch' }}
                    value={quantity}
                    onChange={(e: any) => setQuantity(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleClick}
                  >
                    Add to cart
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Stack>
        )}
      </Container>
    </>
  );
};

export default Product;

export const getServerSideProps = async ({ params }: paramsProps) => {
  try {
    const res = await FoodApi.getSingleProduct(params.id);
    const pizza = res.data;

    if (!pizza) {
      return {
        props: {
          notFound: true,
        },
      };
    }

    return {
      props: {
        pizza,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
