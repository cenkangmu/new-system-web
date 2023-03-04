import {Avatar, Button, Form, Input, message, App, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {deleteUer, getUsers, User} from "../../../api/user";
import {UserOutlined, SearchOutlined} from "@ant-design/icons";
import Add from "./add";
import Edit from './edit';
import SetRole from "./setRole";

const UserList = () => {
  const {modal} = App.useApp()
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [userId, setUserId] = useState('')
  const getUserList = () => {
    getUsers(name).then(res => {
      setList(res.data)
    })
  }
  const delUser = (id: string) => {
    deleteUer(id).then((data: any) => {
      message[data.state === 1 ? 'success' : 'error'](data.msg, 1.5)
      getUserList()
    })
  }
  useEffect(() => {
    getUserList()
  }, [])


  return (
      <div>
        <Form layout={'inline'} style={{marginBottom: 15}}>
          <Form.Item label={'用户名'}>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={'请输入关键字搜索'}/>
          </Form.Item>
          <Form.Item>
            <Button type={'primary'} icon={<SearchOutlined/>} onClick={getUserList}>搜索</Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={() => setName('')}>重置</Button>
          </Form.Item>
          <Form.Item>
            <Button type={'primary'} color={'#333'}
                    style={{background: '#00e16a'}}
                    onClick={() => setOpenAdd(true)}>新增</Button>
          </Form.Item>
        </Form>
        <Table bordered dataSource={list} rowKey={'id'} columns={[
          {title: 'id', dataIndex: 'id', key: 'id', width: 300},
          {title: '用户名', dataIndex: 'username', key: 'username', width: 300},
          {
            title: '头像', dataIndex: 'head_img', key: 'head_img', width: 150, render: (text) => {
              return text ? <Avatar size="large" src={text}/> : <Avatar size="large" icon={<UserOutlined/>}/>
            }
          },
          {
            title: '操作', key: 'action', width: 200, render: (text, row: User) => <div>
              <Button type={'link'} onClick={() => setUserId(row.id || '')}>角色配置</Button>
              <Button type={'link'} onClick={() => setEditUser(row)}>修改</Button>
              <Button type={'link'} danger onClick={() => {
                modal.confirm({
                  title: '温馨提示',
                  content: '您确定删除此条数据吗？',
                  cancelText:'取消',
                  okText:'确定',
                  maskClosable:true,
                  onOk(){
                    delUser(row.id || '')
                  }
                });

              }}>删除</Button>
            </div>
          },
        ]}/>
        <SetRole onCancel={() => setUserId('')} open={userId!=''} onOk={()=>setUserId('')} userId={userId}/>
        <Add open={openAdd} onCancel={() => setOpenAdd(false)} onOk={() => {
          setOpenAdd(false)
          getUserList()
        }}/>
        <Edit open={editUser !== null} data={editUser} onCancel={() => setEditUser(null)} onOk={() => {
          setEditUser(null)
          getUserList()
        }}/>

      </div>
  );
};

export default UserList;