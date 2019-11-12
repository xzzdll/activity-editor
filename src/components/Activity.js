import React, { useState } from "react";
import ReactQuill from "react-quill";
import "./Activity.css";
import { Input, Button } from 'antd';
import { useDispatch } from 'react-redux'

export default function Activity({ locale }) {
  const [data, setData] = useState({
    pageTitle: "test",
    pageDescription: "test",
    time: "test",
    parts: [
      {
        title: "<p>test</p>",
        desc: "<p>test</p>"
      },
      {
        title: "<p>test</p>",
        desc: "<p>test</p>"
      },
      {
        title: "<p>test</p>",
        desc: "<p>test</p>"
      }
    ],
    terms: "<p>test</p>",
    riskTip: "<p>test</p>"
  });
  const dispatch = useDispatch()

  let download = () => {
    dispatch({ type: locale === 'cn' ? 'chinese:set' : 'english:set', payload: data })
  }

  let setArray = (arr,index,val,key) => {
    arr[index][key] = val
    return { parts: arr }
  }

  return (
    <>
      <h3>活动标题</h3>
      <Input size="large" placeholder="活动标题" value={data.pageTitle} onChange={({ target: { value } }) => setData({ ...data, ...{ pageTitle:value}})} />
      <h3>活动描述</h3>
      <Input size="large" placeholder="活动标题" value={data.pageDescription} onChange={({ target: { value } }) => setData({ ...data, ...{ pageDescription: value } })} />

      <h3>活动时间</h3>
      <Input size="large" placeholder="活动标题" value={data.time} onChange={({ target: { value } }) => setData({ ...data, ...{ time: value } })} />

      {data.parts.map((part, index) => {
        return <div key={index}>
        <h3>活动第{index+1}部分</h3>
          <div className="Activity-item">
            <h4>标题</h4>
            <ReactQuill value={part.title} onChange={val => setData({ ...data, ...setArray(data.parts,index,val,'title')})} />
            <h4>内容</h4>
            <ReactQuill value={part.desc} onChange={val => setData({ ...data, ...setArray(data.parts, index, val, 'desc') })} />
          </div>
        </div>
      })
      }

      <h3>注意和服务协议</h3>
      <ReactQuill value={data.terms} onChange={val => setData({ ...data, ...{ terms: val } })} />

      <h3>风险提示</h3>
      <ReactQuill value={data.riskTip} onChange={val => setData({ ...data, ...{ riskTip: val } })} />

      <div className="Activity-item" style={{ border: "unset" }}>
        <Button onClick={download}>保存</Button>
      </div>
    </>
  );
}
