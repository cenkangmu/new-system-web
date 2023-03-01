import React, {useEffect, useState} from 'react';
import {Button, Upload} from "antd";
import {UploadOutlined} from '@ant-design/icons'
import {UploadChangeParam, UploadFile, UploadProps} from 'antd/es/upload';
import ApiCom from '../utils/ApiCom'


const MyUpload = (props: {
  listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle',
  maxCount?: number,
  fileList?: string[],
  onChange?: (list?:string[])=>void
}) => {
  const fileList: UploadFile[] = []
  if (props.fileList) {
    props.fileList.forEach((item, index) => {
      let nameArr = item.split('/')
      fileList.push({
        uid: ApiCom.createUUID(10),
        name: nameArr.length ? nameArr[nameArr.length-1] : index+1+'',
        url: item,
      })
    })
  }
  const uploadProps: UploadProps = {
    name: 'file',
    listType: props.listType || 'picture',
    action: process.env['REACT_APP_BASE_URL'] + '/upload',
    headers: {
      authorization: localStorage.token,
    },
    multiple: true,
    defaultFileList: [...fileList],
    maxCount: props.maxCount || 3,
    onChange(info: UploadChangeParam<UploadFile<any>>) {
      if (info.file.status === 'done') {
        const list = info.fileList.map((item)=>{
          if(item.response)
            return item.response.path
          else
            return item.url
        })
        props.onChange && props.onChange(list)
      }
    },
  };
  return (
      <>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined/>}>文件上传</Button>
        </Upload>
      </>
  );
};

export default MyUpload;