import { Card } from 'antd';
import { useState } from 'react';
import { ITask } from '../../api-services/types/types';
import { CustomModal } from '../../features/modal/modal';
import { useAppDispatch } from '../../hooks';
import { DeleteFilled } from '@ant-design/icons';
export const TaskComponent = (props: { props: ITask }) => {
  const description = props.props.description;
  const [openConfirm, setOpenConfirm] = useState(false);
  const dispatch = useAppDispatch();
  const openConfirmF = () => {
    dispatch({ type: 'currentTask', payload: props.props });
    setOpenConfirm(true);
  };
  const closeConfirm = () => {
    setOpenConfirm(false);
  };
  return (
    <Card
      size="small"
      title={props.props.title}
      extra={[
        <DeleteFilled key="ed" onClick={openConfirmF} style={{ fontSize: '10px' }} />,
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
      style={{ width: 230, marginBottom: 10 }}
    >
      <p className="task">{description}</p>
    </Card>
  );
};
