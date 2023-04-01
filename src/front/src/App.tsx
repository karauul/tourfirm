import React, { useState } from 'react';
import logo from 'assets/logo.svg';
import Cart from 'components/Cart';
import NavBar from 'components/NavBar';
import Products from 'components/Products';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import SocialNetworks from 'components/social_networks/SocialNetworks';
import vkIcon from 'assets/vk.svg';
import telegramIcon from 'assets/telegram.svg';
import whatsappIcon from 'assets/whatsapp.svg';
import 'App.scss';

const aboutText = `Туроператор "Одиссея"- крупная и надежная компания в сфере туризма.
  На рынке туроператорской деятельности уже более 24 лет.
  Лидер продаж автобусных туров по России на протяжении 20 лет.`;

const App: React.FC = () => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

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
          <Cart
            isCartModalOpen={isCartModalOpen}
            handleOpenCart={handleOpenCart}
            handleCloseCart={handleCloseCart}
          />
        </div>
      </div>
      <div className="body">
        <div className="about-area" id="about-area">
          <div className="title">О нас</div>
          <div className="content">{aboutText}</div>
        </div>
        <div className="products-area" id="products-area">
          <div className="title">Наши услуги</div>
          <Products handleOpenCart={handleOpenCart} />
        </div>
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
