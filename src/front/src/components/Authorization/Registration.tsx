import { Form } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.scss';
import Password from 'antd/es/input/Password';
import { ISignUpData } from 'api/types/account';
import { signUp } from 'api/endpoints/account';
import { useDispatch } from 'react-redux';
import { IAccount, setUser } from 'redux/ducks/account';

const Registration: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = () => {
    const signUpData = {
      phone: form.getFieldValue('phone'),
      name: form.getFieldValue('name'),
      password: form.getFieldValue('password'),
    } as ISignUpData;

    signUp(signUpData).then(response => {
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

  const handleSubmit = async () => {
    // const newUser = {
    //   phone: form.getFieldValue('phone'),
    //   password: form.getFieldValue('password'),
    // } as IUserBody;

    // const user = await login(newUser);

    // store.dispatch(saveUser(user));
    navigate('/');
  };

  return (
    <div className="authorizationarea">
      <div className="authorizationbox">
        <div className="authorizationtitle">Регистрация</div>

        <Form form={form}>
          <Form.Item name={'phone'}>
            <div className="inputarea">
              <div className="template">+7</div>
              <input className="inputbox" placeholder="Телефон" />
            </div>
          </Form.Item>
          <Form.Item name={'name'}>
            <div className="inputarea">
              <input className="inputbox2" placeholder="Имя" />
            </div>
          </Form.Item>
          <Form.Item name={'password'}>
            <div className="inputarea">
              <input className="inputbox2" placeholder="Пароль" />
            </div>
          </Form.Item>
        </Form>

        <button className="authorizationbutton" onClick={handleSignUp}>
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
};

export default Registration;
