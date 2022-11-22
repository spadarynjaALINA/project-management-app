import { Button, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CustomModal } from '../../features/modal/modal';
import { CreateBoardForm } from '../createBoard';
import { useState } from 'react';
import { selectCurrentData } from './boardSlice';
export const BoardComponent = (props: {
  props: { boardId: string; title: string; description: string };
}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectCurrentData);
  const handleClick = () => {
    dispatch({ type: 'currentBoardId', payload: props.props.boardId });
  };
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
    dispatch({
      type: 'currentData',
      payload: {
        props: 'board',
        data: { title: props.props.title, description: props.props.description },
      },
    });
    console.log(data, 'props->', props);
  };
  return (
    <Card
      onClick={handleClick}
      title={props.props.title || ''}
      bordered={false}
      extra={[
        <Button key={'1'} onClick={showModal} type="text">
          <EditOutlined />
        </Button>,
        <CustomModal key={'2'} open={open} cancel={handleCancel}>
          <CreateBoardForm
            cancel={handleCancel}
            data={{ title: props.props.title, description: props.props.description }}
          />
        </CustomModal>,
        // <BoardModal
        //   key="ed"
        //   props="board"
        //   data={{ title: props.props.title, description: props.props.description }}
        // />,
      ]}
      style={{ width: 250 }}
    >
      {props.props.description || ''}
    </Card>
  );
};
