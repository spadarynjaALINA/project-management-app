import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BoardService from '../api-services/BoardService';
import { IBoard } from '../api-services/types/types';
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectCurrentBoardId, selectCurrentData } from './boardComponent/boardSlice';

export const CreateBoardForm = (props: {
  cancel: () => void;
  data: { title: string; description: string };
}) => {
  const boardId = useAppSelector(selectCurrentBoardId);
  const data = useAppSelector(selectCurrentData);
  const dispatch = useAppDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { t } = useTranslation();
  const titleMsg = t('titleMsg');
  const onFinish = async (values: IBoard) => {
    setConfirmLoading(true);
    try {
      if (!!Object.values(data.data).filter((elem) => elem !== '').length) {
        const response = await BoardService.updateBoard(boardId, values.title, values.description);
        dispatch({ type: 'boardModalDataAction', payload: response.data });
      } else {
        const response = await BoardService.createBoard(values.title, values.description);
        dispatch({ type: 'boardModalDataAction', payload: response.data });
      }
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
  const onFinishFailed = (errorInfo: ValidateErrorEntity<IBoard>) => {
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
      fields={[
        { name: ['title'], value: props.data.title },
        { name: ['description'], value: props.data.description },
      ]}
    >
      <Form.Item label={t('title')} name="title" rules={[{ required: true, message: titleMsg }]}>
        <Input />
      </Form.Item>
      <Form.Item label={t('description')} name="description">
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
