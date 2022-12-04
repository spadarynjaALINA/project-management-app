import React from 'react';
import './not-found.less';
import img from './../../assets/images/not-found.svg';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
export const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="not-found-wrap">
      <div className="not-found-title">
        <h2>{t('notFoundTitle')}</h2>
        <p>{t('notFoundDesc')}</p>
        <NavLink to="/">
          <Button type="primary" style={{ marginRight: 20 }}>
            <ArrowLeftOutlined />
            {t('back')}
          </Button>
        </NavLink>
      </div>
      <img src={img} alt="not-found" />
    </div>
  );
};
