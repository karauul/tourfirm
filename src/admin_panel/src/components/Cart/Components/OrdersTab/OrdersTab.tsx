import { Collapse, Empty } from 'antd';
import CartList from '../CartList';
import './OrdersTab.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import locale from 'constants/locale';

const { Panel } = Collapse;

const OrdersTab: React.FC = () => {
  const ordersState = useSelector((state: RootState) => state.ordersList);

  if (ordersState.items.length === 0) {
    return (
      <div style={{ padding: '16px', color: 'rgba(0,0,0,0.25)' }}>
        <Empty description={locale.noDataMessage} />
      </div>
    );
  }

  return (
    <>
      {ordersState.items.map(order => (
        //eslint-disable-next-line
        <div key={order.id!} className="order-collapse-wrapper">
          <Collapse>
            <Panel
              //eslint-disable-next-line
              key={order.id!}
              header={`${new Date(order.date).toLocaleDateString(
                'ru-Ru'
              )} ${new Date(order.date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })} - ${order.totalPrice}
               ₽`}
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
