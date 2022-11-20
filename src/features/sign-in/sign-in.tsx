/* eslint-disable @typescript-eslint/no-explicit-any */
import './sign-in.less';
import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import AuthService from '../../api-services/AuthService';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useAppDispatch } from '../../hooks';
import { IAuth, setAuthData } from './signInSlice';

interface IAuthorizationData {
  login: string;
  password: string;
}

export const SignIn = () => {
  const { t } = useTranslation();
  const loginMsg = t('loginMsg');
  const passMsg = t('passMsg');
  const dispatch = useAppDispatch();

  const onFinish = async (values: IAuthorizationData) => {
    try {
      const response = await AuthService.authorization(values.login, values.password);
      localStorage.setItem('token', response.data.token);
      const { userId, login } = jwt_decode(response.data.token) as IAuth;
      dispatch(setAuthData(userId, login));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.response?.data?.message);
      } else {
        console.log(e);
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label={t('login')} name="login" rules={[{ required: true, message: loginMsg }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label={t('password')}
        name="password"
        rules={[{ required: true, message: passMsg }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary">{t('cancel')}</Button>
        <Button type="primary" htmlType="submit" loading>
          {t('submit')}
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};
