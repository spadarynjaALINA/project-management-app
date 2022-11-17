import { Card } from 'antd';
import { BoardModal } from './board-modal';
import { Modal } from '../../features/modal/modal';
import { useAppDispatch } from '../../hooks';
export const BoardComponent = (props: { props: { title: string; description: string } }) => {
  return (
    <Card
      title={props.props.title || ''}
      bordered={false}
      extra={[
        <BoardModal
          key="ed"
          props="board"
          data={{ title: props.props.title, description: props.props.description }}
        />,
        <Modal key="del" props=" Are you really want to delete this board?" />,
      ]}
      style={{ width: 250 }}
    >
      {props.props.description || ''}
    </Card>
  );
};
