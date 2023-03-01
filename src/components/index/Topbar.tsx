import React, {useState} from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import {Avatar, Dropdown, Layout, Modal, theme} from 'antd';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import logout from "../../utils/logout";

const {Header} = Layout;


const Topbar = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.user || '{}')
  const items = [
    {key: '1', label: '个人信息',},
    {key: '2', label: '修改密码',},
    {
      key: '4', danger: true, label: <div onClick={() => {
        setIsModalOpen(true)
      }}>
        退出登录
      </div>,
    },
  ];

  const {
    token: {colorBgContainer},
  } = theme.useToken();

  return (
      <Header style={{padding: '0 15px', background: colorBgContainer}}>
        <span style={{cursor: 'pointer'}} onClick={() => {
          props.dispatch({type: 'setCollapsed', data: !props.collapsed})
        }}>
          {props.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
        </span>
        <div style={{float: 'right'}}>
          <span style={{marginRight: 10}}>欢迎 {user.username} 登录</span>
          <Dropdown menu={{items}}>
            <Avatar size="large" icon={
              user.head_img ?
                  <img src={process.env.REACT_APP_BASE_URL + user.head_img}/>
                  : <UserOutlined/>
            }/>
          </Dropdown>
        </div>
        <Modal cancelText={'取消'} okText={'确定'} title="提示" open={isModalOpen} onOk={logout}
               onCancel={() => setIsModalOpen(false)}>
          <p>是否确定退出当前账号？</p>
        </Modal>
      </Header>
  );
};

export default connect((state: any) => ({collapsed: state.system.collapsed}))(withRouter(Topbar));