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
export const HeaderLayout = () => {
  const onSearch = (value: string) => console.log(value);
  const onChange = (checked: boolean) =>
    checked ? i18n.changeLanguage('en') : i18n.changeLanguage('ru');
  const items: MenuProps['items'] = [
    {
      label: <a href="https://www.antgroup.com">Sign out</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">Profile</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <a href="https://www.aliyun.com">Tasks</a>,
      key: '3',
    },
  ];

  return (
    <>
      <Header>
        <Button type="primary">
          <ArrowLeftOutlined />
          Home
        </Button>
        <PandaIcon style={{ fontSize: '32px' }} />
        <Button type="primary" ghost>
          New board <PlusOutlined />
        </Button>
        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
        <div>
          <Button type="text" style={{ color: 'white' }}>
            Sign up
          </Button>
          <Divider type="vertical" style={{ background: 'white' }} />
          <Button type="text" style={{ color: 'white' }}>
            Sign in
          </Button>
        </div>

        <Switch checkedChildren="EN" unCheckedChildren="RU" defaultChecked onChange={onChange} />
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
