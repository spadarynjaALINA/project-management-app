import { Button } from 'antd';
import React from 'react';
import { BoardComponent } from '../../components/boardComponent/boardComponent';
import './main.less';
import { BoardModal } from '../../components/boardComponent/board-modal';

export const Main = () => {
  return (
    <div className="main-wrap">
      Main page
      <BoardModal props="main" data={{ title: '', description: '' }} />
      <BoardComponent
        props={{ title: 'someTitle', description: 'someDescription' }}
      ></BoardComponent>
    </div>
  );
};
