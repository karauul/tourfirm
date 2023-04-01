import { Button, Divider } from 'antd';
import { IOrder } from 'components/Cart';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  removeProduct,
  setProductCount,
} from 'redux/ducks/cart_list';
import { RootState } from 'redux/rootReducer';
import CartList from '../CartList';
import './CartItemsTab.scss';

interface IProps {
  handleAddOrder: (order: IOrder) => void;
}

const CartItemsTab: React.FC<IProps> = (props: IProps) => {
  const cartState = useSelector((state: RootState) => state.cartList);
  const dispatch = useDispatch();

  const totalPrice = cartState.items.reduce(
    (result, cartItem) => result + cartItem.count * cartItem.price,
    0
  );

  const handleAddOrder = () => {
    if (cartState.items.length === 0) return;

    const order: IOrder = {
      products: cartState.items,
      totalPrice: totalPrice,
      date: new Date().toDateString(),
    };
    props.handleAddOrder(order);

    dispatch(clearCart());
  };

  return (
    <>
      <CartList
        cartItems={cartState.items}
        handleCartItemCountChange={(cartItemId: number, newCount: number) =>
          dispatch(setProductCount(cartItemId, newCount))
        }
        handleRemoveItemFromCart={(cartItemId: number) =>
          dispatch(removeProduct(cartItemId))
        }
      />
      <Divider />
      <div className="add-order-wrapper">
        <div className="total-price">
          {cartState.items.length === 0 ? '' : `${totalPrice} ₽`}
        </div>
        <Button
          disabled={cartState.items.length === 0}
          size="large"
          onClick={handleAddOrder}
        >
          Заказать
        </Button>
      </div>
    </>
  );
};

export default CartItemsTab;
