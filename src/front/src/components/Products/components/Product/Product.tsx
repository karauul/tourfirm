import './Product.scss';
import { Button, Space, Divider, Modal, Tooltip } from 'antd';
import { useState } from 'react';
import { IProduct } from 'api/baseApi/models/product';

interface IProps {
  item: IProduct;
  handleAddItemToCart: (product: IProduct) => void;
  cartItems: IProduct[];
  handleOpenCart: () => void;
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
        <div className="action-buttons-wrapper">
          <Space.Compact block size="large">
            {props.cartItems.find(cartItem => cartItem.id === props.item.id) ? (
              <Tooltip title={'Товар уже в корзине'}>
                <Button
                  block
                  type="primary"
                  ghost
                  onClick={props.handleOpenCart}
                >
                  В корзине
                </Button>
              </Tooltip>
            ) : (
              <Button
                block
                type="primary"
                size="large"
                onClick={() => props.handleAddItemToCart(props.item)}
              >
                В корзину
              </Button>
            )}
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
