import { Button, Card, Input } from 'antd';
import {
  CheckCircleTwoTone,
  PlusOutlined,
  DeleteOutlined,
  CloseCircleTwoTone,
} from '@ant-design/icons';
import './column-component.less';
import { Task } from '../task/task';
import { t } from 'i18next';
import { SetStateAction, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { CustomModal } from '../../features/modal/modal';
import { CreateBoardForm } from '../createBoard';

export const ColumnComponent = (props: { props: { columnId: string; title: string } }) => {
  const dispatch = useAppDispatch();
  const del = useRef(null as unknown as HTMLDivElement);
  const title = useRef(null as unknown as HTMLDivElement);
  const column = useRef(null as unknown as HTMLDivElement);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [columnName, setColumnName] = useState(props.props.title);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };
  const closeConfirm = () => {
    setOpenConfirm(false);
  };
  const openConfirmF = () => {
    dispatch({ type: 'currentColumnId', payload: props.props.columnId });
    console.log(props.props);
    setOpenConfirm(true);
  };
  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setColumnName(e.target.value);
  };
  const handleEdit = (e: React.SyntheticEvent) => {
    setEdit(true);
    // if (!title.current.contains(e.target as Node)) setEdit(false);
  };
  const columnTitle = () => {
    return (
      <div onClick={handleEdit} ref={title}>
        {edit ? (
          <div className="title-wrap">
            <Input
              onChange={handleChange}
              autoFocus={true}
              onBlur={() => {
                setEdit(false);
              }}
              type={'text'}
              value={columnName}
              className="column-title"
            />
            <CheckCircleTwoTone twoToneColor="#52c41a" className="check-column-icon" />
            <CloseCircleTwoTone twoToneColor="#eb2f96" className="cancel-column-icon" />
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
      // onClick={handleEdit}
      className="column"
      title={columnTitle()}
      bordered={false}
      extra={[
        <DeleteOutlined key="ed" onClick={openConfirmF} />,
        <CustomModal
          key={'del-confirm'}
          open={openConfirm}
          cancel={closeConfirm}
          footer={true}
          title={'Delete column'}
        >
          <p>Are you really want to delete this column?</p>
        </CustomModal>,
      ]}
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
          </CustomModal>
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
