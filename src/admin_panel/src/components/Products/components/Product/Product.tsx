import './Product.scss';
import {
  Button,
  Space,
  Image,
  Divider,
  Modal,
  Tooltip,
  Input,
  Switch,
  Form,
  Radio,
  Upload,
} from 'antd';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { IProduct } from 'api/types/product';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { addProduct } from 'redux/ducks/cart_list';
import { updateProduct } from 'api/endpoints/products';
import { FALSE } from 'sass';
import { UploadOutlined } from '@ant-design/icons';
import { info } from 'console';

interface IProps {
  item: IProduct;

  handleOpenCart: () => void;
}

const Product: React.FC<IProps> = (props: IProps) => {
  const cartState = useSelector((state: RootState) => state.cartList);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const inputFile = useRef<HTMLInputElement | null>(null);

  const onUploadFileButtonClick = () => {
    inputFile?.current?.click();
  };

  const handleEditButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveButtonClick = () => {
    const updatedProduct = {
      id: props.item.id,
      image: props.item.image,
      title: form.getFieldValue('title') ?? props.item.title,
      price: form.getFieldValue('price') ?? props.item.price,
      description: form.getFieldValue('description') ?? props.item.description,
    } as IProduct;
    updateProduct(updatedProduct).then(success => {
      if (success) {
        setIsModalOpen(false);
      } else {
        console.log;
      }
    });
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
        <Divider style={{ marginTop: '8px', marginBottom: '14px' }} />
        <div className="product-price">{props.item.price} ₽</div>
        <div className="product-description">
          Описание: {props.item.description}
        </div>
        <div className="action-buttons-wrapper">
          <Space.Compact block size="large">
            <Button block type="primary" onClick={handleEditButtonClick}>
              Редактировать
            </Button>
          </Space.Compact>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        title="Окно редактирования"
        onCancel={handleCancel}
        footer={null}
        centered
        width={'500px'}
      >
        <Form
          labelCol={{ span: 7 }}
          layout={'horizontal'}
          form={form}
          style={{ maxWidth: 500 }}
        >
          <Form.Item>
            <Image width={'100%'} src={props.item.image} />
          </Form.Item>
          <Form.Item>
            <div>
              <input
                type="file"
                accept="image/*"
                id="file"
                ref={inputFile}
                style={{ display: 'none' }}
                max={1}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files === null) return;

                  const file = e.target.files![0];

                  const data = new FormData();
                  data.append(file.name, file);

                  console.log(data);
                }}
              />
              <Button
                icon={<UploadOutlined />}
                onClick={onUploadFileButtonClick}
              >
                Изменить фото
              </Button>
            </div>
          </Form.Item>
          <Form.Item label="Название" name={'title'}>
            <Input defaultValue={props.item.title} />
          </Form.Item>
          <Form.Item name={'price'} label="Цена">
            <Input defaultValue={props.item.price} type={'number'} />
          </Form.Item>
          <Form.Item name={'description'} label="Описание">
            <Input defaultValue={props.item.description} />
          </Form.Item>
          <Form.Item label="Доступно к заказу">
            <Switch defaultChecked />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" onClick={handleSaveButtonClick}>
              Сохранить изменения
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Product;
