import {App, Avatar, Button, Form, Input, message, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {deleteUer, getRoles, Role} from "../../../api/role";
import { SearchOutlined} from "@ant-design/icons";
import Add from "./add";
import Edit from './edit';

const RoleList = () => {
  const {modal} = App.useApp()
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [list, setList] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const [editRole, setEditRole] = useState<Role | null>(null)
  const getRoleList = () => {
    getRoles({name, code}).then(res => {
      setList(res.data)
    })
  }
  const delRole = (id: string) => {
    deleteUer(id).then((data: any) => {
      message[data.state === 1 ? 'success' : 'error'](data.msg, 1.5)
      getRoleList()
    })
  }
  useEffect(() => {
    getRoleList()
  }, [])


  return (
      <div>
        <Form layout={'inline'} style={{marginBottom: 15}}>
          <Form.Item label={'角色名称'}>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={'请输入关键字搜索'}/>
          </Form.Item>
          <Form.Item label={'角色代码'}>
            <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder={'请输入关键字搜索'}/>
          </Form.Item>
          <Form.Item>
            <Button type={'primary'} icon={<SearchOutlined/>} onClick={getRoleList}>搜索</Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={() => {
              setName('')
              setCode('')
            }}>重置</Button>
          </Form.Item>
          <Form.Item>
            <Button type={'primary'} color={'#333'}
                    style={{background: '#00e16a'}}
                    onClick={() => setOpenAdd(true)}>新增</Button>
          </Form.Item>
        </Form>
        <Table bordered dataSource={list} rowKey={'id'} columns={[
          {title: 'id', dataIndex: 'id', key: 'id', width: 300},
          {title: '角色名称', dataIndex: 'name', key: 'name', width: 300},
          {title: '角色代码', dataIndex: 'code', key: 'code', width: 300},
          {
            title: '操作', key: 'action',  render: (text, row: Role) => <div>
              <Button type={'link'} onClick={() => setEditRole(row)}>修改</Button>
              <Button type={'link'} danger onClick={() => {
                modal.confirm({
                  title: '温馨提示',
                  content: '您确定删除此条数据吗？',
                  cancelText:'取消',
                  okText:'确定',
                  maskClosable:true,
                  onOk(){
                    delRole(row.id || '')
                  }
                });

              }}>删除</Button>
            </div>
          },
        ]}/>
        <Add open={openAdd} onCancel={() => setOpenAdd(false)} onOk={() => {
          setOpenAdd(false)
          getRoleList()
        }}/>
        <Edit open={editRole !== null} data={editRole} onCancel={() => setEditRole(null)} onOk={() => {
          setEditRole(null)
          getRoleList()
        }}/>
      </div>
  );
};

export default RoleList;