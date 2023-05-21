import { Form } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.scss';
import { ILoginData } from 'api/types/account';
import { login } from 'api/endpoints/account';
import { useDispatch } from 'react-redux';
import { IAccount, setUser } from 'redux/ducks/account';

const Auth: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    const loginData = {
      phone: form.getFieldValue('phone'),
      name: form.getFieldValue('name'),
      password: form.getFieldValue('password'),
    } as ILoginData;

    login(loginData).then(response => {
      if (!response.data.data || !response.data.accessToken) return;

      dispatch(
        setUser({
          token: response.data.accessToken,
          type: response.data.data.isAnonymous ? 'anonymous' : 'authorized',
          name: response.data.data.name,
          phone: response.data.data.phone,
        } as IAccount)
      );
      navigate('/');
    });
  };

  return (
    <div className="authorizationarea">
      <div className="authorizationbox">
        <div className="authorizationtitle">Авторизация</div>

        <Form form={form}>
          <Form.Item name={'phone'} required>
            <div className="inputarea">
              <div className="template">+7</div>
              <input className="inputbox" placeholder="Телефон" />
            </div>
          </Form.Item>
          <Form.Item name={'password'} required>
            <div className="inputarea">
              <input className="inputbox2" placeholder="Пароль" />
            </div>
          </Form.Item>
        </Form>

        <button className="authorizationbutton" onClick={handleLogin}>
          Авторизоваться
        </button>
        <Link to="/registration" className="go_to_registry">
          У вас еще нет аккаунта ? Зарегистрируйтесь !
        </Link>
      </div>
    </div>
  );
};

export default Auth;
