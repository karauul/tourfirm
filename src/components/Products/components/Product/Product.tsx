import './Product.css';
import { Button, Space, Divider, Modal } from 'antd';
import { useState } from 'react';
import Item from 'antd/es/list/Item';

export interface IProduct {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
}

interface IProps {
  item: IProduct;
  handleAddItemToCart: (product: IProduct) => void;
}

const Product: React.FC<IProps> = (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMoreClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="product">
        <div className="product-image-wrapper">
          <img className="product-image" src={props.item.image} alt="" />
        </div>
        <div className="product-title">{props.item.title}</div>
        <Divider style={{ marginTop: '0 ', marginBottom: '12px' }} />
        <div className="product-price">{props.item.price} ₽.</div>
        <div className="product-description">
          Описание:
          {props.item.description}
        </div>
        <Space.Compact block size="large">
          <Button
            block
            type="primary"
            size="large"
            onClick={() => props.handleAddItemToCart(props.item)}
          >
            Купить
          </Button>
          <Button
            block
            ghost
            type="primary"
            size="large"
            onClick={handleMoreClick}
          >
            Подробнее
          </Button>
        </Space.Compact>
      </div>
      <Modal
        open={isModalOpen}
        title={props.item.title}
        onCancel={handleCancel}
        footer={null}
        centered
        width={'304px'}
      >
        <div className="product-image-wrapper">
          <img className="product-image" src={props.item.image} alt="" />
        </div>
        <div className="product-title">{props.item.title}</div>
        <Divider style={{ marginTop: '0 ', marginBottom: '12px' }} />
        <div className="product-price">{props.item.price} ₽.</div>
        <div className="product-description">
          Описание:
          {props.item.description}
        </div>
      </Modal>
    </>
  );
};
export default Product;
