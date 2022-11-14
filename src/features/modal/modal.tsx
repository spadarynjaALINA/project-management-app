import React from 'react';
import './modal.less';
import { message, Popconfirm } from 'antd';
export const Modal = () => {
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
      title="Are you sure to delete this task?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <a href="#">Delete</a>
    </Popconfirm>
  );
};
