import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Modal, Space, Tabs } from 'antd';

import CartItemsTab from './Components/CartItemsTab';
import OrdersTab from './Components/OrdersTab';

import { RootState } from 'redux/rootReducer';
import { useSelector } from 'react-redux';

interface IProps {
  isCartModalOpen: boolean;
  handleOpenCart: () => void;
  handleCloseCart: () => void;
}

const Cart: React.FC<IProps> = (props: IProps) => {
  const cartState = useSelector((state: RootState) => state.cartList);

  return (
    <>
      <Space size={'large'}>
        <Badge count={cartState.items.length}>
          <Button
            size="large"
            type="text"
            shape="circle"
            style={{ color: 'black' }}
            icon={<ShoppingCartOutlined style={{ fontSize: '24px' }} />}
            onClick={props.handleOpenCart}
          />
        </Badge>
      </Space>
      <Modal
        open={props.isCartModalOpen}
        footer={null}
        onCancel={props.handleCloseCart}
        style={{ top: '11vh', right: '10 px' }}
      >
        <Tabs
          size="large"
          defaultActiveKey="1"
          items={[
            {
              label: 'Корзина',
              key: '1',
              children: <CartItemsTab />,
            },
            {
              label: 'Заказы',
              key: '2',
              children: <OrdersTab />,
            },
          ]}
        />
      </Modal>
    </>
  );
};
export default Cart;
