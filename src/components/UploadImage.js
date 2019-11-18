import React, { useState } from "react";
import { Upload, Icon, message } from 'antd';
// import "./UploadImage.css"

// const { Dragger } = Upload;

const UploadButton = () =>(
  <div>
    <Icon type='plus' />
    <div className="ant-upload-text">Upload</div>
  </div>
);

export default function UploadImage({change}) {
  const [imageUrl] = useState('')
  const [isShowUploadBtn, setIsShowUploadBtn] = useState(true)

  const uploadProps = {
    name: 'file',
    listType: "picture-card",
    // className:"avatar-uploader",
    action: 'http://47.98.115.136:8899/image/upload',
    onChange(info) {
      const { file:{status}, fileList } = info;
      if (status === 'done') {
        change(info.file.response.url)
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      setIsShowUploadBtn(!fileList.length)
    },
  };

  return <>
    <Upload {...uploadProps}>
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : (!isShowUploadBtn ? null : <UploadButton/>)}
    </Upload>
  </>
}