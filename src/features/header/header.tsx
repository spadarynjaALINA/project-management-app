import { Avatar, Button, Divider, Switch } from 'antd';
import Search from 'antd/lib/input/Search';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import i18n from 'i18next';
import './header.less';
import { DownOutlined, ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { PandaIcon } from '../../components/logo';
import { useTranslation } from 'react-i18next';
export const HeaderLayout = () => {
  const { t } = useTranslation();
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
      type: 'divider',
    },
    {
      label: <a href="https://www.aliyun.com">{t('tasks')}</a>,
      key: '3',
    },
  ];

  return (
    <>
      <Header>
        <Button type="primary">
          <ArrowLeftOutlined />
          {t('home')}
        </Button>
        <PandaIcon style={{ fontSize: '32px' }} />
        <Button type="primary" ghost>
          {t('newBoard')} <PlusOutlined />
        </Button>
        <Search placeholder={t('searchTasks')} onSearch={onSearch} style={{ width: 200 }} />
        <div>
          <Button type="text" style={{ color: 'white' }}>
            {t('signUp')}
          </Button>
          <Divider type="vertical" style={{ background: 'white' }} />
          <Button type="text" style={{ color: 'white' }}>
            {t('signIn')}
          </Button>
        </div>

        <Switch checkedChildren="EN" unCheckedChildren="Ру" defaultChecked onChange={onChange} />
        <Dropdown menu={{ items }} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar size={48}>DOMINIKA</Avatar>
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Header>
    </>
  );
};
