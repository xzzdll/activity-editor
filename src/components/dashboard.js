import React, { useState, useEffect } from "react";
import "./Activity.css";
import { Table, Button, Divider, message } from 'antd';
import { getAllActivity, deleteActivityById } from '../service/api'
import { useHistory } from "react-router-dom";

export default function Index() {
  const [dataSource, setDataSource] = useState([])
  const history = useHistory()

  let getActivityData = () => {
    getAllActivity().then(res => {
      let data = res.data.activity.map((x, index) => {
        x.key = index
        return x;
      })
      setDataSource(data)
    })
  }

  useEffect(() => {
    getActivityData()
  }, [])

  const edit = (id) => {
    history.push(`/addActivity?id=${id}`)
  }

  const deleteActivity = (id) => {
    deleteActivityById({id}).then(({ status }) => {
      if (status) {
        message.info('删除成功');
        getActivityData()
      }
    })
  }

  const columns = [
    {
      title: '活动ID',
      dataIndex: 'activity_id',
      key: `活动ID`,
    },
    {
      title: '币种',
      dataIndex: 'activity_json',
      key: '币种',
      render: (activity_json) => (
        <span>{JSON.parse(activity_json).name}</span>
      )
    },
    {
      title: '交易对',
      dataIndex: 'activity_json',
      key: '交易对',
      render: (activity_json) => (
        <span>{JSON.parse(activity_json).symbol}</span>
      )
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'activity_id',
      render: (activity_id) => (
        <span>
          <Button type="primary" onClick={() => { edit(activity_id) }}>编辑</Button>
          <Divider type="vertical" />
          <Button type="danger" onClick={() => { deleteActivity(activity_id) }}>删除</Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <h1>活动编辑器2.0</h1>
      <Button type="primary" style={{ marginBottom: '30px' }} onClick={() => history.push('/addActivity')}>添加新活动</Button>

      <h3>线上活动</h3>
      <Table dataSource={dataSource} columns={columns} />;
    </>
  );
}
