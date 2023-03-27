import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, InputNumber, List, Space } from 'antd';
import { IProduct } from 'api/baseApi/models/product';
import { CartItem } from 'App';
import './CartList.scss';

interface IProps {
  cartItems: CartItem[];
  handleRemoveItemFromCart?: (item: IProduct) => void;
  handleCartItemCountChange?: (CartItemId: number, newCount: number) => void;
}

const CartList: React.FC<IProps> = (props: IProps) => {
  return (
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
              {props.handleCartItemCountChange && (
                <Button
                  icon={<MinusOutlined />}
                  onClick={() => {
                    if (props.handleCartItemCountChange)
                      props.handleCartItemCountChange(item.id, item.count - 1);
                  }}
                />
              )}
              <InputNumber
                min={1}
                max={100}
                style={{ width: 50 }}
                controls={false}
                disabled={!props.handleCartItemCountChange}
                value={item.count}
                onChange={value => {
                  if (props.handleCartItemCountChange)
                    props.handleCartItemCountChange(item.id, value ?? 1);
                }}
              />
              {props.handleCartItemCountChange && (
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    if (props.handleCartItemCountChange)
                      props.handleCartItemCountChange(item.id, item.count + 1);
                  }}
                />
              )}
            </Space.Compact>
            {props.handleRemoveItemFromCart && (
              <Button
                key={'delete-item-button'}
                onClick={() => {
                  if (props.handleRemoveItemFromCart)
                    props.handleRemoveItemFromCart(item);
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
