import { Button, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  removeProduct,
  setProductCount,
} from 'redux/ducks/cart_list';
import { RootState } from 'redux/rootReducer';
import CartList from '../CartList';
import './CartItemsTab.scss';
import { IOrder, addOrder } from 'redux/ducks/orders_list';
import { useNavigate } from 'react-router-dom';

export interface IProps {
  closeCart: () => void;
}

const CartItemsTab: React.FC<IProps> = (props: IProps) => {
  const cartState = useSelector((state: RootState) => state.cartList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartState.items.reduce(
    (result, cartItem) => result + cartItem.count * cartItem.price,
    0
  );

  const handleAddOrder = () => {
    navigate('/Ordering');
    props.closeCart();
  };

  // const handleAddOrder = () => {
  //   if (cartState.items.length === 0) return;

  //   const order: IOrder = {
  //     products: cartState.items,
  //     totalPrice: totalPrice,
  //     date: new Date(),
  //   };

  //   dispatch(addOrder(order));
  //   dispatch(clearCart());
  // };

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
