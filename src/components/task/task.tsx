import { Avatar, Card } from 'antd';
import { useState } from 'react';
import { ITask } from '../../api-services/types/types';
import { CustomModal } from '../../features/modal/modal';
import { useAppDispatch } from '../../hooks';
import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import { CreateTaskForm } from '../createTask';
import jwt_decode from 'jwt-decode';

export const TaskComponent = (props: { props: ITask; user: string }) => {
  const token = localStorage.getItem('token');
  const { login } = token ? (jwt_decode(token) as { login: string }) : { login: '' };
  const description = props.props.description;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const openConfirmF = () => {
    dispatch({ type: 'currentTask', payload: props.props });
    setOpenConfirm(true);
  };
  const closeConfirm = () => {
    setOpenConfirm(false);
  };
  const showModal = () => {
    setOpen(true);
    dispatch({
      type: 'currentTask',
      payload: props.props,
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Card
      size="small"
      title={props.props.title}
      extra={[
        <EditOutlined key="ed" onClick={showModal} style={{ fontSize: '10px', marginRight: 10 }} />,
        <CustomModal
          key={'ed-confirm'}
          open={open}
          cancel={handleCancel}
          footer={false}
          title={'Edit task'}
        >
          <CreateTaskForm
            cancel={handleCancel}
            data={{
              title: props.props.title,
              description: props.props.description,
              boardId: props.props.boardId as string,
              columnId: props.props.columnId as string,
            }}
          />
        </CustomModal>,
        <DeleteFilled key="del" onClick={openConfirmF} style={{ fontSize: '10px' }} />,
        <CustomModal
          key={'del-confirm'}
          open={openConfirm}
          cancel={closeConfirm}
          footer={true}
          title={'Delete task'}
        >
          <p>Are you really want to delete this task?</p>
        </CustomModal>,
      ]}
      actions={[
        <Avatar key={login} size={32} style={{ left: '35%' }}>
          {props.user}
        </Avatar>,
      ]}
      style={{ width: 230, marginBottom: 10 }}
    >
      <p className="task">{description}</p>
    </Card>
  );
};
