import { Card } from 'antd';
import { BoardModal } from './board-modal';
import { Modal } from '../../features/modal/modal';
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
        <Modal
          key="del"
          props={{
            message: ' Are you really want to delete this board?',
            boardId: props.props.boardId,
          }}
        />,
      ]}
      style={{ width: 250 }}
    >
      {props.props.description || ''}
    </Card>
  );
};
