import { Button, Card, Input, message } from 'antd';
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
import Draggable from 'react-draggable';
import Meta from 'antd/lib/card/Meta';
import { IColumn } from '../../api-services/types/types';

import ColumnService from '../../api-services/ColumnService';
import axios from 'axios';
import { sortColumn } from './utils';
import { selectCurrentBoardId } from '../boardComponent/boardSlice';
import { selectCurrentColumn } from './columnSlice';
import BoardService from '../../api-services/BoardService';
export const ColumnComponent = (props: {
  props: { boardId: string; column: IColumn; columnId: string; title: string };
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
  const currentColumn = useAppSelector(selectCurrentColumn);
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
      await ColumnService.updateColumn(boardId, columnId, columnName, props.props.column.order);
      const response = await BoardService.getBoards();
      dispatch({ type: 'newBoardList', payload: response.data });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        message.error(t('columnError'));
      } else {
        message.error(t('noNameError'));
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
  const DragStartHandler = (e: React.MouseEvent<HTMLElement>, column: IColumn) => {
    dispatch({ type: 'currentColumn', payload: column });
  };

  // const DragEndHandler = (e: React.MouseEvent<HTMLElement>, column: IColumn) => {
  //   console.log(column, 'end');
  // };

  // const DragLeaveHandler = (e: React.MouseEvent<HTMLElement>, column: IColumn) => {
  //   console.log(column, 'leave');
  // };
  const DropHandler = async (e: React.MouseEvent<HTMLElement>, column: IColumn) => {
    e.preventDefault();
    try {
      await ColumnService.updateColumn(
        props.props.boardId,
        currentColumn.id,
        currentColumn.title,
        column.order
      );
      await ColumnService.updateColumn(
        props.props.boardId,
        column.id,
        column.title,
        currentColumn.order
      );
      const response = await ColumnService.getColumns(props.props.boardId);
      dispatch({ type: 'newColumnsList', payload: response.data.sort(sortColumn) });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        message.error(t('columnError'));
      } else {
        message.error(t('noNameError'));
      }
    }
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
          title={t('deleteColumn')}
        >
          <p>{t('deleteColumnQuestion')}</p>
        </CustomModal>,
      ]}
      style={{ maxHeight: '72vh' }}
      hoverable={true}
      draggable={true}
      onDragStart={(e: React.MouseEvent<HTMLElement>) => DragStartHandler(e, props.props.column)}
      // onDragLeave={(e) => DragLeaveHandler(e, props.props.column)}
      // onDragEnd={(e: React.MouseEvent<HTMLElement>) => DragEndHandler(e, props.props.column)}
      onDragOver={(e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
      }}
      onDrop={(e: React.MouseEvent<HTMLElement>) => DropHandler(e, props.props.column)}
      actions={[
        <Button key={'new'} onClick={showModal} type="primary" ghost>
          {t('newTask')} <PlusOutlined />
          <CustomModal
            key={'new-modal'}
            open={open}
            cancel={handleCancel}
            footer={false}
            title={t('newTask')}
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
