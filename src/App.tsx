import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './assets/logo.svg';
import Cart from './components/Cart';
import NavBar from './components/NavBar';
import Products from './components/Products';
import { IProduct } from './components/Products/components/Product';
import cookiesNames from './constants/cookiesNames';
import cookies from './utils/cookies';

const aboutText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas integer eget aliquet nibh praesent. Velit scelerisque in dictum non consectetur a. Ullamcorper sit amet risus nullam. Facilisis volutpat est velit egestas dui id ornare. Ante metus dictum at tempor commodo ullamcorper a. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. Vulputate sapien nec sagittis aliquam. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. Odio tempor orci dapibus ultrices in iaculis. Lacinia at quis risus sed. Consequat interdum varius sit amet mattis vulputate. Integer quis auctor elit sed vulputate mi sit amet mauris. Sed tempus urna et pharetra pharetra massa massa ultricies mi. Nunc sed blandit libero volutpat sed cras ornare arcu. Libero volutpat sed cras ornare. Habitant morbi tristiqu';

export type CartItem = IProduct & {
  count: number;
};

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  useEffect(() => {
    setCartItems(cookies.get(cookiesNames.cart) ?? []);
  }, []);

  const handleAddItemToCart = (product: IProduct) => {
    if (cartItems.find(cartItem => cartItem.id === product.id)) return;
    const newCartItems = [...cartItems, { ...product, count: 1 }];
    setCartItems([...cartItems, { ...product, count: 1 }]);
    handleCartItemsChange(newCartItems);
  };

  const handleCartItemsCountChange = (cartItemId: number, newCount: number) => {
    if (newCount < 1 || newCount > 100) return;

    const newCartItems = cartItems.slice();
    const cartItem = newCartItems.find(cartItem => cartItem.id == cartItemId);
    if (!cartItem) return;
    cartItem.count = newCount;
    setCartItems(newCartItems);
    handleCartItemsChange(newCartItems);
  };

  const handleRemoveItemFromCart = (product: IProduct) => {
    const newCartItems = [
      ...cartItems.filter(cartItems => cartItems.id !== product.id),
    ];
    setCartItems(newCartItems);
    handleCartItemsChange(newCartItems);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenCart = () => {
    setIsCartModalOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartModalOpen(false);
  };

  const handleCartItemsChange = (newCartItems: CartItem[]) => {
    cookies.set(cookiesNames.cart, newCartItems);
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
          <Cart
            cartItems={cartItems}
            handleRemoveItemFromCart={handleRemoveItemFromCart}
            handleCleanerCart={handleClearCart}
            isCartModalOpen={isCartModalOpen}
            handleOpenCart={handleOpenCart}
            handleCloseCart={handleCloseCart}
            handleCartItemCountChange={handleCartItemsCountChange}
          />
        </div>
      </div>
      <div className="body">
        <div className="about-area" id="about-area">
          <div className="title">Lorem ipsum</div>
          <div className="content">{aboutText}</div>
        </div>
        <div className="products-area" id="products-area">
          <div className="title">Наши услуги</div>
          <Products
            handleAddItemToCart={handleAddItemToCart}
            cartItems={cartItems}
            handleOpenCart={handleOpenCart}
          />
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
    </>
  );
};

export default App;
