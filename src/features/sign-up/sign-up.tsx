import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import AuthService from '../../api-services/AuthService';

interface IRegistrationData {
  userName: string;
  login: string;
  password: string;
  confirm?: string;
}

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
import './sign-up.less';

export const SignUp = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const loginMsg = t('loginMsg');
  const passMsg = t('passMsg');
  const confirmPassMsg = t('confirmPassMsg');
  const passMatchMsg = t('passMatchMsg');
  const nameMsg = t('nameMsg');

  const onFinish = async (values: IRegistrationData) => {
    const { userName, login, password } = values;
    try {
      await AuthService.registration(userName, login, password);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.response?.data?.message);
      } else {
        console.log(e);
      }
    }
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

      <Form.Item
        name="confirm"
        label={t('confirmPassword')}
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: confirmPassMsg,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(passMatchMsg));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          {t('register')}
        </Button>
        <Button type="primary" loading>
          {t('registering')}
        </Button>
      </Form.Item>
    </Form>
  );
};
