import React, {useEffect, useMemo} from 'react';
import Sidebar from "../../components/index/Sidebar";
import Topbar from "../../components/index/Topbar";
import {Redirect, Route, Switch} from "react-router-dom";

import NotFound from "../NotFound";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import {connect} from "react-redux";
import routeComponents from "../../router/IndexRouter";

const Index = (props: any) => {
  useEffect(() => {
    props.dispatch({type: 'getUserMenus'})
  }, [])

  const RouteList = useMemo(() => {
    const routes: any = []
    //判断权限中是否存在home页面
    let haveHome = false
    //把页面类型的菜单过滤出来
    let pages = props.menus.filter((item: any) => item.type === 1)
    //动态创建路由
    pages.forEach((item: any) => {
      if (item.path === '/home')
        haveHome = true
      routes.push(<Route
          key={item.path}
          path={item.path}
          component={routeComponents[item.path]}/>)
    })
    //存在home页面则创建重定向为home页面
    if (haveHome)
      routes.push(<Redirect from="/" key="redirect-home" exact to="/home"/>)
    // 不存在home页面，则默认创建列表第一项为重定向目标
    else if (pages[0])
      routes.push(<Redirect key="redirect" from="/" exact to={pages[0].path}/>)
    //配置404页面
    routes.push(<Route path="*" key="404" component={NotFound}/>)
    return routes
  }, [props.menus])
  return (
      <Layout style={{width: '100vw', height: '100vh'}}>
        <Sidebar/>
        <Layout>
          <Topbar/>
          <div style={{overflow:'auto'}}>
            <Content style={{background: '#fff', margin: 15, padding: 15,}}>
              <Switch>
                {RouteList}
              </Switch>
            </Content>
          </div>

        </Layout>
      </Layout>
  );
};

export default connect((state: any) => ({menus: state.system.userMenus}))(Index);