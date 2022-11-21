import React from 'react';
import './modal.less';
import { Button, message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import BoardService from '../../api-services/BoardService';
import { useAppDispatch } from '../../hooks';
export const Modal = (props: { props: { message: string; boardId: string } }) => {
  const dispatch = useAppDispatch();

  const confirm = async (e: React.MouseEvent<HTMLElement> | undefined) => {
    await BoardService.deleteBoard(props.props.boardId);
    const response = await BoardService.getBoards();
    dispatch({ type: 'newBoardList', payload: response.data });

    message.success('Click on Yes');
  };

  const cancel = (e: React.MouseEvent<HTMLElement> | undefined) => {
    console.log(e);
    message.error('Click on No');
  };

  return (
    <Popconfirm
      title={props.props.message}
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
