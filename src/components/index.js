import React, { useState, useEffect } from "react";
import "./Activity.css";
import Activity from "./Activity"
import CommonTab from "./CommonTab"
import { Tabs, Button,Table } from 'antd';
import { useSelector } from 'react-redux'
import { addNewActivity,getAllActivity } from '../service/api'

const { TabPane } = Tabs;

export default function Index() {
  const { common, chinese, english } = useSelector(state => state);
  const [dataSource,setDataSource] = useState([])

  let download = () => {
    var eleLink = document.createElement('a');
    eleLink.download = 'activity.json';
    eleLink.style.display = 'none';
    var blob = new Blob([JSON.stringify({...common,cn:chinese,en:english})]);
    eleLink.href = URL.createObjectURL(blob);
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
  }

  let upload = () => {
    addNewActivity({ id: common.id, activity_json: JSON.stringify({ ...common, cn: chinese, en: english }) }).then(res => {
      getActivityData();
    })
  }

  let getActivityData = () => {
    getAllActivity().then(res => {
      setDataSource(res.data.activity)
    })
  }

  useEffect(() => {
    getActivityData()
  },[])

const columns = [
  {
    title: '活动ID',
    dataIndex: 'activity_id',
    key: 'activity_id',
  },
    {
    title: '币种',
    dataIndex: 'activity_json',
    key: 'activity_id',
    render: (activity_json) => (
      <span>{ JSON.parse(activity_json).name }</span>
    )
  },
  {
    title: '交易对',
    dataIndex: 'activity_json',
    key: 'activity_id',
    render: (activity_json) => (
      <span>{ JSON.parse(activity_json).symbol }</span>
    )
  },
  // {
  //   title: '住址',
  //   dataIndex: 'address',
  //   key: 'address',
  // },
];

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
        <Button onClick={download}>下载json</Button>
        <Button style={{marginLeft:'20px'}} onClick={upload}>上传json</Button>
      </div>

      <Table dataSource={dataSource} columns={columns} />;
    </>
  );
}
