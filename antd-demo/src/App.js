import logo from './logo.svg';
import './App.less';

import React from 'react';
import { Button } from 'antd';

function AppHome() {
  return (
    <div className="App">
      <header className="App-header">
        <Button type='primary'>自定义按钮</Button>
        <a href='#/login'>进入登录页面</a>
        <a href='#/demo'>进入demo页面</a>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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

export default AppHome;
