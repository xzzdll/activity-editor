import React, { useState } from "react";
import "./Activity.css";
// import Button from 'antd/es/button';
import { Input, Button,Switch } from 'antd';

export default function GoodsList() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [isTradingRank, setIsTradingRank] = useState(true);

  let download = () => {
    let data = {
      name,
      symbol
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

  let onChange = (checked) => {
    setIsTradingRank(checked);
  }

  return (
    <>
      <h3>币种</h3>
      <Input size="large" placeholder="币种" value={name} onChange={({ target: { value } }) => setName(value)} />
      <h3>交易对</h3>
      <Input size="large" placeholder="交易对" value={symbol} onChange={({ target: { value } }) => setSymbol(value)} />
      <h3>是否显示排名</h3>
      <Switch checked={isTradingRank} onChange={onChange} />
      <div className="Activity-item" style={{ border: "unset" }}>
        <Button onClick={download}>下载json</Button>
      </div>
    </>
  );
}
