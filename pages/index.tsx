import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Features from '../src/components/Features';
import PizzaList from '../src/components/PizzaList';
import FoodApi from '../src/utils/api/food.api';

export type pizzaProps = {
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
};

const Home = ({ data }: pizzaProps) => {
  return (
    <>
      <Head>
        <title>Food App | Home</title>
      </Head>
      <Features />
      <PizzaList data={data} />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await FoodApi.getProducts();
    const data = res.data;

    if (!data) {
      return {
        props: {
          notFound: true,
        },
      };
    }

    return {
      props: {
        data,
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
