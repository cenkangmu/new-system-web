import React from 'react';
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import Login from "../views/login";
import Index from "../views/index";

const SystemRouter = (props:any) => {
  return (
      <div>
        <HashRouter>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/" render={()=>{
              if(localStorage.token)
                return <Index/>
              return <Redirect to="/login"/>
            }}></Route>
          </Switch>
        </HashRouter>
      </div>
  );
};

export default SystemRouter;