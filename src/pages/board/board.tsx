import React from 'react';
import { ColumnComponent } from '../../components/columnComponent/column-conponent';
import './board.less';

export const Board = () => {
  return (
    <div className="board-wrap">
      Board page
      <ColumnComponent></ColumnComponent>
    </div>
  );
};
