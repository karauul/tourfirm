import React, { useEffect, useRef, useState } from 'react';
import logo from 'assets/logo.svg';
import NavBar from 'components/NavBar';
import Products from 'components/Products';

import 'App.scss';

import { Button, Select, Space, Tabs } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import { fetchProducts } from 'redux/ducks/products_list';
import { useDispatch } from 'react-redux';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const handleSearchButtonClick = () => {
    dispatch(fetchProducts());
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
              title: 'Панель администратора',
              link: '/',
            },
          ]}
        />
      </div>

      <div className="body">
        <div className="products-area" id="products-area">
          <div className="title">Туры:</div>
          <div className="filters-wrapper">
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              options={[
                { value: 'jack', label: 'Турция' },
                { value: 'lucy', label: 'Греция' },
                { value: 'Yiminghe', label: 'Египет' },
                { value: 'disabled', label: 'США', disabled: true },
              ]}
            />

            <Button onClick={handleSearchButtonClick} icon={<SearchOutlined />}>
              Поиск
            </Button>
          </div>

          <Products handleOpenCart={() => null} />
        </div>
      </div>
    </>
  );
};

export default App;
