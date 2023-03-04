import {App, Button, Cascader, Form, Input, message, Select, Table, Tree} from 'antd';
import React, {useEffect, useMemo, useState} from 'react';
import {deleteUer, getMenus, Menu} from "../../../api/menu";
import {SearchOutlined} from "@ant-design/icons";
import style from './menu.module.css'
import Add from "./add";
import Edit from './edit';
import {connect} from "react-redux";

function resetMenus(list: any, id: (string | null) = null) {
  let arr: any[] = []
  list.forEach((item: any, index: number) => {
    if (item.p_id === id) {
      arr.push({
        ...item,
        key: item.id,
        title: item.label,
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

const MenuList = (props: any) => {
  const {modal} = App.useApp()
  const data = {
    label: '',
    path: '',
    type: '',
    p_id: ''
  }
  const [form] = Form.useForm()
  const [list, setList] = useState([])
  const [menuTree2, setMenuTree2] = useState<any[]>([])
  useEffect(() => {
    if (props.menus)
      setMenuTree2(resetMenus(props.menus))
    else
      props.dispatch({type: 'getAllMenus'})
  }, [props.menus])
  const [pid,setPid] = useState('')
  const menuTree = useMemo(() => {
    return resetMenus(list,pid || null)
  }, [list])
  const [openAdd, setOpenAdd] = useState(false)
  const [editMenu, setEditMenu] = useState<Menu | null>(null)
  const getMenuList = () => {
    const data = form.getFieldsValue()
    if (data.p_id && data.p_id.length)
      data.p_id = data.p_id[data.p_id.length-1]
    else data.p_id = ''
    setPid(data.p_id)
    getMenus(data).then(res => {
      setList(res.data)
    })
  }
  const delMenu = (id: string) => {
    deleteUer(id).then((data: any) => {
      message[data.state === 1 ? 'success' : 'error'](data.msg, 1.5)
      getMenuList()
    })
  }
  useEffect(() => {
    getMenuList()
  }, [])


  return (
      <div>
        <Form layout={'inline'} form={form} initialValues={data} style={{marginBottom: 15}}>
          <Form.Item label={'菜单名称'} name="label" style={{marginBottom: 15}}>
            <Input placeholder={'请输入关键字'} onChange={e => form.setFieldValue('label', e.target.value)}/>
          </Form.Item>
          <Form.Item label={'菜单路径'} name="path" style={{marginBottom: 15}}>
            <Input placeholder={'请输入关键字'} onChange={e => form.setFieldValue('path', e.target.value)}/>
          </Form.Item>

          <Form.Item label={'菜单类型'} name="type" style={{marginBottom: 15}}>
            <Select style={{width: 120}} onChange={(e) => form.setFieldValue('type', e)}
                    clearIcon options={[
              {value: '1', label: '页面'},
              {value: '2', label: '功能'},
              {value: '3', label: '分组'},
            ]}/>
          </Form.Item>
          <Form.Item label={'父级菜单'} name="p_id" style={{marginBottom: 15}}>
            <Cascader style={{width: 120}} options={menuTree2}
                      changeOnSelect fieldNames={{label: 'title', value: 'key'}} onChange={e => {
              return form.setFieldValue('p_id', e)
            }} placeholder="请选择"/>
          </Form.Item>
          <Form.Item>
            <Button type={'primary'} icon={<SearchOutlined/>} onClick={getMenuList}>搜索</Button>
          </Form.Item>

          <Form.Item>
            <Button onClick={() => {
              form.resetFields()
            }}>重置</Button>
          </Form.Item>
          <Form.Item>
            <Button type={'primary'} color={'#333'}
                    style={{background: '#00e16a'}}
                    onClick={() => setOpenAdd(true)}>新增</Button>
          </Form.Item>
        </Form>
        <div className={style.menuItem} style={{padding: 4, fontWeight: 'bold'}}>
          <div style={{flex: 1}}>菜单名称</div>
          <div className={style.label}>菜单路径</div>
          <div className={style.label}>菜单类型</div>
          <div className={style.label} style={{width: 160}}>操作</div>
        </div>
        <Tree treeData={menuTree} blockNode titleRender={data => {
          return <div className={style.menuItem}>
            <div style={{flex: 1}}>{data.title}</div>
            <div className={style.label}>{data.path}</div>
            <div className={style.label}>{
              data.type === 1 ? '页面' : data.type === 2 ? '功能' : '分组'
            }</div>
            <div className={style.label} style={{width: 160}}>
              <Button type={'link'} onClick={() => setEditMenu(data)}>修改</Button>
              <Button type={'link'} danger onClick={() => {
                modal.confirm({
                  title: '温馨提示',
                  content: '您确定删除此条数据吗？',
                  cancelText: '取消',
                  okText: '确定',
                  maskClosable: true,
                  onOk() {
                    delMenu(data.id || '')
                  }
                });
              }
              }>删除</Button>
            </div>
          </div>
        }}/>

        <Add open={openAdd} onCancel={() => setOpenAdd(false)} onOk={() => {
          setOpenAdd(false)
          getMenuList()
        }}/>
        <Edit open={editMenu !== null} data={editMenu} onCancel={() => setEditMenu(null)} onOk={() => {
          setEditMenu(null)
          getMenuList()
        }}/>
      </div>
  );
};

export default connect((state: any) => ({menus: state.system.allMenus}))(MenuList);