import { Button, Card, Input } from 'antd';
import {
  CheckCircleTwoTone,
  PlusOutlined,
  DeleteOutlined,
  CloseCircleTwoTone,
} from '@ant-design/icons';
import './column-component.less';
import { TaskComponent } from '../task/task';
import { t } from 'i18next';
import { SetStateAction, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CustomModal } from '../../features/modal/modal';
import Draggable from 'react-draggable';
import { IColumn, ITask } from '../../api-services/types/types';
import ColumnService from '../../api-services/ColumnService';
import axios from 'axios';
import { sortColumn } from './utils';
import { selectCurrentBoardId } from '../boardComponent/boardSlice';
import { selectColumnsList, selectCurrentColumn } from './columnSlice';
import BoardService from '../../api-services/BoardService';
import { CreateTaskForm } from '../createTask';

export const ColumnComponent = (props: {
  props: { boardId: string; column: IColumn; columnId: string; title: string };
}) => {
  const dispatch = useAppDispatch();
  const ed = useRef(null as unknown as HTMLDivElement);
  const title = useRef(null as unknown as HTMLDivElement);
  const column = useRef(null as unknown as HTMLDivElement);
  const boardId = useAppSelector(selectCurrentBoardId);
  const columnId = props.props.columnId;
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [columnName, setColumnName] = useState(props.props.title);
  const [openConfirm, setOpenConfirm] = useState(false);
  const currentColumn = useAppSelector(selectCurrentColumn);
  let tasksList = [] as ITask[] | undefined;
  useAppSelector(selectColumnsList).map((item) => {
    if (item.id === columnId) tasksList = item.tasks;
  });

  const renderTasks = () => {
    if (tasksList) {
      return tasksList.map((task) => {
        return <TaskComponent key={task.id} props={task}></TaskComponent>;
      });
    } else {
      return 'not et';
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
  };
  const closeConfirm = () => {
    setOpenConfirm(false);
  };
  const openConfirmF = () => {
    dispatch({ type: 'currentColumnId', payload: props.props.columnId });
    setOpenConfirm(true);
  };
  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setColumnName(e.target.value);
  };
  const handleEdit = () => {
    setEdit(true);
  };
  const editHandle = async () => {
    console.log('edit');

    try {
      await ColumnService.updateColumn(boardId, columnId, columnName, props.props.column.order);
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
  const showModalTask = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setOpenModal(true);
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
      draggable={true}
      onDragStart={(e: React.MouseEvent<HTMLElement>) => DragStartHandler(e, props.props.column)}
      // onDragLeave={(e) => DragLeaveHandler(e, props.props.column)}
      // onDragEnd={(e: React.MouseEvent<HTMLElement>) => DragEndHandler(e, props.props.column)}
      onDragOver={(e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
      }}
      onDrop={(e: React.MouseEvent<HTMLElement>) => DropHandler(e, props.props.column)}
      actions={[
        <>
          <Button key={'new-task'} type="primary" ghost onClick={showModalTask}>
            {t('newTask')} <PlusOutlined />
          </Button>
          <CustomModal
            key={'new-modal'}
            open={openModal}
            cancel={handleCancel}
            footer={false}
            title={'New task'}
          >
            <CreateTaskForm
              cancel={handleCancel}
              data={{ title: '', description: '', boardId, columnId }}
            />
          </CustomModal>
        </>,
      ]}
    >
      <div className="tasks-wrap">{renderTasks()}</div>
    </Card>
  );
};
