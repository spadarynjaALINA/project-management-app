import { Card } from 'antd';
import { BoardModal } from './board-modal';

import { useAppDispatch } from '../../hooks';
export const BoardComponent = (props: {
  props: { boardId: string; title: string; description: string };
}) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch({ type: 'currentBoardId', payload: props.props.boardId });
  };

  return (
    <Card
      onClick={handleClick}
      title={props.props.title || ''}
      bordered={false}
      extra={[
        <BoardModal
          key="ed"
          props="board"
          data={{ title: props.props.title, description: props.props.description }}
        />,
      ]}
      style={{ width: 250 }}
    >
      {props.props.description || ''}
    </Card>
  );
};
