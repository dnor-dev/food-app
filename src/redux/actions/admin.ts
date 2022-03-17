import Action, { actionTypes } from './types';
import { Dispatch } from 'react';
import FoodApi from '../../utils/api/food.api';
import { pizzaProps } from '../../../pages';

const _deleteProducts = async (
  id: string,
  callback: () => void,
  setIsLoading?: (x: boolean) => void,
) => {
  try {
    await FoodApi.deleteProduct(id);
    callback();
    setIsLoading && setIsLoading(false);
  } catch (error: any) {
    setIsLoading && setIsLoading(false);
    if (error?.message === 'Network Error') {
      alert('You are offline');
    } else if (error?.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert('Something went wrong.');
    }
  }
};

const _addProducts = async (
  data: {
    img: string;
    title: string;
    desc: string;
    prices: number[];
    extraOptions: {
      text: string;
      price: number;
    }[];
  },
  callback: () => void,
  setIsLoading?: (x: boolean) => void,
) => {
  try {
    await FoodApi.addProducts(data);
    callback();
    setIsLoading && setIsLoading(false);
  } catch (error: any) {
    setIsLoading && setIsLoading(false);
    if (error?.message === 'Network Error') {
      alert('You are offline');
    } else if (error?.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert('Something went wrong.');
    }
  }
};

const _deleteOrder = async (
  id: number,
  callback: () => void,
  setIsLoading: (x: boolean) => void,
) => {
  try {
    await FoodApi.deleteOrder(id);
    callback();
    setIsLoading && setIsLoading(false);
  } catch (error: any) {
    setIsLoading && setIsLoading(false);
    if (error?.message === 'Network Error') {
      alert('You are offline');
    } else if (error?.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert('Something went wrong.');
    }
  }
};

const _login = async (
  data: { username: string; password: string },
  callback: () => void,
  setIsLoading: (x: boolean) => void,
  setError: (x: boolean) => void,
) => {
  try {
    await FoodApi.login(data);
    setError(false);
    callback();
    setIsLoading && setIsLoading(false);
  } catch (error: any) {
    setError(true);
    setIsLoading && setIsLoading(false);
    if (error?.message === 'Network Error') {
      alert('You are offline');
    } else if (error?.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert('Something went wrong.');
    }
  }
};

const adminActions = { _deleteProducts, _addProducts, _deleteOrder, _login };

export default adminActions;
