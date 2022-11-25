import { Button, Card } from 'antd';
import {
  CheckCircleTwoTone,
  PlusOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import './column-component.less';
import { Task } from '../task/task';
import { t } from 'i18next';
import { useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { CustomModal } from '../../features/modal/modal';
import { CreateBoardForm } from '../createBoard';
import Draggable from 'react-draggable';
import Meta from 'antd/lib/card/Meta';
export const ColumnComponent = (props: { props: { columnId: string; title: string } }) => {
  const dispatch = useAppDispatch();
  const del = useRef(null as unknown as HTMLDivElement);
  const title = useRef(null as unknown as HTMLDivElement);
  const column = useRef(null as unknown as HTMLDivElement);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleCancel = () => {
    setOpen(false);
  };
  const closeConfirm = () => {
    setOpenConfirm(false);
  };
  const handleEdit = (e: React.SyntheticEvent) => {
    if (!title.current.contains(e.target as Node)) setEdit(false);
  };
  const columnTitle = () => {
    return (
      <div onClick={() => setEdit(true)} ref={title}>
        {edit ? (
          <div>
            <input type={'text'} value={props.props.title} className="column-title" />
            <CheckCircleTwoTone twoToneColor="#52c41a" />
            <CloseCircleOutlined twoToneColor="#eb2f96" />
          </div>
        ) : (
          <p>{props.props.title}</p>
        )}
      </div>
    );
  };
  const showModal = () => {
    setOpen(true);
  };

  return (
    <Card
      ref={column}
      onClick={handleEdit}
      className="column"
      title={columnTitle()}
      bordered={false}
      extra={[<DeleteOutlined key="ed" />]}
      style={{ maxHeight: '72vh' }}
      hoverable={true}
      actions={[
        <Button key={'new'} onClick={showModal} type="primary" ghost>
          {t('newTask')} <PlusOutlined />
          <CustomModal
            key={'new-modal'}
            open={open}
            cancel={handleCancel}
            footer={false}
            title={'New Task'}
          >
            <CreateBoardForm cancel={handleCancel} data={{ title: '', description: '' }} />
          </CustomModal>{' '}
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
