import { combineReducers, Reducer } from 'redux';
import cartList, {
  ActionsType as CartListActionsType,
} from './ducks/cart_list';

const rootReducer = combineReducers({ cartList });

export type RootState = ReturnType<typeof rootReducer>;

export type ActionType = CartListActionsType;

export default rootReducer as Reducer<RootState, ActionType>;
