/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Checkbox, Form, Input } from 'antd';
import React, { useRef, useState } from 'react';
import type { DraggableData, DraggableEvent } from 'react-draggable';

import { EditOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectIsBoardModal } from './boardSlice';
import { useTranslation } from 'react-i18next';
import './boardComponent.less';

export const BoardModal: React.FC<{
  props: string;
  data: { title: string; description: string };
}> = (props: { props: string }, data?: { title: string; description: string }) => {
  const open = useAppSelector(selectIsBoardModal);
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const showModal = () => {
    dispatch({ type: 'isBoardModalAction', payload: true });
  };
  const titleMsg = t('titleMsg');
  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    dispatch({ type: 'isBoardModalAction', payload: false });
  };
  const onFinish = (values: any) => {
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch({ type: 'isBoardModalAction', payload: false });
      setConfirmLoading(false);
    }, 2000);
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <>
      {props.props === 'header' && (
        <Button onClick={showModal} type="primary" ghost>
          {t('newBoard')} <PlusOutlined />
        </Button>
      )}
      {props.props === 'main' && (
        <Button onClick={showModal} className="new-board-btn">
          {t('newBoard')}
          <PlusOutlined />
        </Button>
      )}
      {props.props === 'board' && (
        <Button onClick={showModal} type="text">
          <EditOutlined />
        </Button>
      )}
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            {t('newBoard')}
          </div>
        }
        open={open}
        footer={false}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event: DraggableEvent, uiData: DraggableData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Form.Item
            label={t('title')}
            name="title"
            rules={[{ required: true, message: titleMsg }]}
          >
            <Input value={data?.title || ''} />
          </Form.Item>
          <Form.Item label={t('description')} name="description">
            <Input value={data?.description || ''} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className="back" onClick={handleCancel}>
              {t('back')}
            </Button>
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              {t('submit')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
