import React from "react";
import "./Activity.css";
import Activity from "./Activity"
import Common from "./common"
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export default function Index() {
  // const [data, setData] = useState("test");

  return (
    <>
      <h1>市场部活动配置编辑器</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="通用配置" key="1">
          <Common locale='cn'></Common>
        </TabPane>
        <TabPane tab="中文版" key="2">
          <Activity locale='cn'></Activity>
        </TabPane>
        <TabPane tab="英文版" key="3">
          <Activity locale='en'></Activity>
        </TabPane>
      </Tabs>
    </>
  );
}
