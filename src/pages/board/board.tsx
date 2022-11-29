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
      dispatch({ type: 'newColumnsList', payload: response.data });
      dispatch({ type: 'currentBoardId', payload: id });
    };
    fetchData();
    console.log(columnsList);
  }, [dispatch, columnData, id]);

  const renderColumns = () => {
    console.log(columnsList);
    return columnsList.map((column) => (
      <ColumnComponent
        key={column.id}
        props={{ columnId: column.id, title: column.title }}
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
