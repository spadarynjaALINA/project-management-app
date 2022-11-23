import { Button, Card } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import './column-component.less';
import { Task } from '../task/task';
import { t } from 'i18next';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
export const ColumnComponent = (props: { props: { columnId: string; title: string } }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleCancel = () => {
    setOpen(false);
  };
  const closeConfirm = () => {
    setOpenConfirm(false);
  };

  const showModal = () => {
    setOpen(true);
    // dispatch({
    //   type: 'currentData',
    //   payload: {
    //     props: 'task',
    //     data: { title: props.props.title, description: props.props.description },
    //   },
    // });
  };
  return (
    <Card
      className="column"
      title={props.props.title}
      bordered={false}
      extra={[<EditOutlined key="ed" />]}
      style={{ maxHeight: '70vh' }}
      actions={[
        <Button key={'new'} onClick={showModal} type="primary" ghost>
          {t('newTask')} <PlusOutlined />
        </Button>,
      ]}
    >
      <div className="tasks-wrap">
        <Task description={'task1'} />
        <Task description={'task2'} />
        <Task description={'task1'} />
        <Task description={'task2'} />
        <Task description={'task1'} />
        <Task description={'task2'} />
        <Task description={'task1'} />
        <Task description={'task2'} />
        <Task description={'task1'} />
        <Task description={'task2'} />
        <Task description={'task1'} />
        <Task description={'task2'} />
      </div>
    </Card>
  );
};
