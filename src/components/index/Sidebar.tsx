import React, {useEffect, useMemo, useState} from 'react';
import {useHistory, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Layout, Menu} from 'antd';

import './index.css'
import {
  AppstoreOutlined,
} from '@ant-design/icons';

function resetMenus(list: any, id: (number | null) = null) {
  let arr: any[] = []
  list.forEach((item: any, index: number) => {
    if (item.p_id === id && item.type !== 2) {
      arr.push({
        key: item.path,
        icon: <AppstoreOutlined/>,
        label: item.label,
        p_id: item.p_id,
        id: item.id
      })
    }
  })
  if (arr.length) {
    arr.forEach(i => {
      const children = resetMenus(list, i.id)
      i.children = children.length && children
    })
  }
  return arr
}

const Sidebar = (props: any) => {
  const [menuTree, setMenuTree] = useState<any>([])
  const selectedKey = props.location.pathname

  const history = useHistory()
  useMemo(() => {
    setMenuTree(resetMenus(props.menus))

  }, [props.menus])
  return (
      <Layout.Sider trigger={null} collapsible collapsed={props.collapsed}>
        <div className="sidebar-logo" title={'新闻管理发布平台'}>
          {props.collapsed?'新闻':'新闻管理发布平台'}
        </div>
        <div style={{overflow:'auto',height:'calc(100% - 60px)'}}>
          <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[selectedKey]}
              defaultOpenKeys={['/' + selectedKey.split('/')[1]]}
              items={menuTree}
              onClick={(e) => {
                history.push(e.key)
              }}
          />
        </div>

      </Layout.Sider>
  );
};

export default connect((state: any) => ({
  menus: state.system.menus,
  collapsed: state.system.collapsed
}))(withRouter(Sidebar));