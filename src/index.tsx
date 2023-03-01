import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import MyApp from './App';
import {App} from 'antd'
import './assets/iconfont/iconfont.css'
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from './redux/store'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
      <App>
        <MyApp />
      </App>
    </Provider>

);

reportWebVitals();
