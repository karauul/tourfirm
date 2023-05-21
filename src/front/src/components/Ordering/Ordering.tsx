import './Ordering.scss';
import { Button, Divider, Form, Tooltip, notification } from 'antd';

import { useNavigate } from 'react-router-dom';
import OrdersTab from 'components/Cart/Components/OrdersTab/OrdersTab';
import { useEffect, useState } from 'react';
import CartList from 'components/Cart/Components/CartList/CartList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { clearCart, removeProduct } from 'redux/ducks/cart_list';
import { IOrder, addOrder } from 'redux/ducks/orders_list';

const Ordering: React.FC = () => {
  //   const userState = useSelector((state: RootState) => state.user);
  //   const dispatch = useDispatch();

  const cartState = useSelector((state: RootState) => state.cartList);

  const [api, contextHolder] = notification.useNotification();
  {
    contextHolder;
  }

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch(logout());
    navigate('/authorization');
  };

  const handleChange = () => {
    setButtons(true);
  };

  const handleCancel = () => {
    setButtons(false);
  };

  const handleConfirm = () => {
    const orderData = {
      products: cartState.items,
      totalPrice: cartState.items[0].price,
      date: new Date(),
      surname: form.getFieldValue('lastname'),
      name: form.getFieldValue('firstname'),
      birthday: form.getFieldValue('birth'),
      grazhdanstvo: form.getFieldValue('nationality'),
      serialNumber: form.getFieldValue('seria'),
      number: form.getFieldValue('nomer'),
      passportStartDate: form.getFieldValue('Data vidachi'),
      passportEndDate: form.getFieldValue('Dlitelnost'),
      passportAuthor: form.getFieldValue('KemVidan'),
    } as IOrder;
    if (cartState.items[0].availableCount == 0) {
      api.error({
        message: 'Все путевки раскуплены.',
        description: 'Этот тур больше недоступен к заказу.',
        placement: 'bottomRight',
      });
      return;
    }
    dispatch(addOrder(orderData));
    dispatch(clearCart());
    navigate('/');
  };

  const [buttons, setButtons] = useState(false);

  return (
    <>
      {contextHolder}
      <div className="podborka__title">Данные о туре</div>
      <div className="podborka__subtitle"></div>
      <Divider style={{ border: '1px solid #373c42' }} />

      <div className="podborka_wrapper">
        <CartList
          cartItems={cartState.items}
          handleRemoveItemFromCart={(cartItemId: number) =>
            dispatch(removeProduct(cartItemId))
          }
        />
      </div>

      <div className="ordering__area">
        <div className="ordering__title">Оформление тура</div>
        <Form className="row__wrapper">
          <div className="ordering__form">
            <div className="ordering__subtitle">Взрослый турист</div>
            <Divider style={{ border: '1px solid #373c42' }} />
            <div className="input-area-wrapper">
              <div className="column">
                <Form.Item name={'lastname'}>
                  <div className="inputarea">
                    Фамилия (ЛАТ)
                    <input className="inputbox" placeholder="" />
                  </div>
                </Form.Item>
                <Form.Item name={'firstname'}>
                  <div className="inputarea">
                    Имя (ЛАТ)
                    <input className="inputbox" placeholder="" />
                  </div>
                </Form.Item>
              </div>
              <div className="column">
                <Form.Item name={'birth'}>
                  <div className="inputarea">
                    Дата рождения
                    <input className="inputbox" placeholder="" />
                  </div>
                </Form.Item>
                <Form.Item name={'nationality'}>
                  <div className="inputarea">
                    Гражданство
                    <input className="inputbox" placeholder="" />
                  </div>
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="ordering__form">
            <div className="ordering__subtitle">Заграничный паспорт</div>
            <Divider style={{ border: '1px solid #373c42' }} />
            <div className="passport__area">
              <div className="passportinfo">
                <Form.Item name={'seria'}>
                  <div className="seriainputarea">
                    Серия
                    <input className="seriainputbox" placeholder="" />
                  </div>
                </Form.Item>
                <Form.Item name={'nomer'}>
                  <div className="inputarea">
                    Номер
                    <input className="inputbox" placeholder="" />
                  </div>
                </Form.Item>

                <Form.Item name={'Data vidachi'}>
                  <div className="inputarea">
                    Дата выдачи
                    <input className="inputbox" placeholder="" />
                  </div>
                </Form.Item>
                <Form.Item name={'Dlitelnost'}>
                  <div className="inputarea">
                    Действует до
                    <input className="inputbox" placeholder="" />
                  </div>
                </Form.Item>
              </div>
              <Form.Item name={'KemVidan'}>
                <div className="giveinputarea">
                  Кем выдан
                  <input className="giveinputbox" placeholder="" />
                </div>
              </Form.Item>
            </div>
          </div>
        </Form>
        <div className="button-wrapper">
          <Tooltip
            overlayClassName={
              cartState.items.length === 1 ? 'invisible' : undefined
            }
            popupVisible={cartState.items.length === 1}
            title="Для оформления заказа необходимо выбрать один тур"
          >
            <>
              <Button
                disabled={cartState.items.length != 1}
                onClick={handleConfirm}
                type="primary"
                size="large"
              >
                Оформить
              </Button>
            </>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default Ordering;
