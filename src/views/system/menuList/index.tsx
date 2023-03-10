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
          <Form.Item label={'????????????'} name="label" style={{marginBottom: 15}}>
            <Input placeholder={'??????????????????'} onChange={e => form.setFieldValue('label', e.target.value)}/>
          </Form.Item>
          <Form.Item label={'????????????'} name="path" style={{marginBottom: 15}}>
            <Input placeholder={'??????????????????'} onChange={e => form.setFieldValue('path', e.target.value)}/>
          </Form.Item>

          <Form.Item label={'????????????'} name="type" style={{marginBottom: 15}}>
            <Select style={{width: 120}} onChange={(e) => form.setFieldValue('type', e)}
                    clearIcon options={[
              {value: '1', label: '??????'},
              {value: '2', label: '??????'},
              {value: '3', label: '??????'},
            ]}/>
          </Form.Item>
          <Form.Item label={'????????????'} name="p_id" style={{marginBottom: 15}}>
            <Cascader style={{width: 120}} options={menuTree2}
                      changeOnSelect fieldNames={{label: 'title', value: 'key'}} onChange={e => {
              return form.setFieldValue('p_id', e)
            }} placeholder="?????????"/>
          </Form.Item>
          <Form.Item>
            <Button type={'primary'} icon={<SearchOutlined/>} onClick={getMenuList}>??????</Button>
          </Form.Item>

          <Form.Item>
            <Button onClick={() => {
              form.resetFields()
            }}>??????</Button>
          </Form.Item>
          <Form.Item>
            <Button type={'primary'} color={'#333'}
                    style={{background: '#00e16a'}}
                    onClick={() => setOpenAdd(true)}>??????</Button>
          </Form.Item>
        </Form>
        <div className={style.menuItem} style={{padding: 4, fontWeight: 'bold'}}>
          <div style={{flex: 1}}>????????????</div>
          <div className={style.label}>????????????</div>
          <div className={style.label}>????????????</div>
          <div className={style.label} style={{width: 160}}>??????</div>
        </div>
        <Tree treeData={menuTree} blockNode titleRender={data => {
          return <div className={style.menuItem}>
            <div style={{flex: 1}}>{data.title}</div>
            <div className={style.label}>{data.path}</div>
            <div className={style.label}>{
              data.type === 1 ? '??????' : data.type === 2 ? '??????' : '??????'
            }</div>
            <div className={style.label} style={{width: 160}}>
              <Button type={'link'} onClick={() => setEditMenu(data)}>??????</Button>
              <Button type={'link'} danger onClick={() => {
                modal.confirm({
                  title: '????????????',
                  content: '?????????????????????????????????',
                  cancelText: '??????',
                  okText: '??????',
                  maskClosable: true,
                  onOk() {
                    delMenu(data.id || '')
                  }
                });
              }
              }>??????</Button>
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