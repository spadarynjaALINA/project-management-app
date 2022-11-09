import React from 'react';
import logo from './logo.svg';
import { useTranslation } from "react-i18next";
import "./translations/i18n";
import './App.css';
import i18n from "i18next";

function App() {
  const { t } = useTranslation();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{t('welcome')}

        </p>
        <button onClick={()=>{i18n.changeLanguage("ru")}}>change ru</button>
        <button onClick={()=>{i18n.changeLanguage("en")}}>change en</button>
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
