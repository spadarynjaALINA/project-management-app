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
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CustomModal } from '../../features/modal/modal';
import { CreateBoardForm } from '../createBoard';
import Draggable from 'react-draggable';
import Meta from 'antd/lib/card/Meta';
import { IColumn } from '../../api-services/types/types';
import { selectCurrentColumn } from '../../features/column/columnSlice';
import ColumnService from '../../api-services/ColumnService';
import axios from 'axios';
import { sortColumn } from './utils';
export const ColumnComponent = (props: {
  props: { boardId: string; column: IColumn; columnId: string; title: string };
}) => {
  const dispatch = useAppDispatch();
  const del = useRef(null as unknown as HTMLDivElement);
  const title = useRef(null as unknown as HTMLDivElement);
  const column = useRef(null as unknown as HTMLDivElement);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const currentColumn = useAppSelector(selectCurrentColumn);
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
        console.log(e.response?.data?.message);
      } else {
        console.log(e);
      }
    }
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
