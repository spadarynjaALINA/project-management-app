import React from 'react';
import './modal.less';
import { Button, message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
export const Modal = (props: { props: string }) => {
  const confirm = (e: React.MouseEvent<HTMLElement> | undefined) => {
    console.log(e);
    message.success('Click on Yes');
  };

  const cancel = (e: React.MouseEvent<HTMLElement> | undefined) => {
    console.log(e);
    message.error('Click on No');
  };
  return (
    <Popconfirm
      title={props.props}
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <Button type="text">
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
};
