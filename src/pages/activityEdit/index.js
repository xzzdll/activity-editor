import React from "react";
import "./Activity.css";
import Activity from "./Activity"
import CommonTab from "./CommonTab"
import { Tabs, Button } from 'antd';
import { useHistory } from "react-router-dom";
import useActivityById from "../../hooks/useActivityById"
import useDownload from "../../hooks/useDownload"

const { TabPane } = Tabs;

export default function Index() {
  const { common, chinese, english } = useActivityById();
  const history = useHistory()
  const {upload} = useDownload({ common, chinese, english});


  return (
    <>
      <h1>活动编辑器</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="通用配置" key="1">
          <CommonTab></CommonTab>
        </TabPane>
        <TabPane tab="中文版" key="2">
          <Activity locale='cn'></Activity>
        </TabPane>
        <TabPane tab="英文版" key="3">
          <Activity locale='en'></Activity>
        </TabPane>
      </Tabs>
      <div className="Activity-item" style={{ border: "unset" }}>
        <Button onClick={() => history.push('/dashboard')}>返回</Button>
        <Button type="primary" style={{ marginLeft: '20px' }} onClick={upload}>上传并下载json</Button>
      </div>
    </>
  );
}
