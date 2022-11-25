import { Avatar, Button, Divider, Switch } from 'antd';
import Search from 'antd/lib/input/Search';
import { Header } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import i18n from 'i18next';
import './header.less';
import { DownOutlined, ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { PandaIcon } from '../../components/logo';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks';
import UserService from '../../api-services/UserService';
import jwt_decode from 'jwt-decode';
import { CreateBoardForm } from '../../components/createBoard';
import { CustomModal } from '../modal/modal';
import { NavLink } from 'react-router-dom';

export const HeaderLayout = () => {
  const { t } = useTranslation();

  const userId = useAppSelector((state) => state.signIn.userId);
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState('');
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
    dispatch({
      type: 'currentData',
      payload: { props: 'board', data: { title: '', description: '' } },
    });
  };

  const onSearch = (value: string) => console.log(value);

  const onChange = (checked: boolean) =>
    checked ? i18n.changeLanguage('en') : i18n.changeLanguage('ru');

  const items: MenuProps['items'] = [
    {
      label: <a href="https://www.antgroup.com">{t('signOut')}</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">{t('profile')}</a>,
      key: '1',
    },
    {
      label: <a href="https://www.aliyun.com">{t('tasks')}</a>,
      key: '3',
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchData = async () => {
        const { userId } = jwt_decode(token) as { userId: string };
        const response = await UserService.getUser(userId);
        setUserName(response.data.name);
      };
      fetchData();
    }
  }, [userId]);

  const isAuth = localStorage.getItem('token');

  return (
    <>
      <Header>
        <NavLink to="/">
          <Button type="primary">
            <ArrowLeftOutlined />
            {t('home')}
          </Button>
        </NavLink>
        <PandaIcon style={{ fontSize: '32px' }} />

        {isAuth && (
          <>
            <Button onClick={showModal} type="primary" ghost>
              {t('newBoard')} <PlusOutlined />
            </Button>
            <CustomModal open={open} cancel={handleCancel} footer={false} title={'New Board'}>
              <CreateBoardForm cancel={handleCancel} data={{ title: '', description: '' }} />
            </CustomModal>
          </>
        )}

        {isAuth && (
          <Search placeholder={t('searchTasks')} onSearch={onSearch} style={{ width: 200 }} />
        )}
        {isAuth ? (
          <NavLink to="/boards">
            <Button type="text" style={{ color: 'white' }}>
              {t('mainPage')}
            </Button>
          </NavLink>
        ) : (
          <div>
            <NavLink to="/signup">
              <Button type="text" style={{ color: 'white' }}>
                {t('signUp')}
              </Button>
            </NavLink>
            <Divider type="vertical" style={{ background: 'white' }} />
            <NavLink to="/signin">
              <Button type="text" style={{ color: 'white' }}>
                {t('signIn')}
              </Button>
            </NavLink>
          </div>
        )}
        <Switch checkedChildren="EN" unCheckedChildren="Ру" defaultChecked onChange={onChange} />
        {isAuth && (
          <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar size={48}>{userName}</Avatar>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        )}
      </Header>
    </>
  );
};
