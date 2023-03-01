import {Avatar, Button, Form, Input, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {getUsers} from "../../../api/user";
import {UserOutlined,SearchOutlined} from "@ant-design/icons";
import Add from "./add";

const UserList = () => {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const getUserList = ()=>{
    getUsers(name).then(res => {
      setList(res.data)
    })
  }
  useEffect(() => {
    getUserList()
  }, [])


  return (
      <div>
        <Form layout={'inline'} style={{marginBottom:15}}>
          <Form.Item label={'用户名'} >
            <Input value={name} onChange={(e)=>setName(e.target.value)} placeholder={'请输入关键字搜索'}/>
          </Form.Item>
          <Form.Item >
            <Button type={'primary'} icon={<SearchOutlined />} onClick={getUserList}>搜索</Button>
          </Form.Item>
          <Form.Item >
            <Button>重置</Button>
          </Form.Item>
          <Form.Item >
            <Button type={'primary'} color={'#333'}
                    style={{background:'#00e16a'}}
                    onClick={() => setOpenAdd(true)}>新增</Button>
          </Form.Item>
        </Form>
        <Table bordered dataSource={list} rowKey={'id'} columns={[
          {title: 'id', dataIndex: 'id', key: 'id',},
          {title: '用户名', dataIndex: 'username', key: 'username',},
          {
            title: '头像', dataIndex: 'head_img', key: 'head_img', render: (text) => {
              return <Avatar size="large" icon={
                text ?  text : <UserOutlined/>
              }/>
            }
          },
        ]}/>
         <Add open={openAdd} onCancel={() => setOpenAdd(false)}/>
      </div>
  );
};

export default UserList;