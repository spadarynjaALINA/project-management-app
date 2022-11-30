import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BoardService from '../../api-services/BoardService';
import { BoardComponent } from '../../components/boardComponent/boardComponent';
import {
  selectBoardList,
  selectBoardModalData,
  selectCurrentBoardId,
} from '../../components/boardComponent/boardSlice';
import { ColumnComponent } from '../../components/columnComponent/column-conponent';
import {
  selectColumnModalData,
  selectColumnsList,
} from '../../components/columnComponent/columnSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { PlusOutlined } from '@ant-design/icons';
import './board.less';
import { CustomModal } from '../../features/modal/modal';
import { CreateBoardForm } from '../../components/createBoard';
import { CreateColumnForm } from '../../components/createColumn';
import ColumnService from '../../api-services/ColumnService';
import { useLocation } from 'react-router-dom';
import { sortColumn } from '../../components/columnComponent/utils';
import TaskService from '../../api-services/TaskService';
import { IColumn } from '../../api-services/types/types';

export const Board = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const id = location.pathname.slice(9);
  const columnsList = useAppSelector(selectColumnsList);
  const columnData = useAppSelector(selectColumnModalData);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await ColumnService.getColumns(id);
      const columns = response.data;
      const promises = columns.map(async (column) => {
        return await TaskService.getTasks(id, column.id).then((data) => {
          const newObj = { ...column, tasks: data.data };
          return newObj;
        });
      });
      Promise.all(promises).then((res) =>
        dispatch({ type: 'newColumnsList', payload: res.sort(sortColumn) })
      );
    };
    fetchData();
  }, [dispatch, columnData, id]);

  const renderColumns = () => {
    return columnsList.map((column) => (
      <ColumnComponent
        key={column.id}
        props={{ boardId: id, column, columnId: column.id, title: column.title }}
      ></ColumnComponent>
    ));
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const showModal = () => {
    setOpen(true);
    dispatch({
      type: 'columnData',
      payload: { props: 'column', data: { title: '' } },
    });
  };
  return (
    <div className="columns-wrap">
      <Button onClick={showModal} className="new-column-btn">
        {t('newColumn')}
        <PlusOutlined />
      </Button>
      <div className="inner-wrap">
        <CustomModal open={open} cancel={handleCancel} footer={false} title={'New Column'}>
          <CreateColumnForm cancel={handleCancel} data={{ title: '' }} />
        </CustomModal>
        {renderColumns()}
      </div>
    </div>
  );
};
