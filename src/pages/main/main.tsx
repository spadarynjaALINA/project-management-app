import { Button } from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { BoardComponent } from '../../components/boardComponent/boardComponent';
import './main.less';

export const Main = () => {
  return (
    <div className="main-wrap">
      Main page
      <Button className="new-board-btn">
        New board <PlusOutlined />
      </Button>
      <BoardComponent></BoardComponent>
    </div>
  );
};
