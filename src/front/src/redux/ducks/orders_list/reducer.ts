import * as actionTypes from './action_types';
import { ActionsType } from './types';
import { CartItem } from '../cart_list';

export interface IOrder {
  id?: number;
  products: CartItem[];
  totalPrice: number;
  date: Date;
  surname: string;
  name: string;
  birthday: string;
  grazhdanstvo: string;
  serialNumber: string;
  number: string;
  passportStartDate: string;
  passportEndDate: string;
  passportAuthor: string;
}

export interface IOrdersListState {
  items: IOrder[];
}

const defaultState: IOrdersListState = {
  items: [],
};

const reducer = (
  state: IOrdersListState = defaultState,
  action: ActionsType
): IOrdersListState => {
  switch (action.type) {
    case actionTypes.ADD_ORDER: {
      return {
        items: [{ ...action.payload, count: 1 } as IOrder, ...state.items],
      } as IOrdersListState;
    }

    case actionTypes.CLEAR_ORDERS: {
      return {
        items: [],
      } as IOrdersListState;
    }

    default:
      return state;
  }
};

export default reducer;
