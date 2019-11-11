import React, { useState } from "react";
import ReactQuill from "react-quill";
import "./Activity.css";
// import Button from 'antd/es/button';
import { Input, Button } from 'antd';

export default function GoodsList() {
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

  let download = () => {
    let data = {
      pageTitle,
      pageDescription,
      time,
      description: pageDescription,
      parts: [{
        title: aTitle,
        desc: aContent,
        rewards: [],
      }, {
        title: bTitle,
        desc: bContent,
        rewards: [],
      }, {
        title: cTitle,
        desc: cContent,
        rewards: [],
      }],
      terms,
      riskTip,
    }

    var eleLink = document.createElement('a');
    eleLink.download = 'activity.json';
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = new Blob([JSON.stringify(data)]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
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
        <Button onClick={download}>下载json</Button>
      </div>
    </>
  );
}
