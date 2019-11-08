import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "./Activity.css";

export default function GoodsList() {
  const [pageTitle, setPageTitle] = useState("");
  const [pageDescription, setPageDescription] = useState("");
  const [time, setTime] = useState("");
  const [aTitle, setATitle] = useState("");
  const [bTitle, setBTitle] = useState("");
  const [cTitle, setCTitle] = useState("");
  const [aContent, setAContent] = useState("");
  const [bContent, setBContent] = useState("");
  const [cContent, setCContent] = useState("");
  const [terms, setTerms] = useState("");
  const [riskTip, setRiskTip] = useState("");

  // useEffect(() => {
  //   axios
  //     .post("http://cool.blog.fanchao.site/api/say/list")
  //     .then(({ data: { list } }) => {
  //       setPageTitle(list[4].content);
  //     });
  // }, []);

  let download = () => {
    let data = {
      pageTitle: (
        <>{pageTitle}</>
      ),
      pageDescription: (
        <>{pageDescription}</>
      ),
      time: (
        <>{time}</>
      ),
      description: (
        <>{pageDescription}</>
      ),
      partA: {
        title: (
          <>{aTitle}</>
        ),
        desc: (
          <>{aContent}</>
        )
      },
      partB: {
        title: (
          <>{bTitle}</>
        ),
        desc: (
          <>{bContent}</>
        )
      },
      partC: {
        title: (
          <>{cTitle}</>
        ),
        desc: (
          <>{cContent}</>
        )
      },
      terms: (
        <>{terms}</>
      ),
      riskTip: (
        <>{riskTip}</>
      )
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
      <ReactQuill value={pageTitle} onChange={setPageTitle} />

      <h3>活动描述</h3>
      <ReactQuill value={pageDescription} onChange={setPageDescription} />

      <h3>活动时间</h3>
      <ReactQuill value={time} onChange={setTime} />

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
      {/* <div className="Activity-item"> */}
      <ReactQuill value={terms} onChange={setTerms} />
      {/* </div> */}

      <h3>风险提示</h3>
      {/* <div className="Activity-item"> */}
      <ReactQuill value={riskTip} onChange={setRiskTip} />
      {/* </div> */}
      <div className="Activity-item" style={{ border: "unset" }}>
        <button onClick={download}>下载json</button>
      </div>
    </>
  );
}
