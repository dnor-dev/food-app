import Action, { actionTypes } from './types';
import { Dispatch } from 'react';

type Pizza = {
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

type Extras = {
  text: string;
  price: number;
  _id?: string;
}[];

const _addProducts =
  (price: number, quantity: number, pizza: Pizza, extras: Extras) =>
  (dispatch: Dispatch<Action>) => {
    dispatch({
      type: actionTypes.ADD_PRODUCT,
      payload: {
        price: price,
        quantity: quantity,
        pizza: pizza,
        extras: extras,
      },
    });
  };

const productActions = { _addProducts };

export default productActions;
