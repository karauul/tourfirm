import React, { useEffect, useRef, useState } from 'react';
import logo from 'assets/logo.svg';
import auth_logo from 'assets/auth.png';
import Cart from 'components/Cart';
import NavBar from 'components/NavBar';
import Products from 'components/Products';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import SocialNetworks from 'components/social_networks/SocialNetworks';
import vkIcon from 'assets/vk.svg';
import telegramIcon from 'assets/telegram.svg';
import whatsappIcon from 'assets/whatsapp.svg';
import 'App.scss';
import { Button, Form, Select, Tabs } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from 'redux/ducks/products_list';
import { Link, Route, Routes } from 'react-router-dom';
import Auth from 'components/Authorization/Auth';
import Registration from 'components/Authorization/Registration';
import PersonalPage from 'components/PersonalPage/PersonalPage';
import Ordering from 'components/Ordering/Ordering';
import { RootState } from 'redux/rootReducer';
import SoftMountComponent from 'ui-kit/soft_mount_component';
import CartItemsTab from 'components/Cart/Components/CartItemsTab';
import OrdersTab from 'components/Cart/Components/OrdersTab';

const aboutText = `Туроператор "Одиссея"- крупная и надежная компания в сфере туризма.
  На рынке туроператорской деятельности уже более 24 лет.
  Лидер продаж  туров по России на протяжении 20 лет.`;

const App: React.FC = () => {
  const [isCartMounted, setIsCartMounted] = useState(false);
  const cartRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const accountState = useSelector((state: RootState) => state.account);

  const [form] = Form.useForm();

  const handleCartButtonClicked = () => {
    setIsCartMounted(!isCartMounted);
  };

  const closeCart = (e: MouseEvent) => {
    if (
      isCartMounted &&
      cartRef.current &&
      !cartRef.current.contains(e.target as HTMLElement)
    ) {
      setIsCartMounted(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeCart);
  }, []);

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const handleSearchButtonClick = () => {
    dispatch(
      fetchProducts({
        country: form.getFieldValue('country'),
        stars: form.getFieldValue('stars'),
      })
    );
  };

  const handleOpenCart = () => {
    setIsCartModalOpen(true);
  };

  return (
    <>
      <div className="header">
        <Link to="/">
          <div className="logo">
            <img className="logo-img" src={logo} alt="" />
          </div>
        </Link>
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

        <Link to={accountState.account ? '/profile' : '/auth'}>
          <div className="auth-logo">
            <img className="auth-logo-img" src={auth_logo} alt="" />
          </div>
        </Link>
        <div className="cart-button-wrapper">
          <Cart
            isCartModalOpen={isCartModalOpen}
            onCartButtonClicked={handleCartButtonClicked}
          />
        </div>
      </div>

      <div
        className="cart-wrapper"
        style={{ display: isCartMounted ? undefined : 'none' }}
      >
        <Tabs
          size="large"
          defaultActiveKey="1"
          items={[
            {
              label: 'Корзина',
              key: '1',
              children: (
                <CartItemsTab closeCart={() => setIsCartMounted(false)} />
              ),
            },
          ]}
        />
      </div>

      <div className="body">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="about-area" id="about-area">
                  <div className="title">О нас</div>
                  <div className="content">{aboutText}</div>
                </div>
                <div className="products-area" id="products-area">
                  <div className="title">Наши услуги</div>
                  <div className="filters-wrapper">
                    <Form style={{ display: 'flex', gap: '15px' }} form={form}>
                      <Form.Item name={'country'}>
                        <Select
                          placeholder="Страна"
                          allowClear
                          style={{ width: 120 }}
                          options={[
                            { value: 'Турция', label: 'Турция' },
                            { value: 'Египет', label: 'Египет' },
                            { value: 'Грузия', label: 'Грузия' },
                            { value: 'Таиланд', label: 'Таиланд' },
                            { value: 'Вьетнам', label: 'Вьетнам' },
                            { value: 'Израиль', label: 'Израиль' },
                            { value: 'Абхазия', label: 'Абхазия' },

                            { value: 'disabled', label: 'США', disabled: true },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item name={'s'}>
                        <Select
                          placeholder="Питание"
                          allowClear
                          style={{ width: 155 }}
                          options={[
                            { value: 'Турция', label: 'Всё включено' },
                            { value: 'Египет', label: 'Завтрак' },
                            { value: 'Грузия', label: 'Обед' },
                            { value: 'Таиланд', label: 'Завтра, обед, ужин' },
                            { value: 'Вьетнам', label: 'Завтрак, ужин' },
                            { value: 'Израиль', label: 'Завтрак, обед' },
                            { value: 'Абхазия', label: 'Без питания' },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item name={'a'}>
                        <Select
                          placeholder="Тип тура"
                          allowClear
                          style={{ width: 155 }}
                          options={[
                            { value: 'Турция', label: 'Любой' },
                            { value: 'Египет', label: 'Отель' },
                            { value: 'Грузия', label: 'Аппартаменты' },
                            { value: 'Таиланд', label: 'Вилла' },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item name={'stars'}>
                        <Select
                          placeholder="Звёзды"
                          allowClear
                          style={{ width: 120 }}
                          options={[
                            { value: '1', label: '1 ★' },
                            { value: '2', label: '2 ★' },
                            { value: '3', label: '3 ★' },
                            { value: '4', label: '4 ★' },
                            { value: '5', label: '5 ★' },
                          ]}
                        />
                      </Form.Item>
                    </Form>

                    <Button
                      onClick={handleSearchButtonClick}
                      icon={<SearchOutlined />}
                    >
                      Поиск
                    </Button>
                  </div>

                  <Products handleOpenCart={handleOpenCart} />
                </div>
              </>
            }
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<PersonalPage />} />
          <Route path="/ordering" element={<Ordering />} />
        </Routes>
      </div>
      <div className="footer">
        <div className="footer-body">
          <div className="contacts" id="contacts">
            <span className="footer-title">Контакты:</span>
            <div className="contact">+7 923 - Служба поддержки</div>
            <div className="contact">+7 923 - Отдел продаж</div>
          </div>
          <div className="yandex-map-wrapper">
            <div className="footer-title">Мы на карте</div>
            <YMaps>
              <Map
                className="yandex-map"
                options={{
                  autoFitToViewport: 'always',
                  yandexMapDisablePoiInteractivity: true,
                }}
                defaultState={{ center: [55.779474, 49.128126], zoom: 15 }}
              >
                <Placemark
                  geometry={[55.779474, 49.128126]}
                  properties={{
                    iconCaption: 'Мы ждем вас здесь!',
                  }}
                />
              </Map>
            </YMaps>
          </div>
          <div className="social-networks-wrapper">
            <span className="footer-title">Мы в соцсетях:</span>
            <SocialNetworks
              items={[
                { icon: vkIcon, src: 'https://vk.com' },
                { icon: telegramIcon, src: 'https://telegram.org' },
                { icon: whatsappIcon, src: 'https://whatsapp.com' },
              ]}
            />
          </div>
        </div>
        <div className="rights">
          © Все права защищены. ООО &quot;Турфирма&quot;.
        </div>
      </div>
    </>
  );
};

export default App;
