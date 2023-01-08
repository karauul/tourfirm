import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, InputNumber, List, Space } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import { CartItem } from '../../../../App';
import { IProduct } from '../../../Products/components/Product';
import { IOrder } from '../../Cart';
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
      <List
        itemLayout="horizontal"
        dataSource={props.cartItems}
        renderItem={item => (
          <div className="cart-item">
            <div className="cart-item-content-wrapper">
              <div className="cart-item-image-wrapper">
                <img className="cart-item-image" src={item.image} alt="" />
              </div>
              <div className="cart-item-title">{item.title}</div>
              <div className="cart-item-price-wrapper">
                <div className="cart-item-price">{item.price} ₽</div>
              </div>
            </div>
            <div className="cart-item-actions-bar">
              <Space.Compact key={'change-count-actions-bar'}>
                <Button
                  icon={<MinusOutlined />}
                  onClick={() =>
                    props.handleCartItemCountChange(item.id, item.count - 1)
                  }
                />
                <InputNumber
                  min={1}
                  max={100}
                  style={{ width: 50 }}
                  controls={false}
                  value={item.count}
                  onChange={value =>
                    props.handleCartItemCountChange(item.id, value ?? 1)
                  }
                />
                <Button
                  icon={<PlusOutlined />}
                  onClick={() =>
                    props.handleCartItemCountChange(item.id, item.count + 1)
                  }
                />
              </Space.Compact>

              <Button
                key={'delete-item-button'}
                onClick={() => props.handleRemoveItemFromCart(item)}
                icon={<DeleteOutlined />}
                danger
              />
            </div>
          </div>
        )}
      />
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
