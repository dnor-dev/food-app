import Action, { actionTypes } from '../actions/types';

type appState = {
  products: any[];
  quantity: number;
  total: number;
};

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

const cartReducer = (state: appState = initialState, action: Action) => {
  let { quantity, products, total } = state;
  switch (action.type) {
    case actionTypes.ADD_PRODUCT:
      products.push(action.payload);
      quantity += 1;
      total += action.payload.price * action.payload.quantity;
      return {
        products,
        quantity,
        total,
      };
    case actionTypes.RESET:
      products = [];
      quantity = 0;
      total = 0;
      return {
        products,
        quantity,
        total,
      };

    default:
      return state;
  }
};

export default cartReducer;
