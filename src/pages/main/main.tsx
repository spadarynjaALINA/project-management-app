import React, { useEffect } from 'react';
import { BoardComponent } from '../../components/boardComponent/boardComponent';
import './main.less';
import { BoardModal } from '../../components/boardComponent/board-modal';
import BoardService from '../../api-services/BoardService';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectBoardList, selectBoardModalData } from '../../components/boardComponent/boardSlice';

export const Main = () => {
  const dispatch = useAppDispatch();
  const boardsList = useAppSelector(selectBoardList);
  const boardData = useAppSelector(selectBoardModalData);

  useEffect(() => {
    const fetchData = async () => {
      const response = await BoardService.getBoards();
      dispatch({ type: 'newBoardList', payload: response.data });
    };
    fetchData();
  }, [dispatch, boardData]);

  const renderBoards = () => {
    return boardsList.map((board) => (
      <BoardComponent
        key={board.id}
        props={{ boardId: board.id, title: board.title, description: board.description }}
      ></BoardComponent>
    ));
  };

  return (
    <div className="main-wrap">
      Main page
      <BoardModal props="main" data={{ title: '', description: '' }} />
      {renderBoards()}
    </div>
  );
};
