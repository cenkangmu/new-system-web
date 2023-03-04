import {Form,  Input, message, Modal} from 'antd';
import React from 'react';
import Upload from "../../../components/Upload";
import {addUser} from "../../../api/user";

type AddUserProp = {
  onCancel: () => void,
  open: boolean,
  onOk: () => void
}
const Add = (props: AddUserProp) => {
  const [form] = Form.useForm()
  const data = {
    username: '',
    password: '',
    head_img:''
  }
  const handleOk = () => {
    form.validateFields().then(async () => {
      let data: any = await addUser(form.getFieldsValue())
      message[data.state === 1 ? 'success' : 'error'](data.msg, 1.5)
      if (data.state == 1) {
        form.resetFields()
        props.onOk()
      }
    })
  };
  return (
      <Modal width={400} title="新增用户" okText={'确定'} cancelText={'取消'}
             open={props.open} onOk={handleOk} onCancel={() => {
        form.resetFields()
        props.onCancel()
      }}>
        <Form labelCol={{span: 5}} form={form} initialValues={data}>
          <Form.Item label={'用户名'} name="username"
                     rules={[{required: true, message: '请输入用户名'}]}>
            <Input placeholder={'请输入用户名'} onChange={e => form.setFieldValue('username', e.target.value)}/>
          </Form.Item>
          <Form.Item label={'密码'} name="password"
                     rules={[
                       {required: true, message: '请输入密码'},
                       {pattern: /^[0-9a-zA-Z]{6,16}$/, message: '密码格式为6-16位的数字或字母'},
                     ]}>
            <Input.Password placeholder={'请输入密码'} onChange={e => form.setFieldValue('password', e.target.value)}/>
          </Form.Item>
          <Form.Item label={'选择头像'} name={'head_img'}>
            <Upload listType={'picture-card'}
                    onChange={(list) => {
                      console.log(list);
                      form.setFieldValue('head_img',list?.join(','))
                    }}
            />
          </Form.Item>

        </Form>
      </Modal>
  );
};

export default Add;