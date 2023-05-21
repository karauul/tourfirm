import './PersonalPage.scss';
import { Divider, Form } from 'antd';

import { useNavigate } from 'react-router-dom';
import OrdersTab from 'components/Cart/Components/OrdersTab/OrdersTab';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { IAccount, resetUser, setUser, updateUser } from 'redux/ducks/account';
import { IPutAccountData } from 'api/types/account';
import { update } from 'api/endpoints/account';
import { clearCart } from 'redux/ducks/cart_list';
import { clearOrders } from 'redux/ducks/orders_list';

const PersonalPage: React.FC = () => {
  const accountState = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [updateEnabled, setUpdateEnabled] = useState(false);

  const handleLogout = () => {
    dispatch(resetUser());
    dispatch(clearCart());
    dispatch(clearOrders());
    navigate('/auth');
  };

  const handleChange = () => {
    setUpdateEnabled(true);
  };

  const handleCancel = () => {
    setUpdateEnabled(false);
  };

  const handleUpdate = () => {
    const putData = {
      phone: form.getFieldValue('phone'),
      name: form.getFieldValue('name'),
      password: form.getFieldValue('password'),
    } as IPutAccountData;

    update(putData, accountState.account?.token ?? '').then(response => {
      if (!response.data.data) return;

      dispatch(
        updateUser({
          type: response.data.data.isAnonymous ? 'anonymous' : 'authorized',
          name: response.data.data.name,
          phone: response.data.data.phone,
          token: accountState.account?.token,
        } as IAccount)
      );
    });

    setUpdateEnabled(false);
  };

  return (
    <>
      <div className="personal__area">
        <div className="row__wrapper">
          <div className="personal__title">Личный кабинет</div>
          <button className="logout__button" onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        </div>

        <div className="personal__form">
          <div className="changeinfo">
            <div className="personal__subtitle">Личные данные</div>
            <button className="change__button" onClick={handleChange}>
              Изменить данные
            </button>
          </div>

          <Divider style={{ border: '1px solid #373c42' }} />
          <Form disabled={!updateEnabled} form={form}>
            <div className="input-area-wrapper">
              <Form.Item name={'phone'}>
                <div className="inputarea">
                  Телефон
                  <input
                    disabled={!updateEnabled}
                    className="inputbox"
                    defaultValue={accountState.account?.phone}
                  />
                </div>
              </Form.Item>
              <Form.Item name={'name'}>
                <div className="inputarea">
                  Имя
                  <input
                    disabled={!updateEnabled}
                    className="inputbox"
                    defaultValue={accountState.account?.name}
                  />
                </div>
              </Form.Item>
              <Form.Item name={'password'}>
                <div className="inputarea">
                  Пароль
                  <input
                    disabled={!updateEnabled}
                    type="password"
                    className="inputbox"
                  />
                </div>
              </Form.Item>
            </div>
          </Form>
          {updateEnabled && (
            <div className="confirm__buttons">
              <button onClick={handleCancel} className="cancel__button">
                Отменить
              </button>
              <button onClick={handleUpdate} className="confirm__button">
                Сохранить
              </button>
            </div>
          )}
        </div>

        <div className="personal__form2">
          <div className="personal__subtitle">История заказов</div>
          <Divider style={{ border: '1px solid #373c42' }} />
          <OrdersTab />
        </div>
      </div>
    </>
  );
};

export default PersonalPage;
