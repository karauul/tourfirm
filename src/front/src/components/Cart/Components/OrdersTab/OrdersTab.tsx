import { Button, Collapse, List } from 'antd';
import { IOrder } from '../../Cart';
import CartList from '../CartList';
import './OrdersTab.scss';

const { Panel } = Collapse;

interface IProps {
  orders: IOrder[];
  handleRemoveItemFromOrders: (order: IOrder) => void;
}

const OrdersTab: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      {props.orders.map(order => (
        <div key={order.id!} className="order-collapse-wrapper">
          <Collapse>
            <Panel
              key={order.id!}
              header={`${order.date} - ${order.totalPrice} ₽`}
            >
              <CartList cartItems={order.products} />
            </Panel>
          </Collapse>
        </div>
      ))}
    </>
  );
};

export default OrdersTab;
