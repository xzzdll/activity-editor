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

export default function UploadImage(props) {
  const [imageUrl] = useState('')
  const [isShowUploadBtn, setIsShowUploadBtn] = useState(true)

  const uploadProps = {
    name: 'file',
    listType: "picture-card",
    // className:"avatar-uploader",
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { file:{status}, fileList } = info;
      if (status === 'done') {
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