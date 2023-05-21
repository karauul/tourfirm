import './Product.scss';
import { Button, Space, Divider, Modal, Tooltip, Rate } from 'antd';
import { useState } from 'react';
import { IProduct } from 'api/types/product';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { addProduct } from 'redux/ducks/cart_list';

interface IProps {
  item: IProduct;

  handleOpenCart: () => void;
}

const Product: React.FC<IProps> = (props: IProps) => {
  const cartState = useSelector((state: RootState) => state.cartList);
  const dispatch = useDispatch();

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
        <Rate disabled value={props.item.hotel.stars} />
        <Divider style={{ marginTop: '10px ', marginBottom: '12px' }} />
        <div className="product-price">{props.item.price} ₽.</div>

        <div className="action-buttons-wrapper">
          <Space.Compact block size="large">
            {cartState.items.find(cartItem => cartItem.id === props.item.id) ? (
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
                onClick={() => dispatch(addProduct(props.item))}
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
        onCancel={handleCancel}
        footer={null}
        centered
        width={'1000px'}
      >
        <div className="product-image-wrapper">
          <img className="product-image" src={props.item.image} alt="" />
        </div>
        <div className="product-title">{props.item.title}</div>
        <Divider style={{ marginTop: '0 ', marginBottom: '12px' }} />
        <div className="product-price">{props.item.price} ₽.</div>
        <div className="product-description">
          Описание: {}
          {props.item.description}
        </div>
      </Modal>
    </>
  );
};

export default Product;
