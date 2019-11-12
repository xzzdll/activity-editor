import React, { useState } from "react";
import ReactQuill from "react-quill";
import "./Activity.css";
// import Button from 'antd/es/button';
import { Input, Button } from 'antd';
import { useDispatch } from 'react-redux'

export default function Activity({locale}) {
  const [pageTitle, setPageTitle] = useState("test");
  const [pageDescription, setPageDescription] = useState("test");
  const [time, setTime] = useState("test");
  const [aTitle, setATitle] = useState("test");
  const [bTitle, setBTitle] = useState("test");
  const [cTitle, setCTitle] = useState("test");
  const [aContent, setAContent] = useState("test");
  const [bContent, setBContent] = useState("test");
  const [cContent, setCContent] = useState("test");
  const [terms, setTerms] = useState("test");
  const [riskTip, setRiskTip] = useState("test");
  const dispatch = useDispatch()

  let download = () => {
    dispatch({ type: locale === 'cn' ? 'chinese:set' : 'english:set', payload: { pageTitle, pageDescription, time, parts: [{ aTitle, aContent }, { bTitle, bContent }, { cTitle, cContent}],terms,riskTip}})
  }

  return (
    <>
      <h3>活动标题</h3>
      <Input size="large" placeholder="活动标题" value={pageTitle} onChange={({ target: { value } }) => setPageTitle(value)} />
      <h3>活动描述</h3>
      <Input size="large" placeholder="活动标题" value={pageDescription} onChange={({ target: { value } }) => setPageDescription(value)} />

      <h3>活动时间</h3>
      <Input size="large" placeholder="活动标题" value={time} onChange={({ target: { value } }) => setTime(value)} />

      <h3>活动第一部分</h3>
      <div className="Activity-item">
        <h4>标题</h4>
        <ReactQuill value={aTitle} onChange={setATitle} />
        <h4>内容</h4>
        <ReactQuill value={aContent} onChange={setAContent} />
      </div>

      <h3>活动第二部分</h3>
      <div className="Activity-item">
        <h4>标题</h4>
        <ReactQuill value={bTitle} onChange={setBTitle} />
        <h4>内容</h4>
        <ReactQuill value={bContent} onChange={setBContent} />
      </div>

      <h3>活动第三部分</h3>
      <div className="Activity-item">
        <h4>标题</h4>
        <ReactQuill value={cTitle} onChange={setCTitle} />
        <h4>内容</h4>
        <ReactQuill value={cContent} onChange={setCContent} />
      </div>

      <h3>注意和服务协议</h3>
      <ReactQuill value={terms} onChange={setTerms} />

      <h3>风险提示</h3>
      <ReactQuill value={riskTip} onChange={setRiskTip} />

      <div className="Activity-item" style={{ border: "unset" }}>
        <Button onClick={download}>保存</Button>
      </div>
    </>
  );
}
