import {Form, Input, Modal} from 'antd';
import React, {useState} from 'react';
import Upload from "../../../components/Upload";

type AddUserProp = {
  onCancel: () => void,
  open: boolean
}
const Add = (props: AddUserProp) => {
  const [fileList, setFileList] = useState<string[]>([])
  const handleOk = () => {

  };
  return (
      <Modal width={400} title="新增用户" okText={'确定'} cancelText={'取消'}
             open={props.open} onOk={handleOk} onCancel={props.onCancel}>
        <Form labelCol={{span: 5}}>
          <Form.Item label={'用户名'} name="username"
                     rules={[{required: true, message: '请输入用户名'}]}>
            <Input placeholder={'请输入用户名'}/>
          </Form.Item>
          <Form.Item label={'密码'} name="password"
                     rules={[
                       {required: true, message: '请输入密码'},
                       {pattern: /^[0-9a-zA-Z]{6,16}$/, message: '密码格式为6-16位的数字或字母'},
                     ]}>
            <Input.Password placeholder={'请输入密码'}/>
          </Form.Item>
          <Form.Item label={'选择头像'} name="file">
            <Upload listType={'picture'}
                    fileList={fileList}
                    onChange={(list) => {
                      setFileList(list?.filter(i => i) as string[])
                    }}
            />
          </Form.Item>

        </Form>
      </Modal>
  );
};

export default Add;