import React from 'react';
import { Box, Typography, Stack, Container, Grid } from '@mui/material';
import Image from 'next/image';
import { pizzaProps } from '../../../pages';
import NextLink from 'next/link';

const PizzaList = ({ data }: pizzaProps) => {
  return (
    <Container>
      <Stack alignItems="center" my={10}>
        <Typography variant="h4" fontWeight="600">
          THE BEST PIZZA IN TOWN
        </Typography>
        <Typography variant="subtitle1" my={2}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse autem
          enim aut? Eaque cumque unde repudiandae dolores perferendis eum quasi.
        </Typography>
        <Box>
          <Grid
            container
            columnSpacing={1}
            rowSpacing={7}
            my={1}
            justifyContent="center"
          >
            {data.length !== 0 &&
              data.map((pizza, i) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={3}
                  key={i}
                  sx={{ width: '700px' }}
                >
                  <NextLink href={`/products/${pizza._id}`} passHref>
                    <Stack alignItems="center" sx={{ cursor: 'pointer' }}>
                      <Image
                        src={pizza.img}
                        height={200}
                        width={200}
                        alt={pizza.title}
                      />
                      <Typography
                        variant="subtitle1"
                        fontWeight="600"
                        mt={2}
                        color="#a80707"
                        sx={{ textTransform: 'uppercase', textAlign: 'center' }}
                      >
                        {pizza.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        fontWeight="600"
                        my={2}
                        textAlign="center"
                      >
                        $ {pizza.prices[0]}
                      </Typography>
                      <Typography variant="subtitle2" textAlign="center">
                        {pizza.desc}
                      </Typography>
                    </Stack>
                  </NextLink>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};

export default PizzaList;
