import { Button, List } from 'antd';
import { IOrder } from '../../Cart';

interface IProps {
  orders: IOrder[];
  handleRemoveItemFromOrders: (order: IOrder) => void;
}

const OrdersTab: React.FC<IProps> = (props: IProps) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.orders}
      renderItem={item => (
        <List.Item
          actions={[
            <Button
              key={'remove-item-button'}
              type="default"
              danger
              onClick={() => props.handleRemoveItemFromOrders(item)}
            >
              Удалить
            </Button>,
          ]}
        >
          {`${item.date} - ${item.totalPrice} ₽`}
        </List.Item>
      )}
    />
  );
};

export default OrdersTab;
