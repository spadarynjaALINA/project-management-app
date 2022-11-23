import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import ColumnService from '../api-services/ColumnService';
import { IColumn } from '../api-services/types/types';
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectCurrentBoardId } from './boardComponent/boardSlice';

export const CreateColumnForm = (props: { cancel: () => void; data: { title: string } }) => {
  const location = useLocation();
  const boardId = location.pathname.slice(9);
  const dispatch = useAppDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { t } = useTranslation();
  const titleMsg = t('titleMsg');
  const onFinish = async (values: IColumn) => {
    setConfirmLoading(true);
    try {
      const response = await ColumnService.createColumn(boardId, values.title);
      dispatch({ type: 'columnModalDataAction', payload: response.data });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.response?.data?.message);
      } else {
        console.log(e);
      }
    } finally {
      setConfirmLoading(false);
      props.cancel();
    }
  };
  const onFinishFailed = (errorInfo: ValidateErrorEntity<IColumn>) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
      fields={[{ name: ['title'], value: props.data.title }]}
    >
      <Form.Item label={t('title')} name="title" rules={[{ required: true, message: titleMsg }]}>
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button className="back" onClick={props.cancel}>
          {t('back')}
        </Button>
        <Button type="primary" htmlType="submit" loading={confirmLoading}>
          {t('submit')}
        </Button>
      </Form.Item>
    </Form>
  );
};
