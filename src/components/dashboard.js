import React, { useState, useEffect } from "react";
import "./Activity.css";
import { Table, Button, Divider } from 'antd';
import { getAllActivity } from '../service/api'
import { useHistory } from "react-router-dom";

export default function Index() {
  const [dataSource, setDataSource] = useState([])
  const history = useHistory()

  let getActivityData = () => {
    getAllActivity().then(res => {
      setDataSource(res.data.activity)
    })
  }

  useEffect(() => {
    getActivityData()
  }, [])

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
        <span>{JSON.parse(activity_json).name}</span>
      )
    },
    {
      title: '交易对',
      dataIndex: 'activity_json',
      key: 'activity_id',
      render: (activity_json) => (
        <span>{JSON.parse(activity_json).symbol}</span>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <span>
          <Button onClick={() => { }}>编辑</Button>
          <Divider type="vertical" />
          <Button onClick={() => { }}>删除</Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <h1>活动编辑器</h1>
      <Button onClick={() => history.push('/addActivity')}>添加新活动</Button>

      <Table dataSource={dataSource} columns={columns} />;
    </>
  );
}
