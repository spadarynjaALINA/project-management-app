/* eslint-disable @typescript-eslint/no-explicit-any */
import './sign-in.less';
import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

export const SignIn = () => {
  const { t } = useTranslation();
  const loginMsg = t('loginMsg');
  const passMsg = t('passMsg');
  const onFinish = (values: any) => {
    console.log('Success:', values);
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
        <Button type="primary" htmlType="submit">
          {t('submit')}
        </Button>
        <Button type="primary" loading>
          {t('submitting')}
        </Button>
      </Form.Item>
    </Form>
  );
};
