import React, {useEffect} from 'react';
import SystemRouter from "./router/SystemRouter";
import {connect} from "react-redux";

const App = (props: any) => {

  return (
      <div className={'iconfont'}>
        <SystemRouter/>
        <div className="alert-list">
          {Object.values(props.exchange.components)}
        </div>
      </div>
  );
};

export default connect((state: any) => state)(App);