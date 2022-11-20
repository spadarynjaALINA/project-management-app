import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import AuthService from '../../api-services/AuthService';
import { IRegistrationData } from '../sign-up/sign-up';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const SignUp = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const loginMsg = t('loginMsg');
  const passMsg = t('passMsg');
  const passMatchMsg = t('passMatchMsg');
  const nameMsg = t('nameMsg');

  const onFinish = async (values: IRegistrationData) => {
    console.log(values);
  };

  return (
    <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
      <Form.Item
        name="userName"
        label={t('name')}
        rules={[{ required: true, message: nameMsg, whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="login"
        label={t('login')}
        rules={[{ required: true, message: loginMsg, whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label={t('password')}
        rules={[
          {
            required: true,
            message: passMsg,
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary">{t('cancel')}</Button>
        <Button type="primary" htmlType="submit" loading>
          {t('register')}
        </Button>
      </Form.Item>
    </Form>
  );
};
