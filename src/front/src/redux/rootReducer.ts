import { combineReducers, Reducer } from 'redux';
import cartList, {
  ActionsType as CartListActionsType,
} from './ducks/cart_list';

import ordersList, {
  ActionsType as OrdersListActionsType,
} from './ducks/orders_list';

import productsList, {
  ActionsType as ProductsListActionsType,
} from './ducks/products_list';

import account, { ActionsType as AccountActionType } from './ducks/account';

const rootReducer = combineReducers({
  cartList,
  ordersList,
  productsList,
  account,
});

export type RootState = ReturnType<typeof rootReducer>;

export type ActionType =
  | CartListActionsType
  | OrdersListActionsType
  | ProductsListActionsType
  | AccountActionType;

export default rootReducer as Reducer<RootState, ActionType>;
