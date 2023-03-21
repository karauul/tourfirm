import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, InputNumber, List, Space } from 'antd';
import { IProduct } from 'api/baseApi/models/product';
import { CartItem } from 'App';
import { IOrder } from 'components/Cart';
import CartList from '../CartList';
import './CartItemsTab.css';

interface IProps {
  cartItems: CartItem[];
  handleRemoveItemFromCart: (item: IProduct) => void;
  handleAddOrder: (order: IOrder) => void;
  handleCartItemCountChange: (CartItemId: number, newCount: number) => void;
}

const CartItemsTab: React.FC<IProps> = (props: IProps) => {
  const totalPrice = props.cartItems.reduce(
    (result, cartItem) => result + cartItem.count * cartItem.price,
    0
  );

  const handleAddOrder = () => {
    if (props.cartItems.length === 0) return;

    const order: IOrder = {
      products: props.cartItems,
      totalPrice: totalPrice,
      date: new Date().toDateString(),
    };
    props.handleAddOrder(order);
  };

  return (
    <>
      <CartList
        cartItems={props.cartItems}
        handleCartItemCountChange={props.handleCartItemCountChange}
        handleRemoveItemFromCart={props.handleRemoveItemFromCart}
      />
      <Divider />
      <div className="add-order-wrapper">
        <div className="total-price">
          {props.cartItems.length === 0 ? '' : `${totalPrice} ₽`}
        </div>
        <Button
          disabled={props.cartItems.length === 0}
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
