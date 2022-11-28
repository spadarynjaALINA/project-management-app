import { Button, Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../hooks';
import { CustomModal } from '../../features/modal/modal';
import { CreateBoardForm } from '../createBoard';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const BoardComponent = (props: {
  props: { boardId: string; title: string; description: string };
}) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch({ type: 'currentBoardId', payload: props.props.boardId });
  };
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { t } = useTranslation();
  const handleCancel = () => {
    setOpen(false);
  };
  const closeConfirm = () => {
    setOpenConfirm(false);
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
  };
  const showConfirm = () => {
    setOpenConfirm(true);
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
        <CustomModal
          key={'2'}
          open={open}
          cancel={handleCancel}
          footer={false}
          title={t('editBoard')}
        >
          <CreateBoardForm
            cancel={handleCancel}
            data={{ title: props.props.title, description: props.props.description }}
          />
        </CustomModal>,
        <Button key={'3'} onClick={showConfirm} type="text">
          <DeleteOutlined />
        </Button>,
        <CustomModal
          key={'4'}
          open={openConfirm}
          cancel={closeConfirm}
          footer={true}
          title={t('deleteBoard')}
        >
          <p>{t('deleteBoardQuestion')}</p>
        </CustomModal>,
      ]}
      style={{ width: 250 }}
    >
      {props.props.description || ''}
    </Card>
  );
};
