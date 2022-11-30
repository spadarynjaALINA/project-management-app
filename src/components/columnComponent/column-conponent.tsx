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
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CustomModal } from '../../features/modal/modal';
import { CreateBoardForm } from '../createBoard';
import ColumnService from '../../api-services/ColumnService';
import axios from 'axios';
import BoardService from '../../api-services/BoardService';
import { selectCurrentBoardId } from '../boardComponent/boardSlice';
import { selectCurrentColumnId } from './columnSlice';

export const ColumnComponent = (props: {
  props: { columnId: string; title: string; order: number };
}) => {
  const dispatch = useAppDispatch();
  const ed = useRef(null as unknown as HTMLDivElement);
  const title = useRef(null as unknown as HTMLDivElement);
  const column = useRef(null as unknown as HTMLDivElement);
  const boardId = useAppSelector(selectCurrentBoardId);
  const columnId = props.props.columnId;
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
    e.preventDefault();
    setEdit(true);
    if (edit === true) {
      console.log(ed.current);
      // if (!ed.current.contains(e.target as Node)) {
      //   console.log('not contain');
      //
      // }
    }
  };
  const editHandle = async () => {
    console.log('edit');

    try {
      await ColumnService.updateColumn(boardId, columnId, columnName, props.props.order);
      const response = await BoardService.getBoards();
      dispatch({ type: 'newBoardList', payload: response.data });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.response?.data?.message);
      } else {
        console.log(e);
      }
    }
    setEdit(false);
  };
  const cancelEditHandle = () => {
    setColumnName(props.props.title);
  };
  const columnTitle = () => {
    return (
      <div className="title-wrap" onClick={handleEdit} ref={title}>
        {edit ? (
          <>
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
            <CheckCircleTwoTone
              twoToneColor="#52c41a"
              className="check-column-icon"
              onClick={editHandle}
              ref={ed}
              style={edit ? { display: 'block' } : { display: 'none' }}
            />
            <CloseCircleTwoTone
              twoToneColor="#eb2f96"
              className="cancel-column-icon"
              onClick={cancelEditHandle}
              style={edit ? { display: 'block' } : { display: 'none' }}
            />
          </>
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
