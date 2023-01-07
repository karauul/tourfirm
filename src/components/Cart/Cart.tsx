import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Modal, Space, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { randomNumberInRange } from '../../utils/randomNumber';
import { IProduct } from '../Products/components/Product';
import CartItemsTab from './Components/CartItemsTab';
import OrdersTab from './Components/OrdersTab';
import cookies from '../../utils/cookies';
import cookiesNames from '../../constants/cookiesNames';

interface IProps {
  cartItems: IProduct[];
  handleRemoveItemFromCart: (item: IProduct) => void;
  handleCleanerCart: () => void;
}

export interface IOrder {
  id?: number;
  products: IProduct[];
  totalPrice: number;
  date: string;
}

const Cart: React.FC<IProps> = (props: IProps) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const ordersFromCookies =
      (cookies.get(cookiesNames.orders) as IOrder[]) ?? [];
    setOrders(ordersFromCookies);
  }, []);

  const handleChangeOrders = (orders: IOrder[]) => {
    cookies.set(cookiesNames.orders, orders);
  };

  const handleOpenCart = () => {
    setIsCartModalOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartModalOpen(false);
  };

  const handleAddOrder = (order: IOrder) => {
    order.id = randomNumberInRange(1, 10000000);
    const newOrders = [...orders, order];

    setOrders(newOrders);

    handleChangeOrders(newOrders);

    props.handleCleanerCart();
  };

  const handleRemoveOrder = (orderToDelete: IOrder) => {
    const newOrders = orders.filter((order) => order.id !== orderToDelete.id);

    setOrders(newOrders);

    handleChangeOrders(newOrders);
  };

  return (
    <>
      <Space size={'large'}>
        <Badge count={props.cartItems.length}>
          <Button
            size="large"
            type="text"
            shape="circle"
            style={{ color: 'black' }}
            icon={<ShoppingCartOutlined style={{ fontSize: '24px' }} />}
            onClick={handleOpenCart}
          />
        </Badge>
      </Space>
      <Modal
        open={isCartModalOpen}
        footer={null}
        onCancel={handleCloseCart}
        style={{ top: '11vh', right: '10 px' }}
      >
        <Tabs
          size="large"
          defaultActiveKey="1"
          items={[
            {
              label: 'Корзина',
              key: '1',
              children: (
                <CartItemsTab
                  cartItems={props.cartItems}
                  handleRemoveItemFromCart={props.handleRemoveItemFromCart}
                  handleAddOrder={handleAddOrder}
                />
              ),
            },
            {
              label: 'Заказы',
              key: '2',
              children: (
                <OrdersTab
                  orders={orders}
                  handleRemoveItemFromOrders={handleRemoveOrder}
                />
              ),
            },
          ]}
        />
      </Modal>
    </>
  );
};
export default Cart;
