import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Empty, InputNumber, List, Space } from 'antd';
import { CartItem } from 'redux/ducks/cart_list';
import './CartList.scss';
import locale from 'constants/locale';

interface IProps {
  cartItems: CartItem[];
  handleRemoveItemFromCart?: (cartItemId: number) => void;
  handleCartItemCountChange?: (CartItemId: number, newCount: number) => void;
}

const CartList: React.FC<IProps> = (props: IProps) => {
  return (
    <List
      locale={{ emptyText: <Empty description={locale.noDataMessage} /> }}
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
            {props.handleRemoveItemFromCart && (
              <Button
                key={'delete-item-button'}
                onClick={() => {
                  if (props.handleRemoveItemFromCart)
                    props.handleRemoveItemFromCart(item.id);
                }}
                icon={<DeleteOutlined />}
                danger
              />
            )}
          </div>
        </div>
      )}
    />
  );
};

export default CartList;
