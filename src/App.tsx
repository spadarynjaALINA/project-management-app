import React from 'react';
import logo from './logo.svg';
import { useTranslation } from "react-i18next";
import "./translations/i18n";
import './App.less'
import i18n from "i18next";
import { Button } from 'antd';

function App() {
  const { t } = useTranslation();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{t('welcome')}

        </p>
        <Button  type="primary" onClick={()=>{i18n.changeLanguage("ru")}}>change ru</Button>
        <Button  type="primary" onClick={()=>{i18n.changeLanguage("en")}}>change en</Button>
        <Button type='text'></Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
