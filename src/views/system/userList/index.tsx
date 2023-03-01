import {Avatar, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {getUsers} from "../../../api/user";
import {UserOutlined} from "@ant-design/icons";

const UserList = () => {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  useEffect(() => {
    getUsers(name).then(res => {
      setList(res.data)
    })
  }, [])


  return (
      <div>

        <Table bordered dataSource={list} columns={[
          {title: 'id', dataIndex: 'id', key: 'id',},
          {title: '用户名', dataIndex: 'username', key: 'username',},
          {
            title: '头像', dataIndex: 'head_img', key: 'head_img', render: text => {
              return <Avatar size="large" icon={
                text ?  text : <UserOutlined/>
              }/>

            }
          },
        ]}/>;

      </div>
  );
};

export default UserList;