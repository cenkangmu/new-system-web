import React, {useEffect, useRef, useState} from 'react';
import {Button, Upload} from "antd";
import {UploadOutlined, PlusOutlined} from '@ant-design/icons'
import {UploadChangeParam, UploadFile, UploadProps} from 'antd/es/upload';
import ApiCom from '../utils/ApiCom'


const MyUpload = (props: {
  listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle',
  maxCount?: number,
  fileList?: string[],
  onChange?: (list?: string[]) => void
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    setFileList(props.fileList?.map((item, index) => {
      let nameArr = item.split('/')
      return {
        uid: ApiCom.createUUID(10),
        name: nameArr.length ? nameArr[nameArr.length - 1] : index + 1 + '',
        url: item,
      }
    }) || [])
  }, [props.fileList])

  const uploadProps: UploadProps = {
    name: 'file',
    listType: props.listType || 'picture',
    action: process.env['REACT_APP_BASE_URL'] + '/upload',
    headers: {
      authorization: localStorage.token,
    },
    multiple: true,
    fileList,
    maxCount: props.maxCount || 1,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
    },
    onChange(info: UploadChangeParam<UploadFile<any>>) {
      setFileList([...info.fileList]);
      const list = info.fileList.map((item) => {
        if (item.status !== 'error') {
          if (item.response)
            return item.response.url
          else
            return item.url
        }
      })
      props.onChange && props.onChange(list)
    },
  };
  return (
      <>
        <Upload {...uploadProps}>
          {
            (props.listType == 'text' || props.listType == 'picture') ?
                <Button icon={<UploadOutlined/>}>文件上传</Button> : <PlusOutlined style={{fontSize: 30}}/>
          }
        </Upload>
      </>
  );
};

export default MyUpload;