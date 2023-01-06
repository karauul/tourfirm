import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, List, Space } from 'antd';
import Badge from 'antd/es/badge';
import Modal from 'antd/es/modal';
import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo.svg';
import NavBar from './components/NavBar';
import Products from './components/Products';
import { IProduct } from './components/Products/components/Product';

const lorenipsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas integer eget aliquet nibh praesent. Velit scelerisque in dictum non consectetur a. Ullamcorper sit amet risus nullam. Facilisis volutpat est velit egestas dui id ornare. Ante metus dictum at tempor commodo ullamcorper a. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. Vulputate sapien nec sagittis aliquam. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. Odio tempor orci dapibus ultrices in iaculis. Lacinia at quis risus sed. Consequat interdum varius sit amet mattis vulputate. Integer quis auctor elit sed vulputate mi sit amet mauris. Sed tempus urna et pharetra pharetra massa massa ultricies mi. Nunc sed blandit libero volutpat sed cras ornare arcu. Libero volutpat sed cras ornare. Habitant morbi tristiqu';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const handleAddItemToCart = (product: IProduct) => {
    if (cartItems.find((cartItem) => cartItem.id === product.id)) return;

    setCartItems([...cartItems, product]);
  };
  const handleRemoveItemFromToCart = (product: IProduct) => {
    setCartItems([
      ...cartItems.filter((cartItems) => cartItems.id !== product.id),
    ]);
  };

  const handleOpenCart = () => {
    setIsCartModalOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartModalOpen(false);
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <img className="logo-img" src={logo} alt="" />
        </div>
        <NavBar
          items={[
            {
              title: 'Туры',
              link: '/#products-area',
            },
            {
              title: 'О нас',
              link: '/#about-area',
            },
            {
              title: 'Контакты',
              link: '/#contacts',
            },
          ]}
        />

        <div className="cart-wrapper">
          <Space size={'large'}>
            <Badge count={cartItems.length}>
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
        </div>
      </div>
      <div className="body">
        <div className="about-area" id="about-area">
          <div className="title">Lorem ipsum</div>
          <div className="content">{lorenipsum}</div>
        </div>
        <div className="products-area" id="products-area">
          <div className="title">Наши услуги</div>
          <Products handleAddItemToCart={handleAddItemToCart} />
        </div>
      </div>
      <div className="footer">
        <div className="contacts" id="contacts">
          Контакты:
          <div className="contact">+7 923 - Адель</div>
          <div className="contact">+7 923 - Адель</div>
          <div className="contact">+7 923 - Адель</div>
          <div className="contact">+7 923 - Адель</div>
        </div>
        <div className="rights">
          © Все права защищены. ООО &quot;Турфирма&quot;.
        </div>
      </div>
      <Modal
        open={isCartModalOpen}
        footer={null}
        onCancel={handleCloseCart}
        style={{ top: '11vh', right: '10 px' }}
      >
        <List
          itemLayout="horizontal"
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  key={'remove-item-button'}
                  type="default"
                  danger
                  onClick={() => handleRemoveItemFromToCart(item)}
                >
                  Удалить
                </Button>,
              ]}
            >
              {item.title}
            </List.Item>
          )}
        ></List>
      </Modal>
    </>
  );
};

export default App;
