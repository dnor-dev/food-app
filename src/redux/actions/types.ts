export enum actionTypes {
  ADD_PRODUCT = 'add_product',
  RESET = 'reset',
  DELETE_PRODUCT = 'delete_product',
}

interface addProductsAction {
  type: actionTypes.ADD_PRODUCT;
  payload: {
    price: number;
    quantity: number;
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
    extras: {
      text: string;
      price: number;
      _id?: string;
    }[];
  };
}

interface resetAction {
  type: actionTypes.RESET;
}

interface deleteProductsAction {
  type: actionTypes.DELETE_PRODUCT;
}

type Action = addProductsAction | resetAction | deleteProductsAction;

export default Action;
